channle 就是连接 goroutine 于 goroutine 之间的通道 （ pipeline ）

通道可以关闭  `colse(some)`

如果通道关闭，将无法再往通道中写数据 （但是可以读）。其他 goroutine 读完最后一个存放在通道里面的数据，再继续读取的话将只能获取“零值”，没有直接的办法判断通道是否被关闭，只能通过读取通道的时候做判断，`res , ok := <- channel` 如果 ` ok == false` 则说明通道已被读取完毕，并且通道已关闭

```go
go func() {
		for {
			x, ok := <- add
			if !ok {
				break
			}
			mut <- x * x
		}
		close(mut)
	}()
```

go 也为我们提供了语法糖

```go
go func() {
		for x := range add {
			mut <- x * x
		}
		close(mut)
	}()
```

不要关闭已关闭的通道 ，否则将会宕机

关闭通道也不是必须的，GC会自动回收不可达的 channel

channel 可以将双通道转为单通道， 但是无法将单通道转为双通道

缓冲通道：定义通道时，可以指定通道的容量，设置了容量的通道成为缓冲通道。
当持续往缓冲通道写入数据的情况下，如果通道容量已满，再次往通道里写入数据，将会阻塞程序运行，直到有其他 goroutine 取出通道里的数据

不要将通道作为队列使用
不要将通道作为队列使用
不要将通道作为队列使用
因为有永久阻塞 goroutine 的风险，更好的选择是 slice, 


cap() 函数可以检测通道的容量
len() 函数可以检测当前通道的个数，需要注意的是，在高并发情况下，该值变换过快，所以价值很低

```go
func main() {
	chan1 := make(chan int, 3)

	chan1 <- 5
	fmt.Println("5")
	chan1 <- 6
	fmt.Println("6")
	chan1 <- 7
	fmt.Println("7")
	// 程序将一直阻塞，无法执行下面代码
	chan1 <- 8
	fmt.Println("8")

}
```

无缓冲通道如果里面有数据，且未关闭，将造成 goroutine 泄露，这是一个BUG，将会导致 GC 不会回收。所以确保 goroutine 在不需要的时候自动结束。
```go
func query() string {
	ch := make(chan string, 3)
	go func() {ch <- req("http://www.a.com")}()
	go func() {ch <- req("http://www.b.com")}()
	go func() {ch <- req("http://www.c.com")}()
	// 将导致返回慢的请求被卡住，因为没有 goroutine 接受通道
	return <-ch
}

func req(host string) string {
	return host + " response"
}
```
无缓冲通道效率比缓冲通道效率低，因为无缓冲相当于同步操作，每次发送就需要等待接收 


总结：想象一个工厂流水线 goroutine 相当于流水线上的工人，大家同时（异步）做着不同的工作，而 channel 相当于流水线的传送带，不同的工种，不同的工人可能速度会有些差异，所有控制流水线的速度非常重要。想象一下，当前一个工人速度非常快，而后一个工人非常慢的情况，这种情况将会将大量的产品堆积在后者身边。可以想象，这个时候调整流水线的速度是没用的，整个流水线都会受到其影响。为了解决这个问题，我们可以在该工位再添加一个人 （goroutine）来处理该流程