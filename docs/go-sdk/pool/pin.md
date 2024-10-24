先看看 `pin` 函数
```go
func (p *Pool) pin() (*poolLocal, int) {
	pid := runtime_procPin()              // 返回低当前 P 的 id, 并禁止抢占当前 P
	s := atomic.LoadUintptr(&p.localSize) // 原子的导出 p.localSize 当前的值(pool.local 数组的大小，每个pool拥有其中一个元素)
	l := p.local                          // pool.local 的地址赋值给 l
	
	// uintptr(pid) 怎么理解呢？当前 P 的 pid 为 0 ~ n ,且一个 P 含有local的一个元素，如果当前 pid 大于等于 local 元素个数,说明这个是新的 P ,则执行下面的方法， 否则说明该 P 是含有 local 元素
	if uintptr(pid) < s {                 
		return indexLocal(l, pid), pid
	}
	return p.pinSlow()
}
```
接下来看看 `indexLocal()` 做了啥
```go
// 很显然，该函数是获取 local 第 N 个对象， 也就是说，获取数组中第N个元素
func indexLocal(l unsafe.Pointer, i int) *poolLocal {
	lp := unsafe.Pointer(uintptr(l) + uintptr(i)*unsafe.Sizeof(poolLocal{}))
	return (*poolLocal)(lp)
}
```

```go
func (p *Pool) pinSlow() (*poolLocal, int) {
	// allPools 存放是的全局对象池 ，对全局对象池锁加锁解锁需要很多时间，所以runtime_procUnpin() 取消禁止抢占当前 P
	runtime_procUnpin()        
	allPoolsMu.Lock()
	defer allPoolsMu.Unlock()
	
	// 重新获取当前 P 的 id, 因为执行 runtime_procUnpin() 之后，当前 P 可能和以前的 P 有可能不同。
	// 为什么不和上面一样使用 atomic.LoadUintptr() 获取 localSize， 因为在这里使用了 allPoolsMu.Lock() 锁，不会有并发读写问题。
	pid := runtime_procPin()   
	s := p.localSize
	l := p.local
	if uintptr(pid) < s {
		return indexLocal(l, pid), pid
	}
	
	// 进行到这里说明当前对象池还没有初始化或被GC，进行初始化
	if p.local == nil {
		allPools = append(allPools, p)
	}
	size := runtime.GOMAXPROCS(0)
	local := make([]poolLocal, size)
	atomic.StorePointer(&p.local, unsafe.Pointer(&local[0]))
	atomic.StoreUintptr(&p.localSize, uintptr(size))
	return &local[pid], pid
}
```