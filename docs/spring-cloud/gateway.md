### 网关简介
[官方文档](https://s0cloud0spring0io.icopy.site/spring-cloud-static/spring-cloud-gateway/2.2.1.RELEASE/reference/html/#the-between-route-predicate-factory)
### 路由匹配 `route predicates`
某个请求必须匹配不同的规则，才能进行对应的转发

```yaml
spring:
  cloud:
    gateway:
      routes:
      - id: after_route
        uri: https://example.org
        predicates: # 路由匹配规则
        - After=2017-01-20T17:42:47.789-07:00[America/Denver]
```
内置路由匹配规则 （精选）
* After -- 某个时间节点之后该规则才能生效
* Before -- 某个时间节点之前该规则才能生效
* Between -- 某两个时间节点之间该规则才能生效
* Cookie -- 必须包含了某个 cookie 
* ......
### 过滤器 `route fliter`
路由过滤器允许以某种方式修改传入的HTTP请求或传出的HTTP响应，一般不常用，我们经常使用代码来进行过滤的操作

```yaml
spring:
  cloud:
    gateway:
      routes:
      - id: add_request_parameter_route
        uri: https://example.org
        filters: # 过滤器
        - AddRequestParameter=red, blue
```

内置的过滤器（精选）：
* AddRequestHeader -- 将某个请求头加入请求
* AddRequestParameter -- 将某个请求参数加入请求
* AddResponseHeader -- 将某个请求的响应头加入到响应
* DedupeResponseHeader -- 将某个请求的响应头删除
* SetPath -- 将某个请求的 url 重新设置
* .......

### 实际案例：配合 nacos config 实现动态网关
### 实际案例：实现灰度发布
ui 界面自带实现了基于 IP 粒度的灰度发布，如需其他灰度发布，需自己定义

