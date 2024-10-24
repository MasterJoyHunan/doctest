channel 是 goroutine 于 goroutine 之间连接的桥梁，也是通信的实现

建立一个无缓冲通道，如果一个 goroutine 发送消息，另一个 goroutine将会阻塞，知道读取消息为止

反之，如果一个 goroutine 先执行接受消息，另一个 goroutine将会阻塞，直到发送了消息为止

因为这样的特性，无缓冲通道也成为同步通道，当一个值在通道传递时，接受方接收到了值，发送方才会被唤醒



在有channel连接的时候，关闭读的 goroutine 会导致发生错误， 关闭写的 goroutine 导致 EOF

