### 再看 `Get()` 方法
```go
func (p *Pool) Get() interface{} {
	// ??????
	if race.Enabled {
		race.Disable()
	}
	
	// 获取当前 P 绑定的 pool 的 poolLocal ,先判断 poolLocal 是否有缓存 (private) 对象，有则取出，并且置空
	l, pid := p.pin()
	x := l.private
	l.private = nil
	if x == nil {
		// 缓存没有则去 poolChain 链表上去取
		x, _ = l.shared.popHead()
		if x == nil {
			// 链表上没有则去其他 P 那里“偷”
			x = p.getSlow(pid)
		}
	}
	runtime_procUnpin()
	if race.Enabled {
		race.Enable()
		if x != nil {
			race.Acquire(poolRaceAddr(x))
		}
	}
	
	// 如果设置了New方法，则使用 New 方法新建一个
	if x == nil && p.New != nil {
		x = p.New()
	}
	return x
}
```
```go
// 查找 head 指向的节点，如果该节点满了，则找上一个节点，循环往复
func (c *poolChain) popHead() (interface{}, bool) {
	d := c.head
	for d != nil {
		if val, ok := d.popHead(); ok {
			return val, ok
		}
		d = loadPoolChainElt(&d.prev)
	}
	return nil, false
}
```
```go
func (d *poolDequeue) popHead() (interface{}, bool) {
	var slot *eface
	for {
         // 判断该节点是否为空，
		ptrs := atomic.LoadUint64(&d.headTail)
		head, tail := d.unpack(ptrs)
		if tail == head {
			return nil, false
		}

		head--
		ptrs2 := d.pack(head, tail)
         // CompareAndSwapUint64 有可能失败，所以使用 for 循环包裹，因为同时可能有多个 Goroutine 在执行取出操作
         // 所以要判断 headTail 是不是当前取出的值，类似于乐观锁。
		if atomic.CompareAndSwapUint64(&d.headTail, ptrs, ptrs2) {
            // 如果成功了，则进行获取对应的值。 head&uint32(len(d.vals)-1) 看起来很复杂，其实可以这样看 head % len(d.vals)
			slot = &d.vals[head&uint32(len(d.vals)-1)]
			break
		}
	}

	val := *(*interface{})(unsafe.Pointer(slot))
	if val == dequeueNil(nil) {
		val = nil
	}
	// 因为是生产者，直接将该位置的值置空
	*slot = eface{}
	return val, true
}
```
```go
func (p *Pool) getSlow(pid int) interface{} {
	size := atomic.LoadUintptr(&p.localSize) 
	locals := p.local               
    
	// 尝试去其他 P 上面获取对象 如果当前的 pid = 0, 且有 4 个核心， 则顺序为 1,2,3,0
	for i := 0; i < int(size); i++ {
		l := indexLocal(locals, (pid+i+1)%int(size))
		if x, _ := l.shared.popTail(); x != nil {
			return x
		}
	}

	// 从受害者缓存里面获取，和本地缓存完全一样的逻辑
	size = atomic.LoadUintptr(&p.victimSize)
	if uintptr(pid) >= size {
		return nil
	}
	locals = p.victim
	l := indexLocal(locals, pid)
	if x := l.private; x != nil {
		l.private = nil
		return x
	}
	for i := 0; i < int(size); i++ {
		l := indexLocal(locals, (pid+i)%int(size))
		if x, _ := l.shared.popTail(); x != nil {
			return x
		}
	}
    
    // 如果受害者缓存无数据，则清空受害者缓存
	atomic.StoreUintptr(&p.victimSize, 0)
	return nil
}
```
```go
func (c *poolChain) popTail() (interface{}, bool) {
	// 说明是空的
	d := loadPoolChainElt(&c.tail)
	if d == nil {
		return nil, false
	}
	
	for {
         // It's important that we load the next pointer
		// *before* popping the tail. In general, d may be
		// transiently empty, but if next is non-nil before
		// the pop and the pop fails, then d is permanently
		// empty, which is the only condition under which it's
		// safe to drop d from the chain.
        
		// 注释上说在 for 循环的一开始，就把 d.next 加载到了 d2。因为 d 可能会暂为空 ??????
         // 我始终未理解 d 可能会暂为空指的是哪种情况
		d2 := loadPoolChainElt(&d.next)

		if val, ok := d.popTail(); ok {
			return val, ok
		}

		if d2 == nil {
			return nil, false
		}

		if atomic.CompareAndSwapPointer((*unsafe.Pointer)(unsafe.Pointer(&c.tail)), unsafe.Pointer(d), unsafe.Pointer(d2)) {
			storePoolChainElt(&d2.prev, nil)
		}
		d = d2
	}
```
```go
func (d *poolDequeue) popTail() (interface{}, bool) {
	var slot *eface
	for {
		ptrs := atomic.LoadUint64(&d.headTail)
		head, tail := d.unpack(ptrs)
		if tail == head {
			return nil, false
		}

		ptrs2 := d.pack(head, tail+1)
		if atomic.CompareAndSwapUint64(&d.headTail, ptrs, ptrs2) {
			// tail % len(d.vals)
			slot = &d.vals[tail&uint32(len(d.vals)-1)]
			break
		}
	}
	val := *(*interface{})(unsafe.Pointer(slot))
	if val == dequeueNil(nil) {
		val = nil
	}

    // 对应了 (d *poolDequeue) pushHead() 方法
    // ??????
	slot.val = nil
	atomic.StorePointer(&slot.typ, nil)

	return val, true
}
```