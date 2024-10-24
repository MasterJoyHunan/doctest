

```go
package main

import (
	"flag"
	"fmt"

	"go-zero-micro/service/user/api/internal/config"
	"go-zero-micro/service/user/api/internal/handler"
	"go-zero-micro/service/user/api/internal/svc"

	"github.com/tal-tech/go-zero/core/conf"
	"github.com/tal-tech/go-zero/rest"
)

var configFile = flag.String("f", "service/user/api/etc/main.yaml", "the config file")

func main() {
	flag.Parse()
	
    // 将配置文件转换为 struct 对象
	var c config.Config
	conf.MustLoad(*configFile, &c)

    // 将所有需要的服务封装起来，提供给上下文调用
	ctx := svc.NewServiceContext(c)
    
    // 返回基于 http.Server 的对象 
	server := rest.MustNewServer(c.RestConf) 
	defer server.Stop()
	
    // 注册路由
	handler.RegisterHandlers(server, ctx)

	fmt.Printf("Starting server at %s:%d...\n", c.Host, c.Port)
    // 服务启动
	server.Start()
}
```

服务封装很简单，就是将一些经常用到的东西初始化

```go
type ServiceContext struct {
	Config           config.Config
	User             userservice.UserService // RPC 服务
	// Mysql , Redis 服务...
}
func NewServiceContext(c config.Config) *ServiceContext {
	return &ServiceContext{
		Config:           c,
		User: userservice.NewUserService(zrpc.MustNewClient(c.User)),
		// Mysql , Redis 初始化...
	}
}
```

重点看看 `MustNewServer` 这个方法做了什么，一路追踪下去

```go
// 这个方法只是封装了一层，保证返回的结果是没有错误的。返回一个 Server 对象，也就是 rest 的核心 
func MustNewServer(c RestConf, opts ...RunOption) *Server {
    // 重点看 NewServer
	engine, err := NewServer(c, opts...)
	if err != nil {
		log.Fatal(err)
	}
	return engine
}
```

NewServer 对 Server 做了初始化

```go
func NewServer(c RestConf, opts ...RunOption) (*Server, error) {
    // 初始化日志，并且单独启动了一个 http 服务用于 prometheus 监控, 如果不是线上发布模式还会 关闭统计信息，不自适应降载
	if err := c.SetUp(); err != nil {
		return nil, err
	}
	
	// 初始化 server
	server := &Server{
		ngin: newEngine(c), // (2)
		opts: runOptions{
			start: func(srv *engine) error {
				return srv.Start()
			},
		},
	}
	
    // 配置 server
	for _, opt := range opts {
		opt(server)
	}

	return server, nil
}

// (2) 
type engine struct {
	conf                 RestConf // host,端口，日志等配置
	routes               []featuredRoutes // 多组路由,一组路由是否需要鉴权,组中的一个路由的处理逻辑
	unauthorizedCallback handler.UnauthorizedCallback // 没有权限的回调
	unsignedCallback     handler.UnsignedCallback // 没有签名的回调
	middlewares          []Middleware // 中间件
	shedder              load.Shedder // 自适应降载，前提是 CpuThreshold 要设置大于 0
    priorityShedder      load.Shedder // 优先的自适应降载(至少 50 会触发),前提是 CpuThreshold 要设置大于 0
}
func newEngine(c RestConf) *engine {
	srv := &engine{
		conf: c,
	}
    // 前提
	if c.CpuThreshold > 0 {
		srv.shedder = load.NewAdaptiveShedder(load.WithCpuThreshold(c.CpuThreshold))
		srv.priorityShedder = load.NewAdaptiveShedder(load.WithCpuThreshold(
			(c.CpuThreshold + topCpuUsage) >> 1))
	}
	return srv
}
```

我们再来看看 Server 有哪些可配置项，及有哪些公开的方法

```go
// 设置 NotFound 处理逻辑 -- 这里有个坑 NotFound 和 NotAllowed 无法共存
func WithNotFoundHandler(handler http.Handler) RunOption {
	rt := router.NewRouter() // 创建新的 patRouter 对象 , NotFound 和 NotAllowed 无法共存就是因为这里
	rt.SetNotFoundHandler(handler)
	return WithRouter(rt)
}

// 设置 NotAllowed 处理逻辑
func WithNotAllowedHandler(handler http.Handler) RunOption {
	rt := router.NewRouter() // 创建新的 patRouter 对象 , NotFound 和 NotAllowed 无法共存就是因为这里
	rt.SetNotAllowedHandler(handler)
	return WithRouter(rt)
}

// 设置 NotFound 和 NotAllowed 最终处理逻辑
func WithRouter(router httpx.Router) RunOption {
	return func(server *Server) {
        // 这里将覆盖默认的 patRouter 对象, patRouter 对象将会有 NotFound 或 NotAllowed 逻辑
		server.opts.start = func(srv *engine) error {
			return srv.StartWithRouter(router)
		}
	}
}

// 设置 Unauthorized 没有权限回调 (jwt)
func WithUnauthorizedCallback(callback handler.UnauthorizedCallback) RunOption {
	return func(engine *Server) {
		engine.ngin.SetUnauthorizedCallback(callback)
	}
}

// 设置 Unsigned 签名错误回调 (jwt)
func WithUnsignedCallback(callback handler.UnsignedCallback) RunOption {
	return func(engine *Server) {
		engine.ngin.SetUnsignedCallback(callback)
	}
}
```

初始化完毕之后,就需要定义路由了,`patRouter` 对象处理路由的对象,这个对象将以树的形式存储全部的路由

```go
// 接口
type Router interface {
	http.Handler
	Handle(method string, path string, handler http.Handler) error
	SetNotFoundHandler(handler http.Handler)
	SetNotAllowedHandler(handler http.Handler)
}

// 实现了 Router 接口, 本质就是实现了 http.Handler 接口的对象, 用来处理匹配了路由的函数
type patRouter struct {
	trees      map[string]*search.Tree // 存储 path 路径的地方, 一个前缀树 
	notFound   http.Handler
	notAllowed http.Handler
}
```

重点看看 `patRouter` 对象的两个方法 

```go
// 添加路由
func (pr *patRouter) Handle(method, reqPath string, handler http.Handler) error {
	if !validMethod(method) {
		return ErrInvalidMethod
	}

	if len(reqPath) == 0 || reqPath[0] != '/' {
		return ErrInvalidPath
	}

	cleanPath := path.Clean(reqPath)
	tree, ok := pr.trees[method]
	if ok {
		return tree.Add(cleanPath, handler)
	}

	tree = search.NewTree()
	pr.trees[method] = tree
	return tree.Add(cleanPath, handler)
}
// 路由处理逻辑, 实现了 http.Handler 接口
func (pr *patRouter) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	reqPath := path.Clean(r.URL.Path)
	if tree, ok := pr.trees[r.Method]; ok {
		if result, ok := tree.Search(reqPath); ok {
			if len(result.Params) > 0 {
				r = context.WithPathVars(r, result.Params)
			}
			result.Item.(http.Handler).ServeHTTP(w, r)
			return
		}
	}

	allows, ok := pr.methodsAllowed(r.Method, reqPath)
	if !ok {
		pr.handleNotFound(w, r)
		return
	}

	if pr.notAllowed != nil {
		pr.notAllowed.ServeHTTP(w, r)
	} else {
		w.Header().Set(allowHeader, allows)
		w.WriteHeader(http.StatusMethodNotAllowed)
	}
}

```

```go

type (
	// 中间件定义 func(next http.HandlerFunc) http.HandlerFunc 的别名
	Middleware func(next http.HandlerFunc) http.HandlerFunc

	// func(r *featuredRoutes) 的别名
	RouteOption func(r *featuredRoutes)

    // jwt 设置 
	jwtSetting struct {
		enabled    bool
		secret     string
		prevSecret string
	}
	signatureSetting struct {
		SignatureConf
		enabled bool
	}

    // 需要鉴权的(一组)路由
	featuredRoutes struct {
		priority  bool
		jwt       jwtSetting
		signature signatureSetting
		routes    []Route // 具体的路由
	}
    
    // 路由定义 (请求方法,请求路径,处理逻辑)
	Route struct {
		Method  string
		Path    string
		Handler http.HandlerFunc
	}
)
```


