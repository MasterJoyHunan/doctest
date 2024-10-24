### 数据类型

* gauge 仪表盘    -- 适合固定值的指标
    * 如 cup 使用量，当前 20，过15 秒后，还是20， 再过 15 秒后还是 20
    * 内存使用量，当前 60，过15 秒后，还是60， 再过 15 秒后还是 20
* counter 计数器  -- 适合一直累加的指标
    * 如果请求发生错误 当前 0 ，过15 秒后发生一次，则值为1， 再过 15 秒发生2次，则当前值为3
* summary 摘要  -- 适合计算百分比，该指标会生成两个指标。 例子 -- 比如记录一次http请求的次数 [count] 和延迟 [sum] 
  * count 记录次数
  * sum 记录总数 （非总次数）
* histogram 直方图 -- summary 的升级版，能直接计算出比例，而且是多个比例 该指标会生成三个指标
  * bucket  记录边界 
  * count 记录次数
  * sum 记录总数（非总次数）
```
压缩所运行的时间
# HELP prometheus_tsdb_compaction_duration_seconds Duration of compaction runs
# TYPE prometheus_tsdb_compaction_duration_seconds histogram
prometheus_tsdb_compaction_duration_seconds_bucket{le="1"} 1 (小于等于1秒的 1 次)
prometheus_tsdb_compaction_duration_seconds_bucket{le="2"} 1
prometheus_tsdb_compaction_duration_seconds_bucket{le="4"} 1
prometheus_tsdb_compaction_duration_seconds_bucket{le="8"} 1
prometheus_tsdb_compaction_duration_seconds_bucket{le="16"} 1
prometheus_tsdb_compaction_duration_seconds_bucket{le="32"} 1
prometheus_tsdb_compaction_duration_seconds_bucket{le="64"} 1
prometheus_tsdb_compaction_duration_seconds_bucket{le="128"} 1 (小于等于128秒的 1 次)
prometheus_tsdb_compaction_duration_seconds_bucket{le="256"} 1
prometheus_tsdb_compaction_duration_seconds_bucket{le="512"} 1
prometheus_tsdb_compaction_duration_seconds_bucket{le="1024"} 1
prometheus_tsdb_compaction_duration_seconds_bucket{le="2048"} 1
prometheus_tsdb_compaction_duration_seconds_bucket{le="4096"} 1
prometheus_tsdb_compaction_duration_seconds_bucket{le="8192"} 1 (小于等于8192秒的 1 次)
prometheus_tsdb_compaction_duration_seconds_bucket{le="+Inf"} 1
prometheus_tsdb_compaction_duration_seconds_sum 0.0943673 (所有运行次数的总时间)
prometheus_tsdb_compaction_duration_seconds_count 1 (总共运行的几次)
```

### 标签

* 测控标签 -- 自定义标签
* 目标标签 -- 系统生成标签

### rate 对 counter 有效

举个网卡发送多少字节的例子，看看 rate() 到底做了什么,

```promQL
node_network_receive_bytes_total


node_network_receive_bytes_total{device="br-19b2f4f5e7f6", instance="masterjoy.top:8100", job="masterjoy-node"}
0
node_network_receive_bytes_total{device="br-5d9832a8ae2c", instance="masterjoy.top:8100", job="masterjoy-node"}
0
node_network_receive_bytes_total{device="br-d9f9027f6de8", instance="masterjoy.top:8100", job="masterjoy-node"}
0
node_network_receive_bytes_total{device="cni0", instance="masterjoy.top:8100", job="masterjoy-node"}
3127806167
node_network_receive_bytes_total{device="docker0", instance="masterjoy.top:8100", job="masterjoy-node"}
0
node_network_receive_bytes_total{device="eth0", instance="masterjoy.top:8100", job="masterjoy-node"}
4627824095
node_network_receive_bytes_total{device="flannel.1", instance="masterjoy.top:8100", job="masterjoy-node"}
0
node_network_receive_bytes_total{device="lo", instance="masterjoy.top:8100", job="masterjoy-node"}
67956503358
node_network_receive_bytes_total{device="veth03184be1", instance="masterjoy.top:8100", job="masterjoy-node"}
1653177144
node_network_receive_bytes_total{device="veth0ac84dd4", instance="masterjoy.top:8100", job="masterjoy-node"}
504331480
node_network_receive_bytes_total{device="veth28d1d2e6", instance="masterjoy.top:8100", job="masterjoy-node"}
5076
node_network_receive_bytes_total{device="veth32e8ab5b", instance="masterjoy.top:8100", job="masterjoy-node"}
1236687
node_network_receive_bytes_total{device="veth37e95e60", instance="masterjoy.top:8100", job="masterjoy-node"}
400395
node_network_receive_bytes_total{device="veth5cb0f9fe", instance="masterjoy.top:8100", job="masterjoy-node"}
507970011
node_network_receive_bytes_total{device="veth7817dfd8", instance="masterjoy.top:8100", job="masterjoy-node"}
2830037
node_network_receive_bytes_total{device="veth9d20a7a1", instance="masterjoy.top:8100", job="masterjoy-node"}
1100096
node_network_receive_bytes_total{device="veth9f446455", instance="masterjoy.top:8100", job="masterjoy-node"}
1112837
node_network_receive_bytes_total{device="vethafab3e15", instance="masterjoy.top:8100", job="masterjoy-node"}
16420359
node_network_receive_bytes_total{device="vethb72df001", instance="masterjoy.top:8100", job="masterjoy-node"}
14438
node_network_receive_bytes_total{device="vethc60c7c54", instance="masterjoy.top:8100", job="masterjoy-node"}
26568623
node_network_receive_bytes_total{device="vethc96a315c", instance="masterjoy.top:8100", job="masterjoy-node"}
678383
node_network_receive_bytes_total{device="vethcd1957a7", instance="masterjoy.top:8100", job="masterjoy-node"}
178219398
node_network_receive_bytes_total{device="vethd9bd9461", instance="masterjoy.top:8100", job="masterjoy-node"}
56710
node_network_receive_bytes_total{device="vethe6dbdc72", instance="masterjoy.top:8100", job="masterjoy-node"}
37943032


```

得出最新的所有网卡的发送数据量的指标

device="vethe6dbdc72" 的网卡累计发送了 37943032 byte = 37053.7421 kb = 36.1852 mb

累计发送了多少流量对我们毫无意义，我们需要的的是一个趋势，使用如下查询

```promQL
node_network_receive_bytes_total[1m]
```

得到如下结果

```
node_network_receive_bytes_total{device="br-19b2f4f5e7f6", instance="masterjoy.top:8100", job="masterjoy-node"}
0 @1620972497.944
0 @1620972512.939
0 @1620972527.936
0 @1620972542.937
node_network_receive_bytes_total{device="br-5d9832a8ae2c", instance="masterjoy.top:8100", job="masterjoy-node"}
0 @1620972497.944
0 @1620972512.939
0 @1620972527.936
0 @1620972542.937
node_network_receive_bytes_total{device="br-d9f9027f6de8", instance="masterjoy.top:8100", job="masterjoy-node"}
0 @1620972497.944
0 @1620972512.939
0 @1620972527.936
0 @1620972542.937
node_network_receive_bytes_total{device="cni0", instance="masterjoy.top:8100", job="masterjoy-node"}
3131013628 @1620972497.944
3131137466 @1620972512.939
3132839125 @1620972527.936
3132960454 @1620972542.937
node_network_receive_bytes_total{device="docker0", instance="masterjoy.top:8100", job="masterjoy-node"}
0 @1620972497.944
0 @1620972512.939
0 @1620972527.936
0 @1620972542.937
node_network_receive_bytes_total{device="eth0", instance="masterjoy.top:8100", job="masterjoy-node"}
4630004537 @1620972497.944
4630061545 @1620972512.939
4630121288 @1620972527.936
4630170635 @1620972542.937
node_network_receive_bytes_total{device="flannel.1", instance="masterjoy.top:8100", job="masterjoy-node"}
0 @1620972497.944
0 @1620972512.939
0 @1620972527.936
0 @1620972542.937
node_network_receive_bytes_total{device="lo", instance="masterjoy.top:8100", job="masterjoy-node"}
67967496168 @1620972497.944
67968132237 @1620972512.939
67968683570 @1620972527.936
67969328312 @1620972542.937
node_network_receive_bytes_total{device="veth03184be1", instance="masterjoy.top:8100", job="masterjoy-node"}
1653419087 @1620972497.944
1653429677 @1620972512.939
1653446386 @1620972527.936
1653461314 @1620972542.937
node_network_receive_bytes_total{device="veth0ac84dd4", instance="masterjoy.top:8100", job="masterjoy-node"}
504387196 @1620972497.944
504391724 @1620972512.939
504395058 @1620972527.936
504398326 @1620972542.937
node_network_receive_bytes_total{device="veth28d1d2e6", instance="masterjoy.top:8100", job="masterjoy-node"}
5076 @1620972497.944
5076 @1620972512.939
5076 @1620972527.936
5076 @1620972542.937
node_network_receive_bytes_total{device="veth32e8ab5b", instance="masterjoy.top:8100", job="masterjoy-node"}
1236687 @1620972497.944
1236687 @1620972512.939
1236687 @1620972527.936
1236687 @1620972542.937
node_network_receive_bytes_total{device="veth37e95e60", instance="masterjoy.top:8100", job="masterjoy-node"}
400395 @1620972497.944
400395 @1620972512.939
400395 @1620972527.936
400395 @1620972542.937
node_network_receive_bytes_total{device="veth5cb0f9fe", instance="masterjoy.top:8100", job="masterjoy-node"}
508026137 @1620972497.944
508030532 @1620972512.939
508033659 @1620972527.936
508037486 @1620972542.937
node_network_receive_bytes_total{device="veth7817dfd8", instance="masterjoy.top:8100", job="masterjoy-node"}
2830037 @1620972497.944
2830037 @1620972512.939
2830037 @1620972527.936
2830037 @1620972542.937
node_network_receive_bytes_total{device="veth9d20a7a1", instance="masterjoy.top:8100", job="masterjoy-node"}
1100096 @1620972497.944
1100096 @1620972512.939
1100096 @1620972527.936
1100096 @1620972542.937
node_network_receive_bytes_total{device="veth9f446455", instance="masterjoy.top:8100", job="masterjoy-node"}
1112837 @1620972497.944
1112837 @1620972512.939
1112837 @1620972527.936
1112837 @1620972542.937
node_network_receive_bytes_total{device="vethafab3e15", instance="masterjoy.top:8100", job="masterjoy-node"}
18381388 @1620972497.944
18454634 @1620972512.939
20061635 @1620972527.936
20134964 @1620972542.937
node_network_receive_bytes_total{device="vethb72df001", instance="masterjoy.top:8100", job="masterjoy-node"}
14438 @1620972497.944
14438 @1620972512.939
14438 @1620972527.936
14438 @1620972542.937
node_network_receive_bytes_total{device="vethc60c7c54", instance="masterjoy.top:8100", job="masterjoy-node"}
26662233 @1620972497.944
26665841 @1620972512.939
26672991 @1620972527.936
26676599 @1620972542.937
node_network_receive_bytes_total{device="vethc96a315c", instance="masterjoy.top:8100", job="masterjoy-node"}
678383 @1620972497.944
678383 @1620972512.939
678383 @1620972527.936
678383 @1620972542.937
node_network_receive_bytes_total{device="vethcd1957a7", instance="masterjoy.top:8100", job="masterjoy-node"}
179031873 @1620972497.944
179064806 @1620972512.939
179130606 @1620972527.936
179155415 @1620972542.937
node_network_receive_bytes_total{device="vethd9bd9461", instance="masterjoy.top:8100", job="masterjoy-node"}
56710 @1620972497.944
56710 @1620972512.939
56710 @1620972527.936
56710 @1620972542.937
node_network_receive_bytes_total{device="vethe6dbdc72", instance="masterjoy.top:8100", job="masterjoy-node"}
38074102 @1620972497.944
38079132 @1620972512.939
38089216 @1620972527.936
38094204 @1620972542.937
```

挑一个解析

```
device="vethe6dbdc72"
38074102 @1620972497.944
38079132 @1620972512.939
38089216 @1620972527.936
38094204 @1620972542.937
```

这是一分钟片段抓取的4条结果，为什么是4条，因为我们在 `promethues.yaml` 设置了抓取时间 `scrape_interval: 15s` 15秒抓取一次，一分钟就抓取4次

那rate() 呢？看下结果

```
rate(node_network_receive_bytes_total[1m])
```

获取结果

```
{device="br-19b2f4f5e7f6", instance="masterjoy.top:8100", job="masterjoy-node"}
0
{device="br-5d9832a8ae2c", instance="masterjoy.top:8100", job="masterjoy-node"}
0
{device="br-d9f9027f6de8", instance="masterjoy.top:8100", job="masterjoy-node"}
0
{device="cni0", instance="masterjoy.top:8100", job="masterjoy-node"}
5927.072682818403
{device="docker0", instance="masterjoy.top:8100", job="masterjoy-node"}
0
{device="eth0", instance="masterjoy.top:8100", job="masterjoy-node"}
1685.0188930873526
{device="flannel.1", instance="masterjoy.top:8100", job="masterjoy-node"}
0
{device="lo", instance="masterjoy.top:8100", job="masterjoy-node"}
38930.76239164258
{device="veth03184be1", instance="masterjoy.top:8100", job="masterjoy-node"}
1035.296732607246
{device="veth0ac84dd4", instance="masterjoy.top:8100", job="masterjoy-node"}
261.6359190931318
{device="veth28d1d2e6", instance="masterjoy.top:8100", job="masterjoy-node"}
0
{device="veth32e8ab5b", instance="masterjoy.top:8100", job="masterjoy-node"}
0
{device="veth37e95e60", instance="masterjoy.top:8100", job="masterjoy-node"}
0
{device="veth5cb0f9fe", instance="masterjoy.top:8100", job="masterjoy-node"}
216.8259613247388
{device="veth7817dfd8", instance="masterjoy.top:8100", job="masterjoy-node"}
0
{device="veth9d20a7a1", instance="masterjoy.top:8100", job="masterjoy-node"}
0
{device="veth9f446455", instance="masterjoy.top:8100", job="masterjoy-node"}
0
{device="vethafab3e15", instance="masterjoy.top:8100", job="masterjoy-node"}
706.645921315848
{device="vethb72df001", instance="masterjoy.top:8100", job="masterjoy-node"}
0
{device="vethc60c7c54", instance="masterjoy.top:8100", job="masterjoy-node"}
400.97799511002444
{device="vethc96a315c", instance="masterjoy.top:8100", job="masterjoy-node"}
0
{device="vethcd1957a7", instance="masterjoy.top:8100", job="masterjoy-node"}
3475.0611246943763
{device="vethd9bd9461", instance="masterjoy.top:8100", job="masterjoy-node"}
0
{device="vethe6dbdc72", instance="masterjoy.top:8100", job="masterjoy-node"}
560.0800177817292
```

挑最后一个

```
device="vethe6dbdc72"
560.0800177817292
```

指的是 1分钟内平均每秒发送了多少数据，也就是说，当前一分钟该网卡总计发送了多少数据，减去前一分钟该网卡总计发送了多少数据，结果再除以60秒，就是当前的结果

