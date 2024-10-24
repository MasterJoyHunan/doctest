### tree的定义
```tree.go
type methodTrees []methodTree // slice of methodTree

type methodTree struct {
	method string // 方法名
	root   *node  // 前缀树
}
```
再看看前缀树的定义
```tree.go
	path      string        // 该节点的路径
	indices   string        // 子路径的索引
	children  []*node       // 子路径
	handlers  HandlersChain // 对该路径的处理方法（包括中间件）
	priority  uint32        // 当前节点及子孙节点的实际路由数量
	nType     nodeType      // node类型，0:静态路由 1：根路径 2：动态路由(:abc)3:全路径(*abc)
	maxParams uint8         // 该路径下最多有多少个参数
	wildChild bool          // 下级孩子节点是否有通配符
	fullPath  string        // 到当前节点的全路径
```
### 树的概览
路由加入前缀树的基本逻辑，还挺复杂的，我们尝试将以下路由加入前缀树

* `/index/hasfun`
* `/index/hasfun/`
* `/index/index/`
* `/index/index/:foo/bar/:one/`
* `/index/index/:foo/bar`

将会得到下图的结果
![http://tc.masterjoy.top/20200616/8539ef585e4959f7f11b6885c72c37bf.png](http://tc.masterjoy.top/20200616/8539ef585e4959f7f11b6885c72c37bf.png)

### 加入逻辑

```go
r := gin.Default()
index := r.Group("/index")
...
index.GET("/index/:foo/bar/:one/", func(context *gin.Context) {
	context.JSON(200, gin.H{
		"code": 1,
		"data": "hello world",
	})
})
...
panic(r.Run(":8080"))
```
这是通用的定义路由对应 `handlers`，看看 `GET()` 方法做了什么

```go
// 对 handle 方法的包装
func (group *RouterGroup) GET(relativePath string, handlers ...HandlerFunc) IRoutes {
	return group.handle(http.MethodGet, relativePath, handlers)
}

// 加入路由
func (group *RouterGroup) handle(httpMethod, relativePath string, handlers HandlersChain) IRoutes {
	// 计算绝对路径
	absolutePath := group.calculateAbsolutePath(relativePath)
	// 合并 handle
	handlers = group.combineHandlers(handlers)
	// 核心 
	group.engine.addRoute(httpMethod, absolutePath, handlers)
	// 返回 RouterGroup
	return group.returnObj()
}

func (engine *Engine) addRoute(method, path string, handlers HandlersChain) {
	// 一系列判断
	assert1(path[0] == '/', "path must begin with '/'")
	assert1(method != "", "HTTP method can not be empty")
	assert1(len(handlers) > 0, "there must be at least one handler")
	......
	// 每一个方法对应一个前缀树，使用懒加载方式，等需要的时候才新建
	root := engine.trees.get(method)
	if root == nil {
		root = new(node)
		root.fullPath = "/"
		engine.trees = append(engine.trees, methodTree{method: method, root: root})
	}
	root.addRoute(path, handlers)
}
```
上面的代码都只能算小菜，很容易理解。接下来就是上大餐的时候了，加入前缀树是比较绕的，如果能静心看完，且看懂，那么 `gin` 框架就应该理解了 70% 了。

为了对 `addRoute` 方法有个大概的理解，先管中窥豹一番。大概逻辑如下：从根节点开始比对，如果比对不成功，则找子节点进行比对，直到找到最后可以加入的节点

```go
func (n *node) addRoute(path string, handlers HandlersChain) {
......
walk:
	for {
		......
		// 查找最长的公共前缀, 公共前缀不包含 ':' or '*'， 返回前缀最后的一个字母的索引位
		i := longestCommonPrefix(path, n.path)

		// 分割路径 如上级的路径是 /apple, 新路径是 /app , 将会将 /apple 分割 /app -> le
		if i < len(n.path) {
			......
		}

		// 说明不是最后一级
		if i < len(path) {
			......
			n = n.children[?]
			continue walk
		}

		// 说明是最后一级，判断有没有 handlers 即可
		if n.handlers != nil {
			panic("handlers are already registered for path '" + fullPath + "'")
		}
		n.handlers = handlers
		return
	}
}
```

接下来就是详细解析源码了

```go
func (n *node) addRoute(path string, handlers HandlersChain) {
	fullPath := path
	n.priority++                   // 父节点的权重加1
	numParams := countParams(path) // 判断有几个参数(:xxx||*xxx)，最多支持255个参数？ 为什么

	// 如果是根目录，并且是加入第一个路由的情况，直接将当前路由设为根路由
	if len(n.path) == 0 && len(n.children) == 0 {
		n.insertChild(numParams, path, fullPath, handlers)
		n.nType = root
		return
	}

	// 当前查找到的公共路径的索引，该变量会贯串整个插入逻辑
	parentFullPathIndex := 0

walk:
	for {
		// 该路径下最多有几个参数
		if numParams > n.maxParams {
			n.maxParams = numParams
		}

		// 查找最长的公共前缀, 公共前缀不包含 ':' or '*'， 返回前缀最后的一个字母的索引位
		i := longestCommonPrefix(path, n.path)

		// 分割路径
		// 1.如当前节点的 path 是 /apple, 新路径是 /app , 将会将 /apple 分割 /app -> le, 接下来就是对 /app 操作
		// 2.如当前节点的 path 是 /foo, 新路径是 /bar, 将会将 /foo 分割 / -> foo,接下来就是对 / 操作
		// 3.如当前节点的 path 是 /foo, 新路径是 /fbar, 将会将 /foo 分割 /f -> oo,接下来就是对 /f 操作
		if i < len(n.path) {
			child := node{
				path:      n.path[i:],
				wildChild: n.wildChild,
				indices:   n.indices,
				children:  n.children,
				handlers:  n.handlers,
				priority:  n.priority - 1,
				fullPath:  n.fullPath,
			}

			//  该路径下最多有几个参数
			for _, v := range child.children {
				if v.maxParams > child.maxParams {
					child.maxParams = v.maxParams
				}
			}

			n.children = []*node{&child}
			n.indices = string([]byte{n.path[i]})
			n.path = path[:i]
			n.handlers = nil
			n.wildChild = false

			// 这里使用了 parentFullPathIndex
			n.fullPath = fullPath[:parentFullPathIndex+i]
		}

		// 说明不是最后一级
		if i < len(path) {
			path = path[i:]

			// 该节点下级有通配符节点,则直接对比子节点路径
			// 已有路径：/:foo，则 /:foos，/:fo不合法 ，合法的有 /:foo，/foo/，/foo/xxx
			if n.wildChild {
				parentFullPathIndex += len(n.path)
				n = n.children[0]
				n.priority++

				if numParams > n.maxParams {
					n.maxParams = numParams
				}
				numParams--

				if len(path) >= len(n.path) && n.path == path[:len(n.path)] {
					if len(n.path) >= len(path) || path[len(n.path)] == '/' {
						continue walk
					}
				}

				// 否则都是不合法的
				pathSeg := path
				if n.nType != catchAll {
					pathSeg = strings.SplitN(path, "/", 2)[0]
				}
				prefix := fullPath[:strings.Index(fullPath, pathSeg)] + n.path
				panic("'" + pathSeg +
					"' in new path '" + fullPath +
					"' conflicts with existing wildcard '" + n.path +
					"' in existing prefix '" + prefix +
					"'")
			}

			// 如果当前查找到的节点下级无通配符节点
			// 获取第一个字符
			c := path[0]

			// 该节点是 param， 且只有一个子路径
			// 如果节点的 type 是 param ，按理说只有 0 ~ 1 个children
			// 什么时候会遇到这种情况呢？ "/cmd/:tool/:sub","/cmd/:tool/",
			if n.nType == param && c == '/' && len(n.children) == 1 {
				parentFullPathIndex += len(n.path)
				n = n.children[0]
				n.priority++
				continue walk
			}

			// 判断当前路径索引是否在其中
			for i, max := 0, len(n.indices); i < max; i++ {
				if c == n.indices[i] {
					parentFullPathIndex += len(n.path)
					i = n.incrementChildPrio(i)
					n = n.children[i]
					continue walk
				}
			}

			// 新增静态节点，则新增节点，并接到父节点上，对新增的节点进行操作
			if c != ':' && c != '*' {
				n.indices += string([]byte{c})
				child := &node{
					maxParams: numParams,
					fullPath:  fullPath,
				}
				n.children = append(n.children, child)
				n.incrementChildPrio(len(n.indices) - 1)
				n = child
			}

			// 找到了插入的位置，如果是需要新增的是 param or match 节点，则对他们的父节点进行操作
			// 如果是需要新增的是静态节点，则新增节点，并接到父节点上，对新增的节点进行操作
			n.insertChild(numParams, path, fullPath, handlers)
			return
		}

		// 如果是最后一级 ### i == len(path) {
		if n.handlers != nil {
			panic("handlers are already registered for path '" + fullPath + "'")
		}
		n.handlers = handlers
		return
	}
}
```
```go
func (n *node) insertChild(numParams uint8, path string, fullPath string, handlers HandlersChain) {
	// /path/:foo/bar
	// /path/:foo/
	// /path/:foo
	// /path/some:foo
	// /path/:foo/bar/:one
	for numParams > 0 {
		// 如果是动态路由，则循环查找第通配符
		wildcard, i, valid := findWildcard(path)

		// 这里主要是考虑这种情况 /path/:foo/bar, 当 :foo 处理完成之后需要处理 /bar
		if i < 0 {
			break
		}

		// 判读通配符是否合法 这种通配符 /xx:x:xx 不合法
		if !valid {
			panic("only one wildcard per path segment is allowed, has: '" +
				wildcard + "' in path '" + fullPath + "'")
		}

		// 判读通配符是否合法 不允许单独一个 : | *
		if len(wildcard) < 2 {
			panic("wildcards must be named with a non-empty name in path '" + fullPath + "'")
		}

		// 有这种情况，先定义了/bar/foo，然后定义了/bar/:one，将报错
		if len(n.children) > 0 {
			panic("wildcard segment '" + wildcard +
				"' conflicts with existing children in path '" + fullPath + "'")
		}

		if wildcard[0] == ':' { // 如果是 param
			if i > 0 {
				// 这里主要是考虑这种情况 /path/id:xx
				n.path = path[:i]
				path = path[i:]
			}

			n.wildChild = true
			child := &node{
				nType:     param,
				path:      wildcard,
				maxParams: numParams,
				fullPath:  fullPath,
			}
			n.children = []*node{child}
			n = child
			n.priority++
			numParams--

			// 如果路径不是以通配符结尾，则
			// 将存在另一个以'/'开头的子路径
			if len(wildcard) < len(path) {
				path = path[len(wildcard):]

				child := &node{
					maxParams: numParams,
					priority:  1,
					fullPath:  fullPath,
				}
				n.children = []*node{child}
				n = child
				continue
			}

			// Otherwise we're done. Insert the handle in the new leaf
			n.handlers = handlers
			return
		}

		// catchAll
		if i+len(wildcard) != len(path) || numParams > 1 {
			panic("catch-all routes are only allowed at the end of the path in path '" + fullPath + "'")
		}

		if len(n.path) > 0 && n.path[len(n.path)-1] == '/' {
			panic("catch-all conflicts with existing handle for the path segment root in path '" + fullPath + "'")
		}

		// currently fixed width 1 for '/'
		i--
		if path[i] != '/' {
			panic("no / before catch-all in path '" + fullPath + "'")
		}

		n.path = path[:i]

		// First node: catchAll node with empty path
		child := &node{
			wildChild: true,
			nType:     catchAll,
			maxParams: 1,
			fullPath:  fullPath,
		}
		// update maxParams of the parent node
		if n.maxParams < 1 {
			n.maxParams = 1
		}
		n.children = []*node{child}
		n.indices = string('/')
		n = child
		n.priority++

		// second node: node holding the variable
		child = &node{
			path:      path[i:],
			nType:     catchAll,
			maxParams: 1,
			handlers:  handlers,
			priority:  1,
			fullPath:  fullPath,
		}
		n.children = []*node{child}

		return
	}

	// 如果是静态路由，则直接插入就好了
	n.path = path
	n.handlers = handlers
	n.fullPath = fullPath
}
```