### ` engine.run()` 方法

当你定义完成路由的时候，是时候让你的 api 运行起来了，`gin` 推荐使用 `engine.run()`， 或者你也可以使用 `http.ListenAndServe(address, engine)`，

其实 `run()` 方法就是包装了一层 `http.ListenAndServe(address, engine)`，其实现如下

```go
func (engine *Engine) Run(addr ...string) (err error) {
	defer func() { debugPrintError(err) }()

	address := resolveAddress(addr)
	debugPrint("Listening and serving HTTP on %s\n", address)
	err = http.ListenAndServe(address, engine)
	return
}
```

可以看到，`gin` 并没有自己实现一套 http 框架，而是使用标准库的 http，没有重复造轮子，同时也降低了学习成本。

我们看到 `http.ListenAndServe(address, engine)`，为什么第二个参数可以传 `engine` 呢？老方法，看看源码

```go
func ListenAndServe(addr string, handler Handler) error {
	server := &Server{Addr: addr, Handler: handler}
	return server.ListenAndServe()
}
```

看，`ListenAndServe()` 方法的第二个参数需要实现了 `Handler`  接口，说明 `engine` 肯定实现了 `Handler`，我们先看看 `Handler` 接口的定义

```go
type Handler interface {
	ServeHTTP(ResponseWriter, *Request)
}
```

说明 `engine` 肯定实现了 `ServeHTTP` 这个方法，果不其然。

```go
func (engine *Engine) ServeHTTP(w http.ResponseWriter, req *http.Request) {
	......
}
```

看到这里，你就明白了， `gin` 框架并不是一个复杂的框架，只不过是对内置 `http` 包做了一层封装而已，但是，你会遇到新的问题，`engine.pool` 是个什么鬼？？？

### `pool` 对象池
`sync.pool` 保存和复用临时对象，减少内存分配，降低GC压力

参考 
* [由浅入深聊聊Golang的sync.Pool](https://juejin.im/post/5d4087276fb9a06adb7fbe4a#heading-5)
* [浅析对象池 pool 源码](http://blog.masterjoy.top/detail/85)

注意，`sync.pool` 是会被回收的，所以不适合做 `mysql`、`redis` 连接池

看 `pool` 初始化的代码

```go
engine.pool.New = func() interface{} {
	return engine.allocateContext()
}
// 再来看看 allocateContext()
func (engine *Engine) allocateContext() *Context {
	return &Context{engine: engine}
}
// 顺藤摸瓜
type Context struct { 
	writermem  responseWriter         // 返回对象 该对象不可外部访问 
	Request    *http.Request          // 请求对象
	Writer     ResponseWriter         // 返回对象接口，装载 writermem,可以外部操作，实现了 responseWriter 所有接口
	Params     Params                 // path 键值对
	handlers   HandlersChain          // 处理函数
	index      int8                   // 用于判断是否 abort
	fullPath   string                 // 全路径
	engine     *Engine                // 指向 engine
	mu         sync.RWMutex           // 读写锁，针对下面的 Keys 使用
	Keys       map[string]interface{} //
	Errors     errorMsgs              // 所有错误
	Accepted   []string               // 请求接受的格式
	queryCache url.Values             // query 参数
	formCache  url.Values             // body 参数
	sameSite   http.SameSite          // ??????
}
```

看样子 `context` 对象像一列火车，里面装载了很多对象，用于在不同的中间件之间传输数据，看上去挺复杂的，接下来我们一步一步解析

### `gin` 对一个请求的处理
```go
func (engine *Engine) ServeHTTP(w http.ResponseWriter, req *http.Request) {
	c := engine.pool.Get().(*Context) // 在对象池中取一个对象
	c.writermem.reset(w)              // 重置 response 对象，因为取出来的对象可能受到污染
	c.Request = req                   // 重置 request 对象，原因同上
	c.reset()                         // 整体重置，原因同上
	engine.handleHTTPRequest(c)       // 处理请求
	engine.pool.Put(c)                // 用完了，还回去
}
```
很明显，这一步做了两件事，1.从对象处中取出一个对象，然后放回去。2.将对象池取出来的对象重置，然后赋值，然后进行操作

接下来看看 `handleHTTPRequest()` 方法做了啥
```go
func (engine *Engine) handleHTTPRequest(c *Context) {
	......
	t := engine.trees
	for i, tl := 0, len(t); i < tl; i++ {
		if t[i].method != httpMethod {
			continue
		}
		root := t[i].root
        
		// 从树中查找对应的节点
		value := root.getValue(rPath, c.Params, unescape)
        
        // 核心代码，Handel 和中间件执行在这里
		if value.handlers != nil {
			c.handlers = value.handlers
			c.Params = value.params
			c.fullPath = value.fullPath
			c.Next()
			c.writermem.WriteHeaderNow()
			return
		}
		if httpMethod != "CONNECT" && rPath != "/" {
			if value.tsr && engine.RedirectTrailingSlash {
				redirectTrailingSlash(c)
				return
			}
			if engine.RedirectFixedPath && redirectFixedPath(c, root, engine.RedirectFixedPath) {
				return
			}
		}
		break
	}
    ......
	c.handlers = engine.allNoRoute
	serveError(c, http.StatusNotFound, default404Body)
}
```
先从前缀树里查找对应的节点，返回 value ， 判断是否有 handlers，如果有 handlers 说明是一个正常的节点。
```go
func (c *Context) Next() {
	c.index++
	for c.index < int8(len(c.handlers)) {
		// 递归的调用所有 handlers, handlers 又会调用 Next()
		c.handlers[c.index](c)
		
		// 当所有 handlers 调用完毕，index++， 此时就不满足 index < int8(len(c.handlers)) 条件，退出循环，开始回溯
		c.index++
	}
}
```
有意思的是，只要对 `index` 操作，就可以使其不执行某些 `handlers`，使用这种特性用来中断整个操作。
```go
const abortIndex int8 = math.MaxInt8 / 2

func (c *Context) Abort() {
	c.index = abortIndex
}
```