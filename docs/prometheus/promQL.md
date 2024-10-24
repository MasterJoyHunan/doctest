### 11个聚合运算

* `sum ([metrics])` 求指标的和
* `max ([metrics])` 求指标的最大值
* `avg ([metrics])` 求指标的平均值
* `min ([metrics])` 求指标的最小值
* `count([metrics])` 求指标的数量
* `rate ([metrics] [5m])` 指标在某个时间段内每秒的数据 一般配合 `[?m]` 来使用，对 counter 类型起作用
* increase 类似 rate
* irate 类似 rate
* histogram_quantile(0.9, rate([xxx_xx])) 求某个百分位以内的 数据
* stdvar 标准差 -- 看不懂
* strdev 标准差 -- 看不懂
* topk 取最大的 K 条数据
* bottomk 取最小的 K 条数据
* quantile 返回指定分位数的值
* count_values

###  2个子句

* `without([tag])` 去除某个指标的标签.
* `by([tag])` 只保留某个指标的标签

### 选择器

例子

| node_network_transmit_bytes_total{**device**="br-19b2f4f5e7f6", **instance**="masterjoy.top:8100", **job**="masterjoy-node"} | 0           |
| ------------------------------------------------------------ | ----------- |
| node_network_transmit_bytes_total{**device**="br-5d9832a8ae2c", **instance**="masterjoy.top:8100", **job**="masterjoy-node"} | 0           |
| node_network_transmit_bytes_total{**device**="br-d27aeb309ca0", **instance**="masterjoy.top:8100", **job**="masterjoy-node"} | 29584540    |
| node_network_transmit_bytes_total{**device**="br-d9f9027f6de8", **instance**="masterjoy.top:8100", **job**="masterjoy-node"} | 0           |
| node_network_transmit_bytes_total{**device**="br-dcd041b1ac24", **instance**="masterjoy.top:8100", **job**="masterjoy-node"} | 2427661     |
| node_network_transmit_bytes_total{**device**="cni0", **instance**="masterjoy.top:8100", **job**="masterjoy-node"} | 5820162096  |
| node_network_transmit_bytes_total{**device**="docker0", **instance**="masterjoy.top:8100", **job**="masterjoy-node"} | 0           |
| node_network_transmit_bytes_total{**device**="eth0", **instance**="masterjoy.top:8100", **job**="masterjoy-node"} | 4842776896  |
| node_network_transmit_bytes_total{**device**="flannel.1", **instance**="masterjoy.top:8100", **job**="masterjoy-node"} | 0           |
| node_network_transmit_bytes_total{**device**="lo", **instance**="masterjoy.top:8100", **job**="masterjoy-node"} | 47515597119 |
| node_network_transmit_bytes_total{**device**="veth03184be1", **instance**="masterjoy.top:8100", **job**="masterjoy-node"} | 1093102054  |
| node_network_transmit_bytes_total{**device**="veth0ac84dd4", **instance**="masterjoy.top:8100", **job**="masterjoy-node"} | 1027627687  |
| node_network_transmit_bytes_total{**device**="veth45c630a0", **instance**="masterjoy.top:8100", **job**="masterjoy-node"} | 2436377286  |
| node_network_transmit_bytes_total{**device**="veth5cb0f9fe", **instance**="masterjoy.top:8100", **job**="masterjoy-node"} | 1025031012  |
| node_network_transmit_bytes_total{**device**="veth713a1ae", **instance**="masterjoy.top:8100", **job**="masterjoy-node"} | 8461006     |
| node_network_transmit_bytes_total{**device**="veth7937b5b", **instance**="masterjoy.top:8100", **job**="masterjoy-node"} | 5843965     |
| node_network_transmit_bytes_total{**device**="vethe2f8333", **instance**="masterjoy.top:8100", **job**="masterjoy-node"} | 2427661     |
| node_network_transmit_bytes_total{**device**="vethf7b06cdc", **instance**="masterjoy.top:8100", **job**="masterjoy-node"} | 331394654   |

* `=` 等式匹配器 { **job**="masterjoy-node"} 这里指 job 标签的值必须等于 "masterjoy-node"， 还有一种用法是 {job=""}, 这样是指 job 标签必须不存在
* `!=` 否定等式匹配器 { **job**!="masterjoy-node"} 这里指 job 标签的值必须不等于 "masterjoy-node"
* `=~` 正则表达式匹配器  { **job**=~"m.*"}  正则是完全锚定的，这里指匹配标签前缀为 `m` 的指标， 如果标签前缀为 `am` 则不会匹配
* `!~` 与上面的相反，如果匹配到了，则不包含
* `[time]` 范围向量选择器，总和 `rate()` 等函数一同出现
* `offset` 偏移量，每个选择器加上 offset 可以回退到过去的某个时间

可以在一个选择器中同时使用多个匹配器，且可以使用多个标签同样的匹配器

