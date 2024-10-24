### 疑问
通过学习 `pool` 源码，我们可能解决了部分问题，但是随之而来是更多的问题。

* 什么是 `free-lock`？
* 什么时候使用 `atomic` 什么时候又不使用呢？
* `*(*interface{})(unsafe.Pointer(slot))` 到底做了什么？
* `race` 包做了什么？
* `put` 操作为什么要判断 ` typ = nil` 呢？
* 什么情况下 `d` 暂时为空呢？

### 收获
通过学习 `pool` 源码，我们认识，且学会了一下的知识点，收获颇丰

* golang 的 `MPG`模型
* `unsafe` 包，用来操作内存
* `atomic` 包，用来原子操作
* 学会了一些 GC 的知识
* 对 `pool` 的结构有了清晰的认识，如下图
![http://tc.masterjoy.top/20200611/57ed1785e77624dede92571b77fb455e.png](http://tc.masterjoy.top/20200611/57ed1785e77624dede92571b77fb455e.png)