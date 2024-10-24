### 基本测试
创建 `xxx_test.go` 文件，方法使用 `Test` 开头
执行 `go test` 

### 覆盖率测试
执行 `go test -cover`
执行 `go test -run=Coverage -coverprofile=c.out`

### 基准测试， 方法使用 `Benchmark` 开头
执行 `go test -bench=.` 正则匹配
执行 `go test -bench=. -benchmem`  benchmem参数将统计内存分配统计数据

### 性能报告
`cpu` 性能剖析
`堆` 性能剖析
`阻塞` 性能剖析
执行 `go test -cpuprofile=cpu.out` 
执行 `go test -blockprofile=block.out` 
执行 `go test -memprofile=mem.out` 
性能报告无法生成同时生成多个，因为机制就是这样的
得到结果之后，需要 `go tool pprof` 工具分析
使用过滤器 `-run=NONE` 不测试基准测试

example: 
```bash
# 获取测试用例的输出文件
go test -run=NONE \ # 不测试基准测试
-bench=TEST_METHOD \ # 测试的方法（正则）
-cpuprofile=CUP.out \ # 输出的文件
net/http # 测试的包（正则）

# 分析
go tool pprof \
-text \ # 以文档方式输出
-nodecount=10 \ # 显示10条数据
./http.test \ # 可执行文件
CUP.out # 分析的文件

# ——————————————————————————— 得到的结果 —————————————————————————
File: http.test
Type: cpu
Time: Dec 7, 2019 at 10:44am (CST)
Duration: 1.05mins, Total samples = 80990ms (128.53%)
Showing nodes accounting for 55850ms, 68.96% of 80990ms total
Dropped 690 nodes (cum <= 404.95ms)
Showing top 10 nodes out of 225
      flat  flat%   sum%        cum   cum%
   22600ms 27.90% 27.90%    23090ms 28.51%  syscall.syscall
   12140ms 14.99% 42.89%    12140ms 14.99%  runtime.pthread_cond_signal
    7600ms  9.38% 52.28%     7600ms  9.38%  runtime.pthread_cond_wait
    3780ms  4.67% 56.95%     3790ms  4.68%  runtime.usleep
    2110ms  2.61% 59.55%     2120ms  2.62%  runtime.kevent
    1910ms  2.36% 61.91%     1910ms  2.36%  runtime.madvise
    1810ms  2.23% 64.14%     1810ms  2.23%  syscall.rawSyscall
    1510ms  1.86% 66.01%     1520ms  1.88%  runtime.nanotime
    1420ms  1.75% 67.76%     1420ms  1.75%  runtime.pthread_cond_timedwait_relative_np
     970ms  1.20% 68.96%      970ms  1.20%  runtime.memmove
```

