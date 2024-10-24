### go 语言中 struct 嵌套 interface

在很多地方，我们可以看到这种操作，如 `gin` 框架中

```go
type Context struct {
	writermem responseWriter
	Request   *http.Request
	Writer    ResponseWriter

	Params   Params
	handlers HandlersChain
	index    int8 // 用于判断是否 abort
	fullPath string // 全路径

	engine *Engine

	// This mutex protect Keys map
	mu sync.RWMutex

	// Keys is a key/value pair exclusively for the context of each request.
	Keys map[string]interface{}

	// Errors is a list of errors attached to all the handlers/middlewares who used this context.
	Errors errorMsgs

	// Accepted defines a list of manually accepted formats for content negotiation.
	Accepted []string

	// queryCache use url.ParseQuery cached the param query result from c.Request.URL.Query()
	queryCache url.Values

	// formCache use url.ParseQuery cached PostForm contains the parsed form data from POST, PATCH,
	// or PUT body parameters.
	formCache url.Values

	// SameSite allows a server to define a cookie attribute making it impossible for
	// the browser to send this cookie along with cross-site requests.
	sameSite http.SameSite
}

// Writer ResponseWriter 其实是一个接口，定义如下
type ResponseWriter interface {
	http.ResponseWriter
	http.Hijacker
	http.Flusher
	http.CloseNotifier

	// Returns the HTTP response status code of the current request.
	Status() int

	// Returns the number of bytes already written into the response http body.
	// See Written()
	Size() int

	// Writes the string into the response body.
	WriteString(string) (int, error)

	// Returns true if the response body was already written.
	Written() bool

	// Forces to write the http header (status code + headers).
	WriteHeaderNow()

	// get the http.Pusher for server push
	Pusher() http.Pusher
}
```
其实这种方法是表示 struct 无需实现 interface 接口中所有的方法，但是却实现了 interface 接口

```go
var _ ResponseWriter = &responseWriter{}
```
表示 responseWriter 必须实现 ResponseWriter 所有接口，否则不允许编译通过

参考：

* [golang的struct里面嵌入interface](https://www.jianshu.com/p/a5bc8add7c6e)