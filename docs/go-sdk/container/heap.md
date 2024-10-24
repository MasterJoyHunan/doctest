### 最小堆  

如果不是在 leetcode 做 703 题的话，我还不知道 go 自带有常见的数据结构呢，一直以为 go 就只有简单的 slice 和 map。感慨自己的知识太浅薄了，趁此机会，看看 go 的 heap 是怎么实现的

```go
type Interface interface {
	sort.Interface
	Push(x interface{}) // add x as element Len()
	Pop() interface{}   // remove and return element Len() - 1.
}
```

heap  继承了 sort.Interface 的接口，使用 heap 必须实现其 Push、Pop、Len、Less、Swap 接口

在 sort 包中，内置了一个IntSlice 结构体，实现了 sort.Interface 接口，我们拿来直接用

```go
type IntSlice []int

func (p IntSlice) Len() int           { return len(p) }
func (p IntSlice) Less(i, j int) bool { return p[i] < p[j] }
func (p IntSlice) Swap(i, j int)      { p[i], p[j] = p[j], p[i] }
```

heap 使用了数组代替树结果，数组如何代替树结构呢，其核心就是使用数组的下标表示树的叶子节点所在的位置

* 下标为 0 的地方是树的根节点
* 任何一个节点的左孩子节点的位置就是当前节点下标 * 2 + 1
* 任何一个节点的右孩子节点的位置就是当前节点下标 * 2 + 2
* 除了根节点，其他的节点的父亲节点是当前节点下标 - 1 / 2

heap 包暴露了方法 push 方法

```go
func Push(h Interface, x interface{}) {
    // 调用了自定义的 push 方法, (自定义方法将子节点追加数组的最后)
	h.Push(x)
	up(h, h.Len()-1)
}
```

将最小的冒泡冒上去

```go
func up(h Interface, j int) {
	for {
		i := (j - 1) / 2 // 找到父节点
         // 自己如果是根节点或父节点比当前节点还要小的话，则退出
		if i == j || !h.Less(j, i) {
			break
		}
		h.Swap(i, j)
		j = i
	}
} 
```

heap 包暴露了方法 pop方法 删掉最小

```go
func Pop(h Interface) interface{} {
	n := h.Len() - 1
	h.Swap(0, n)
	down(h, 0, n)
	return h.Pop()
}
```

```go
func down(h Interface, i0, n int) bool {
	i := i0
	for {
		j1 := 2*i + 1
		if j1 >= n || j1 < 0 { // j1 < 0 after int overflow
			break
		}
		j := j1 // left child
		if j2 := j1 + 1; j2 < n && h.Less(j2, j1) { 
		}
		if !h.Less(j, i) {
			break
		}
		h.Swap(i, j)
		i = j
	}
	return i > i0
}
```

