### go-zero链路追踪

首先看看链路追踪的基本用法

```go
func main() {
	flag.Parse()

	var c config.Config
	conf.MustLoad(*configFile, &c)

	ctx := svc.NewServiceContext(c)
	
	// 1.创建个 server 
	server := rest.MustNewServer(c.RestConf)
	defer server.Stop()

	handler.RegisterHandlers(server, ctx)

	fmt.Printf("Starting server at %s:%d...\n", c.Host, c.Port)
	
	// 2.运行该server
	server.Start()
}
```

```go
func MustNewServer(c RestConf, opts ...RunOption) *Server {
	// 核心是 NewServer()
	engine, err := NewServer(c, opts...)
	if err != nil {
		log.Fatal(err)
	}

	return engine
}

func NewServer(c RestConf, opts ...RunOption) (*Server, error) {
	// c.SetUp() 设置配置，promethuse 相关，暂时不深入
	if err := c.SetUp(); err != nil {
		return nil, err
	}

	server := &Server{
		ngin: newEngine(c),
		opts: runOptions{
			// 关键是这里做了什么，请看下方代码
			start: func(srv *engine) error {
				return srv.Start()
			},
		},
	}

	for _, opt := range opts {
		opt(server)
	}

	return server, nil
}

```

```go
func (e *Server) Start() {
	// e.opts 在上方定义，其实这里就是执行了e.ngin.Start()
	handleError(e.opts.start(e.ngin))
}

func (s *engine) Start() error {
	// 深入这里
	return s.StartWithRouter(router.NewRouter())
}

func (s *engine) StartWithRouter(router httpx.Router) error {
	// 继续深入这里
	if err := s.bindRoutes(router); err != nil {
		return err
	}

	// 判断是否启用 https
	if len(s.conf.CertFile) == 0 && len(s.conf.KeyFile) == 0 {
		return internal.StartHttp(s.conf.Host, s.conf.Port, router)
	}

	return internal.StartHttps(s.conf.Host, s.conf.Port, s.conf.CertFile, s.conf.KeyFile, router)
}

func (s *engine) bindRoutes(router httpx.Router) error {
	// 这里和指标相关，暂不深入
	metrics := s.createMetrics()

	for _, fr := range s.routes {
		// 看来每个路由都做了一些操作，继续深入
		if err := s.bindFeaturedRoutes(router, fr, metrics); err != nil {
			return err
		}
	}

	return nil
}

func (s *engine) bindFeaturedRoutes(router httpx.Router, fr featuredRoutes, metrics *stat.Metrics) error {
	// 暂时不知道这一行是干嘛用的，不过应该和  trace 无关
	verifier, err := s.signatureVerifier(fr.signature)
	if err != nil {
		return err
	}

	for _, route := range fr.routes {
		if err := s.bindRoute(fr, router, metrics, route, verifier); err != nil {
			return err
		}
	}

	return nil
}


func (s *engine) bindRoute(fr featuredRoutes, router httpx.Router, metrics *stat.Metrics,
	route Route, verifier func(chain alice.Chain) alice.Chain) error {
	chain := alice.New(
		// 主角闪亮登场 TracingHandler 
		handler.TracingHandler,
		s.getLogHandler(),
		handler.MaxConns(s.conf.MaxConns),
		handler.BreakerHandler(route.Method, route.Path, metrics),
		handler.SheddingHandler(s.getShedder(fr.priority), metrics),
		handler.TimeoutHandler(time.Duration(s.conf.Timeout)*time.Millisecond),
		handler.RecoverHandler,
		handler.MetricHandler(metrics),
		handler.PromethousHandler(route.Path),
		handler.MaxBytesHandler(s.conf.MaxBytes),
		handler.GunzipHandler,
	)
	chain = s.appendAuthHandler(fr, chain, verifier)

	for _, middleware := range s.middlewares {
		chain = chain.Append(convertMiddleware(middleware))
	}
	handle := chain.ThenFunc(route.Handler)

	return router.Handle(route.Method, route.Path, handle)
}
```


```go
func TracingHandler(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// 为 http.Header 添加 Get Set 方法
		carrier, err := trace.Extract(trace.HttpFormat, r.Header)
		if err != nil && err != trace.ErrInvalidCarrier {
			logx.Error(err)
		}

		ctx, span := trace.StartServerSpan(r.Context(), carrier, sysx.Hostname(), r.RequestURI)
		defer span.Finish()
		r = r.WithContext(ctx)

		next.ServeHTTP(w, r)
	})
}

func Extract(format, carrier interface{}) (Carrier, error) {
	switch v := format.(type) {
	case int:
		if v == HttpFormat {
			return emptyHttpPropagator.Extract(carrier)
		} else if v == GrpcFormat {
			return emptyGrpcPropagator.Extract(carrier)
		}
	}

	return nil, ErrInvalidCarrier
}

func (h httpPropagator) Extract(carrier interface{}) (Carrier, error) {
	if c, ok := carrier.(http.Header); !ok {
		return nil, ErrInvalidCarrier
	} else {
		return httpCarrier(c), nil
	}
}

var httpCarrier http.Header
func (h httpCarrier) Get(key string) string {
	return http.Header(h).Get(key)
}

func (h httpCarrier) Set(key, val string) {
	http.Header(h).Set(key, val)
}
```

```go
// 返回记录本次请求的 traceId 和 spanId
func StartServerSpan(ctx context.Context, carrier Carrier, serviceName, operationName string) (
	context.Context, tracespec.Trace) {
	span := newServerSpan(carrier, serviceName, operationName)
	return context.WithValue(ctx, tracespec.TracingKey, span), span
}

//返回 tracespec.Trace 接口
func newServerSpan(carrier Carrier, serviceName, operationName string) tracespec.Trace {
	// 返回单次请求全局唯一ID 
	traceId := stringx.TakeWithPriority(func() string {
		if carrier != nil {
			return carrier.Get(traceIdKey)
		}
		return ""
	}, stringx.RandId)
	// 返回单个节点的ID
	spanId := stringx.TakeWithPriority(func() string {
		if carrier != nil {
			return carrier.Get(spanIdKey)
		}
		return ""
	}, func() string {
		return initSpanId
	})

	return &Span{
		ctx: spanContext{
			traceId: traceId,
			spanId:  spanId,
		},
		serviceName:   serviceName,
		operationName: operationName,
		startTime:     timex.Time(),
		flag:          serverFlag,
	}
}

// 这里就不多解释了
func TakeWithPriority(fns ...func() string) string {
	for _, fn := range fns {
		val := fn()
		if len(val) > 0 {
			return val
		}
	}

	return ""
}
```
至此，从哪里开始设置 traceId 的问题解决了

接下来我们看每次请求，go-gzro 框架都干了些什么吧，仅看 traceId，spanId 在传输的过程中发生了什么变化

我们先从 `StartWithRouter()` 这个方法看起，看看 `internal.StartHttp()` 这个方法都做了些什么

```go
func StartHttp(host string, port int, handler http.Handler) error {
	return start(host, port, handler, func(srv *http.Server) error {
		return srv.ListenAndServe()
	})
}

func start(host string, port int, handler http.Handler, run func(srv *http.Server) error) error {
	server := &http.Server{
		Addr:    fmt.Sprintf("%s:%d", host, port),
		Handler: handler,
	}
	// 搞不懂这是什么意思
	waitForCalled := proc.AddWrapUpListener(func() {
		server.Shutdown(context.Background())
	})
	defer waitForCalled()
	return run(server)
}
```

