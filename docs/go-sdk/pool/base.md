* [golang新版如何优化sync.pool锁竞争消耗？](http://xiaorui.cc/archives/5878)
* [深度解密 Go 语言之 sync.Pool](https://www.cnblogs.com/qcrao-2018/p/12736031.html)
* [Go 1.13中 sync.Pool 是如何优化的?](https://colobu.com/2019/10/08/how-is-sync-Pool-improved-in-Go-1-13/)
* [golang的对象池sync.pool源码解读](https://zhuanlan.zhihu.com/p/99710992)

注意Pool的实现中使用了`runtime_procPin()`方法，它可以将一个goroutine死死占用当前使用的`P`(P-M-G中的processor)，不允许其它goroutine/M抢占,这样它就可以自由的使用shard中和这个P相关的local，不必担心竞争的问题。释放pin的方法是`runtime_procUnpin`

```go
type Pool struct {
	noCopy noCopy
	local     unsafe.Pointer 
	localSize uintptr  
	victim     unsafe.Pointer // 如果 local 缓存对象过期了，将先存入 victim 中，
	victimSize uintptr  
	New func() interface{}
}
//所谓受害者缓存（Victim Cache），是一个与直接匹配或低相联缓存并用的、容量很小的全相联缓存。当一个数据块被逐出缓存时，并不直接丢弃，而是暂先进入受害者缓存。如果受害者缓存已满，就替换掉其中一项。当进行缓存标签匹配时，在与索引指向标签匹配的同时，并行查看受害者缓存，如果在受害者缓存发现匹配，就将其此数据块与缓存中的不匹配数据块做交换，同时返回给处理器。
```

关注一下 `poolLocal` 结构体
```go
type poolLocal struct {
	poolLocalInternal

	// 这是用来的内存对齐用的，防止内存共享，而导致锁的问题
	pad [128 - unsafe.Sizeof(poolLocalInternal{})%128]byte
}
```
```go
type poolLocalInternal struct {
	private interface{} // Can be used only by the respective P.
	shared  poolChain   // Local P can pushHead/popHead; any P can popTail.
}
```
```go
type poolChain struct {
	head *poolChainElt
	tail *poolChainElt
}
```
```go
type poolChainElt struct {
	poolDequeue
	next, prev *poolChainElt
}
```
```go
type poolDequeue struct {
	headTail uint64
	// 有容量限制，最小为 8 ，最大为 10,7374,1824 个
	vals []eface
}
```
```go
type eface struct {
	typ, val unsafe.Pointer
}
```
### 不复制
```go
type noCopy struct{}
func (*noCopy) Lock()   {}
func (*noCopy) Unlock() {}
```

