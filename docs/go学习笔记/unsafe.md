参考
* [有点不安全却又一亮的 Go unsafe.Pointer](https://segmentfault.com/a/1190000017389782)

`unsafe.Pointer` 它表示 **任意类型且可寻址的指针值** ，可以在不同的指针类型之间进行转换（类似 C 语言的 void * 的用途）

其包含四种核心操作：

* 任何类型的指针值都可以转换为 Pointer
* Pointer 可以转换为任何类型的指针值
* uintptr 可以转换为 Pointer
* Pointer 可以转换为 uintptr

```go
func main(){
	n := Num{i: "EDDYCJY", j: 1}
	nPointer := unsafe.Pointer(&n)

	niPointer := (*string)(unsafe.Pointer(nPointer))
	*niPointer = "煎鱼"

	njPointer := (*int64)(unsafe.Pointer(uintptr(nPointer) + unsafe.Offsetof(n.j)))
	*njPointer = 2

	fmt.Printf("n.i: %s, n.j: %d", n.i, n.j)
}
```
利用 `unsafe.Pointer` 可以访问私用成员变量

`uintptr` 是 Go 的内置类型。返回无符号整数，可存储一个完整的地址。后续常用于指针运算

注意：`uintptr` 类型是不能存储在临时变量中的。因为从 GC 的角度来看，uintptr 类型的临时变量只是一个无符号整数，并不知道它是一个指针地址

因此当满足一定条件后，ptr 这个临时变量是可能被垃圾回收掉的，那么接下来的内存操作，岂不成迷？