### 先看 `Put()` 方法
```go
func (p *Pool) Put(x interface{}) {
	if x == nil {
		return
	}
	// 未知
	if race.Enabled {
		if fastrand()%4 == 0 {
			return
		}
		race.ReleaseMerge(poolRaceAddr(x))
		race.Disable()
	}
	
	// 获取当前 P 私有的 poolLocal 对象
	l, _ := p.pin()
	if l.private == nil {
		l.private = x
		x = nil
	}
	if x != nil {
		l.shared.pushHead(x)
	}
	runtime_procUnpin()
	if race.Enabled {
		race.Enable()
	}
}
```
```go
func (c *poolChain) pushHead(val interface{}) {
	d := c.head
	if d == nil { 
		// 初始化 vals
		const initSize = 8 
		d = new(poolChainElt)
		d.vals = make([]eface, initSize)
		c.head = d
         // 这里为什么不能和上面一样直接 c.tail = d 呢？因为 tail 是多个消费者访问的，需要原子操作
		storePoolChainElt(&c.tail, d)
	}

	// 插入到 vals 中，false 表示 vals 已满 
	if d.pushHead(val) {
		return
	}

    // 扩容，最大扩容到 10,7374,1824, c.head 指向新添加的 poolChainElt 节点 (head 用来插入, tail 用来取出)
	newSize := len(d.vals) * 2
	if newSize >= dequeueLimit {
		newSize = dequeueLimit
	}

	d2 := &poolChainElt{prev: d}
	d2.vals = make([]eface, newSize)
	c.head = d2
    // 同理，d.next 是多消费者访问的，需要原子操作
	storePoolChainElt(&d.next, d2)
	d2.pushHead(val)
}
```
```go
func (d *poolDequeue) pushHead(val interface{}) bool {
	ptrs := atomic.LoadUint64(&d.headTail)
	
	// 将一个 64 的位数字，分割为 2 个 32 位的数字，高 32 位是头，低 32 为是尾
	head, tail := d.unpack(ptrs)
	
	// tail + 容量 == head 说明 vals 已经满了，看该方法倒数第二行就知道这里为什么这么做了
	if (tail+uint32(len(d.vals)))&(1<<dequeueBits-1) == head {
		return false
	}
	
	// 如果没满，则找到对应的插槽 第一个 & 的作用是取地址，第二个 & 是保存数据不溢出，也可以看成是取模运算  head % len(d.vals)
	slot := &d.vals[head&uint32(len(d.vals)-1)]
	
	// typ 是消费者使用的，所以需要原子操作, 但是为什么要判断 typ 呢？
    // 
	typ := atomic.LoadPointer(&slot.typ)
	if typ != nil {
		return false
	}

	if val == nil {
		val = dequeueNil(nil)
	}
	*(*interface{})(unsafe.Pointer(slot)) = val

	// 将 headTail + 1 实际上就是 headTail + 0x100000000 ，这种加法只会影响高 32 位，不会影响低 32 位
    // 这里需要注意，headTail 会一直加下去，不像平常的环形数组，有取余操作。
    // 如：一个容量为 8 的数组，有可能 head = 10, tail = 9， 乃至有可能 head = 10086, tail = 10080
	atomic.AddUint64(&d.headTail, 1<<dequeueBits)
	return true
}
```