import{_ as n,c as a,a2 as e,o as t}from"./chunks/framework.DPuwY6B9.js";const r=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"prometheus/note.md","filePath":"prometheus/note.md","lastUpdated":1729815932000}'),p={name:"prometheus/note.md"};function o(l,s,c,i,u,q){return t(),a("div",null,s[0]||(s[0]=[e(`<h3 id="数据类型" tabindex="-1">数据类型 <a class="header-anchor" href="#数据类型" aria-label="Permalink to &quot;数据类型&quot;">​</a></h3><ul><li>gauge 仪表盘 -- 适合固定值的指标 <ul><li>如 cup 使用量，当前 20，过15 秒后，还是20， 再过 15 秒后还是 20</li><li>内存使用量，当前 60，过15 秒后，还是60， 再过 15 秒后还是 20</li></ul></li><li>counter 计数器 -- 适合一直累加的指标 <ul><li>如果请求发生错误 当前 0 ，过15 秒后发生一次，则值为1， 再过 15 秒发生2次，则当前值为3</li></ul></li><li>summary 摘要 -- 适合计算百分比，该指标会生成两个指标。 例子 -- 比如记录一次http请求的次数 [count] 和延迟 [sum] <ul><li>count 记录次数</li><li>sum 记录总数 （非总次数）</li></ul></li><li>histogram 直方图 -- summary 的升级版，能直接计算出比例，而且是多个比例 该指标会生成三个指标 <ul><li>bucket 记录边界</li><li>count 记录次数</li><li>sum 记录总数（非总次数）</li></ul></li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>压缩所运行的时间</span></span>
<span class="line"><span># HELP prometheus_tsdb_compaction_duration_seconds Duration of compaction runs</span></span>
<span class="line"><span># TYPE prometheus_tsdb_compaction_duration_seconds histogram</span></span>
<span class="line"><span>prometheus_tsdb_compaction_duration_seconds_bucket{le=&quot;1&quot;} 1 (小于等于1秒的 1 次)</span></span>
<span class="line"><span>prometheus_tsdb_compaction_duration_seconds_bucket{le=&quot;2&quot;} 1</span></span>
<span class="line"><span>prometheus_tsdb_compaction_duration_seconds_bucket{le=&quot;4&quot;} 1</span></span>
<span class="line"><span>prometheus_tsdb_compaction_duration_seconds_bucket{le=&quot;8&quot;} 1</span></span>
<span class="line"><span>prometheus_tsdb_compaction_duration_seconds_bucket{le=&quot;16&quot;} 1</span></span>
<span class="line"><span>prometheus_tsdb_compaction_duration_seconds_bucket{le=&quot;32&quot;} 1</span></span>
<span class="line"><span>prometheus_tsdb_compaction_duration_seconds_bucket{le=&quot;64&quot;} 1</span></span>
<span class="line"><span>prometheus_tsdb_compaction_duration_seconds_bucket{le=&quot;128&quot;} 1 (小于等于128秒的 1 次)</span></span>
<span class="line"><span>prometheus_tsdb_compaction_duration_seconds_bucket{le=&quot;256&quot;} 1</span></span>
<span class="line"><span>prometheus_tsdb_compaction_duration_seconds_bucket{le=&quot;512&quot;} 1</span></span>
<span class="line"><span>prometheus_tsdb_compaction_duration_seconds_bucket{le=&quot;1024&quot;} 1</span></span>
<span class="line"><span>prometheus_tsdb_compaction_duration_seconds_bucket{le=&quot;2048&quot;} 1</span></span>
<span class="line"><span>prometheus_tsdb_compaction_duration_seconds_bucket{le=&quot;4096&quot;} 1</span></span>
<span class="line"><span>prometheus_tsdb_compaction_duration_seconds_bucket{le=&quot;8192&quot;} 1 (小于等于8192秒的 1 次)</span></span>
<span class="line"><span>prometheus_tsdb_compaction_duration_seconds_bucket{le=&quot;+Inf&quot;} 1</span></span>
<span class="line"><span>prometheus_tsdb_compaction_duration_seconds_sum 0.0943673 (所有运行次数的总时间)</span></span>
<span class="line"><span>prometheus_tsdb_compaction_duration_seconds_count 1 (总共运行的几次)</span></span></code></pre></div><h3 id="标签" tabindex="-1">标签 <a class="header-anchor" href="#标签" aria-label="Permalink to &quot;标签&quot;">​</a></h3><ul><li>测控标签 -- 自定义标签</li><li>目标标签 -- 系统生成标签</li></ul><h3 id="rate-对-counter-有效" tabindex="-1">rate 对 counter 有效 <a class="header-anchor" href="#rate-对-counter-有效" aria-label="Permalink to &quot;rate 对 counter 有效&quot;">​</a></h3><p>举个网卡发送多少字节的例子，看看 rate() 到底做了什么,</p><div class="language-promQL vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">promQL</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>node_network_receive_bytes_total</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>node_network_receive_bytes_total{device=&quot;br-19b2f4f5e7f6&quot;, instance=&quot;masterjoy.top:8100&quot;, job=&quot;masterjoy-node&quot;}</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span>node_network_receive_bytes_total{device=&quot;br-5d9832a8ae2c&quot;, instance=&quot;masterjoy.top:8100&quot;, job=&quot;masterjoy-node&quot;}</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span>node_network_receive_bytes_total{device=&quot;br-d9f9027f6de8&quot;, instance=&quot;masterjoy.top:8100&quot;, job=&quot;masterjoy-node&quot;}</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span>node_network_receive_bytes_total{device=&quot;cni0&quot;, instance=&quot;masterjoy.top:8100&quot;, job=&quot;masterjoy-node&quot;}</span></span>
<span class="line"><span>3127806167</span></span>
<span class="line"><span>node_network_receive_bytes_total{device=&quot;docker0&quot;, instance=&quot;masterjoy.top:8100&quot;, job=&quot;masterjoy-node&quot;}</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span>node_network_receive_bytes_total{device=&quot;eth0&quot;, instance=&quot;masterjoy.top:8100&quot;, job=&quot;masterjoy-node&quot;}</span></span>
<span class="line"><span>4627824095</span></span>
<span class="line"><span>node_network_receive_bytes_total{device=&quot;flannel.1&quot;, instance=&quot;masterjoy.top:8100&quot;, job=&quot;masterjoy-node&quot;}</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span>node_network_receive_bytes_total{device=&quot;lo&quot;, instance=&quot;masterjoy.top:8100&quot;, job=&quot;masterjoy-node&quot;}</span></span>
<span class="line"><span>67956503358</span></span>
<span class="line"><span>node_network_receive_bytes_total{device=&quot;veth03184be1&quot;, instance=&quot;masterjoy.top:8100&quot;, job=&quot;masterjoy-node&quot;}</span></span>
<span class="line"><span>1653177144</span></span>
<span class="line"><span>node_network_receive_bytes_total{device=&quot;veth0ac84dd4&quot;, instance=&quot;masterjoy.top:8100&quot;, job=&quot;masterjoy-node&quot;}</span></span>
<span class="line"><span>504331480</span></span>
<span class="line"><span>node_network_receive_bytes_total{device=&quot;veth28d1d2e6&quot;, instance=&quot;masterjoy.top:8100&quot;, job=&quot;masterjoy-node&quot;}</span></span>
<span class="line"><span>5076</span></span>
<span class="line"><span>node_network_receive_bytes_total{device=&quot;veth32e8ab5b&quot;, instance=&quot;masterjoy.top:8100&quot;, job=&quot;masterjoy-node&quot;}</span></span>
<span class="line"><span>1236687</span></span>
<span class="line"><span>node_network_receive_bytes_total{device=&quot;veth37e95e60&quot;, instance=&quot;masterjoy.top:8100&quot;, job=&quot;masterjoy-node&quot;}</span></span>
<span class="line"><span>400395</span></span>
<span class="line"><span>node_network_receive_bytes_total{device=&quot;veth5cb0f9fe&quot;, instance=&quot;masterjoy.top:8100&quot;, job=&quot;masterjoy-node&quot;}</span></span>
<span class="line"><span>507970011</span></span>
<span class="line"><span>node_network_receive_bytes_total{device=&quot;veth7817dfd8&quot;, instance=&quot;masterjoy.top:8100&quot;, job=&quot;masterjoy-node&quot;}</span></span>
<span class="line"><span>2830037</span></span>
<span class="line"><span>node_network_receive_bytes_total{device=&quot;veth9d20a7a1&quot;, instance=&quot;masterjoy.top:8100&quot;, job=&quot;masterjoy-node&quot;}</span></span>
<span class="line"><span>1100096</span></span>
<span class="line"><span>node_network_receive_bytes_total{device=&quot;veth9f446455&quot;, instance=&quot;masterjoy.top:8100&quot;, job=&quot;masterjoy-node&quot;}</span></span>
<span class="line"><span>1112837</span></span>
<span class="line"><span>node_network_receive_bytes_total{device=&quot;vethafab3e15&quot;, instance=&quot;masterjoy.top:8100&quot;, job=&quot;masterjoy-node&quot;}</span></span>
<span class="line"><span>16420359</span></span>
<span class="line"><span>node_network_receive_bytes_total{device=&quot;vethb72df001&quot;, instance=&quot;masterjoy.top:8100&quot;, job=&quot;masterjoy-node&quot;}</span></span>
<span class="line"><span>14438</span></span>
<span class="line"><span>node_network_receive_bytes_total{device=&quot;vethc60c7c54&quot;, instance=&quot;masterjoy.top:8100&quot;, job=&quot;masterjoy-node&quot;}</span></span>
<span class="line"><span>26568623</span></span>
<span class="line"><span>node_network_receive_bytes_total{device=&quot;vethc96a315c&quot;, instance=&quot;masterjoy.top:8100&quot;, job=&quot;masterjoy-node&quot;}</span></span>
<span class="line"><span>678383</span></span>
<span class="line"><span>node_network_receive_bytes_total{device=&quot;vethcd1957a7&quot;, instance=&quot;masterjoy.top:8100&quot;, job=&quot;masterjoy-node&quot;}</span></span>
<span class="line"><span>178219398</span></span>
<span class="line"><span>node_network_receive_bytes_total{device=&quot;vethd9bd9461&quot;, instance=&quot;masterjoy.top:8100&quot;, job=&quot;masterjoy-node&quot;}</span></span>
<span class="line"><span>56710</span></span>
<span class="line"><span>node_network_receive_bytes_total{device=&quot;vethe6dbdc72&quot;, instance=&quot;masterjoy.top:8100&quot;, job=&quot;masterjoy-node&quot;}</span></span>
<span class="line"><span>37943032</span></span></code></pre></div><p>得出最新的所有网卡的发送数据量的指标</p><p>device=&quot;vethe6dbdc72&quot; 的网卡累计发送了 37943032 byte = 37053.7421 kb = 36.1852 mb</p><p>累计发送了多少流量对我们毫无意义，我们需要的的是一个趋势，使用如下查询</p><div class="language-promQL vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">promQL</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>node_network_receive_bytes_total[1m]</span></span></code></pre></div><p>得到如下结果</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>node_network_receive_bytes_total{device=&quot;br-19b2f4f5e7f6&quot;, instance=&quot;masterjoy.top:8100&quot;, job=&quot;masterjoy-node&quot;}</span></span>
<span class="line"><span>0 @1620972497.944</span></span>
<span class="line"><span>0 @1620972512.939</span></span>
<span class="line"><span>0 @1620972527.936</span></span>
<span class="line"><span>0 @1620972542.937</span></span>
<span class="line"><span>node_network_receive_bytes_total{device=&quot;br-5d9832a8ae2c&quot;, instance=&quot;masterjoy.top:8100&quot;, job=&quot;masterjoy-node&quot;}</span></span>
<span class="line"><span>0 @1620972497.944</span></span>
<span class="line"><span>0 @1620972512.939</span></span>
<span class="line"><span>0 @1620972527.936</span></span>
<span class="line"><span>0 @1620972542.937</span></span>
<span class="line"><span>node_network_receive_bytes_total{device=&quot;br-d9f9027f6de8&quot;, instance=&quot;masterjoy.top:8100&quot;, job=&quot;masterjoy-node&quot;}</span></span>
<span class="line"><span>0 @1620972497.944</span></span>
<span class="line"><span>0 @1620972512.939</span></span>
<span class="line"><span>0 @1620972527.936</span></span>
<span class="line"><span>0 @1620972542.937</span></span>
<span class="line"><span>node_network_receive_bytes_total{device=&quot;cni0&quot;, instance=&quot;masterjoy.top:8100&quot;, job=&quot;masterjoy-node&quot;}</span></span>
<span class="line"><span>3131013628 @1620972497.944</span></span>
<span class="line"><span>3131137466 @1620972512.939</span></span>
<span class="line"><span>3132839125 @1620972527.936</span></span>
<span class="line"><span>3132960454 @1620972542.937</span></span>
<span class="line"><span>node_network_receive_bytes_total{device=&quot;docker0&quot;, instance=&quot;masterjoy.top:8100&quot;, job=&quot;masterjoy-node&quot;}</span></span>
<span class="line"><span>0 @1620972497.944</span></span>
<span class="line"><span>0 @1620972512.939</span></span>
<span class="line"><span>0 @1620972527.936</span></span>
<span class="line"><span>0 @1620972542.937</span></span>
<span class="line"><span>node_network_receive_bytes_total{device=&quot;eth0&quot;, instance=&quot;masterjoy.top:8100&quot;, job=&quot;masterjoy-node&quot;}</span></span>
<span class="line"><span>4630004537 @1620972497.944</span></span>
<span class="line"><span>4630061545 @1620972512.939</span></span>
<span class="line"><span>4630121288 @1620972527.936</span></span>
<span class="line"><span>4630170635 @1620972542.937</span></span>
<span class="line"><span>node_network_receive_bytes_total{device=&quot;flannel.1&quot;, instance=&quot;masterjoy.top:8100&quot;, job=&quot;masterjoy-node&quot;}</span></span>
<span class="line"><span>0 @1620972497.944</span></span>
<span class="line"><span>0 @1620972512.939</span></span>
<span class="line"><span>0 @1620972527.936</span></span>
<span class="line"><span>0 @1620972542.937</span></span>
<span class="line"><span>node_network_receive_bytes_total{device=&quot;lo&quot;, instance=&quot;masterjoy.top:8100&quot;, job=&quot;masterjoy-node&quot;}</span></span>
<span class="line"><span>67967496168 @1620972497.944</span></span>
<span class="line"><span>67968132237 @1620972512.939</span></span>
<span class="line"><span>67968683570 @1620972527.936</span></span>
<span class="line"><span>67969328312 @1620972542.937</span></span>
<span class="line"><span>node_network_receive_bytes_total{device=&quot;veth03184be1&quot;, instance=&quot;masterjoy.top:8100&quot;, job=&quot;masterjoy-node&quot;}</span></span>
<span class="line"><span>1653419087 @1620972497.944</span></span>
<span class="line"><span>1653429677 @1620972512.939</span></span>
<span class="line"><span>1653446386 @1620972527.936</span></span>
<span class="line"><span>1653461314 @1620972542.937</span></span>
<span class="line"><span>node_network_receive_bytes_total{device=&quot;veth0ac84dd4&quot;, instance=&quot;masterjoy.top:8100&quot;, job=&quot;masterjoy-node&quot;}</span></span>
<span class="line"><span>504387196 @1620972497.944</span></span>
<span class="line"><span>504391724 @1620972512.939</span></span>
<span class="line"><span>504395058 @1620972527.936</span></span>
<span class="line"><span>504398326 @1620972542.937</span></span>
<span class="line"><span>node_network_receive_bytes_total{device=&quot;veth28d1d2e6&quot;, instance=&quot;masterjoy.top:8100&quot;, job=&quot;masterjoy-node&quot;}</span></span>
<span class="line"><span>5076 @1620972497.944</span></span>
<span class="line"><span>5076 @1620972512.939</span></span>
<span class="line"><span>5076 @1620972527.936</span></span>
<span class="line"><span>5076 @1620972542.937</span></span>
<span class="line"><span>node_network_receive_bytes_total{device=&quot;veth32e8ab5b&quot;, instance=&quot;masterjoy.top:8100&quot;, job=&quot;masterjoy-node&quot;}</span></span>
<span class="line"><span>1236687 @1620972497.944</span></span>
<span class="line"><span>1236687 @1620972512.939</span></span>
<span class="line"><span>1236687 @1620972527.936</span></span>
<span class="line"><span>1236687 @1620972542.937</span></span>
<span class="line"><span>node_network_receive_bytes_total{device=&quot;veth37e95e60&quot;, instance=&quot;masterjoy.top:8100&quot;, job=&quot;masterjoy-node&quot;}</span></span>
<span class="line"><span>400395 @1620972497.944</span></span>
<span class="line"><span>400395 @1620972512.939</span></span>
<span class="line"><span>400395 @1620972527.936</span></span>
<span class="line"><span>400395 @1620972542.937</span></span>
<span class="line"><span>node_network_receive_bytes_total{device=&quot;veth5cb0f9fe&quot;, instance=&quot;masterjoy.top:8100&quot;, job=&quot;masterjoy-node&quot;}</span></span>
<span class="line"><span>508026137 @1620972497.944</span></span>
<span class="line"><span>508030532 @1620972512.939</span></span>
<span class="line"><span>508033659 @1620972527.936</span></span>
<span class="line"><span>508037486 @1620972542.937</span></span>
<span class="line"><span>node_network_receive_bytes_total{device=&quot;veth7817dfd8&quot;, instance=&quot;masterjoy.top:8100&quot;, job=&quot;masterjoy-node&quot;}</span></span>
<span class="line"><span>2830037 @1620972497.944</span></span>
<span class="line"><span>2830037 @1620972512.939</span></span>
<span class="line"><span>2830037 @1620972527.936</span></span>
<span class="line"><span>2830037 @1620972542.937</span></span>
<span class="line"><span>node_network_receive_bytes_total{device=&quot;veth9d20a7a1&quot;, instance=&quot;masterjoy.top:8100&quot;, job=&quot;masterjoy-node&quot;}</span></span>
<span class="line"><span>1100096 @1620972497.944</span></span>
<span class="line"><span>1100096 @1620972512.939</span></span>
<span class="line"><span>1100096 @1620972527.936</span></span>
<span class="line"><span>1100096 @1620972542.937</span></span>
<span class="line"><span>node_network_receive_bytes_total{device=&quot;veth9f446455&quot;, instance=&quot;masterjoy.top:8100&quot;, job=&quot;masterjoy-node&quot;}</span></span>
<span class="line"><span>1112837 @1620972497.944</span></span>
<span class="line"><span>1112837 @1620972512.939</span></span>
<span class="line"><span>1112837 @1620972527.936</span></span>
<span class="line"><span>1112837 @1620972542.937</span></span>
<span class="line"><span>node_network_receive_bytes_total{device=&quot;vethafab3e15&quot;, instance=&quot;masterjoy.top:8100&quot;, job=&quot;masterjoy-node&quot;}</span></span>
<span class="line"><span>18381388 @1620972497.944</span></span>
<span class="line"><span>18454634 @1620972512.939</span></span>
<span class="line"><span>20061635 @1620972527.936</span></span>
<span class="line"><span>20134964 @1620972542.937</span></span>
<span class="line"><span>node_network_receive_bytes_total{device=&quot;vethb72df001&quot;, instance=&quot;masterjoy.top:8100&quot;, job=&quot;masterjoy-node&quot;}</span></span>
<span class="line"><span>14438 @1620972497.944</span></span>
<span class="line"><span>14438 @1620972512.939</span></span>
<span class="line"><span>14438 @1620972527.936</span></span>
<span class="line"><span>14438 @1620972542.937</span></span>
<span class="line"><span>node_network_receive_bytes_total{device=&quot;vethc60c7c54&quot;, instance=&quot;masterjoy.top:8100&quot;, job=&quot;masterjoy-node&quot;}</span></span>
<span class="line"><span>26662233 @1620972497.944</span></span>
<span class="line"><span>26665841 @1620972512.939</span></span>
<span class="line"><span>26672991 @1620972527.936</span></span>
<span class="line"><span>26676599 @1620972542.937</span></span>
<span class="line"><span>node_network_receive_bytes_total{device=&quot;vethc96a315c&quot;, instance=&quot;masterjoy.top:8100&quot;, job=&quot;masterjoy-node&quot;}</span></span>
<span class="line"><span>678383 @1620972497.944</span></span>
<span class="line"><span>678383 @1620972512.939</span></span>
<span class="line"><span>678383 @1620972527.936</span></span>
<span class="line"><span>678383 @1620972542.937</span></span>
<span class="line"><span>node_network_receive_bytes_total{device=&quot;vethcd1957a7&quot;, instance=&quot;masterjoy.top:8100&quot;, job=&quot;masterjoy-node&quot;}</span></span>
<span class="line"><span>179031873 @1620972497.944</span></span>
<span class="line"><span>179064806 @1620972512.939</span></span>
<span class="line"><span>179130606 @1620972527.936</span></span>
<span class="line"><span>179155415 @1620972542.937</span></span>
<span class="line"><span>node_network_receive_bytes_total{device=&quot;vethd9bd9461&quot;, instance=&quot;masterjoy.top:8100&quot;, job=&quot;masterjoy-node&quot;}</span></span>
<span class="line"><span>56710 @1620972497.944</span></span>
<span class="line"><span>56710 @1620972512.939</span></span>
<span class="line"><span>56710 @1620972527.936</span></span>
<span class="line"><span>56710 @1620972542.937</span></span>
<span class="line"><span>node_network_receive_bytes_total{device=&quot;vethe6dbdc72&quot;, instance=&quot;masterjoy.top:8100&quot;, job=&quot;masterjoy-node&quot;}</span></span>
<span class="line"><span>38074102 @1620972497.944</span></span>
<span class="line"><span>38079132 @1620972512.939</span></span>
<span class="line"><span>38089216 @1620972527.936</span></span>
<span class="line"><span>38094204 @1620972542.937</span></span></code></pre></div><p>挑一个解析</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>device=&quot;vethe6dbdc72&quot;</span></span>
<span class="line"><span>38074102 @1620972497.944</span></span>
<span class="line"><span>38079132 @1620972512.939</span></span>
<span class="line"><span>38089216 @1620972527.936</span></span>
<span class="line"><span>38094204 @1620972542.937</span></span></code></pre></div><p>这是一分钟片段抓取的4条结果，为什么是4条，因为我们在 <code>promethues.yaml</code> 设置了抓取时间 <code>scrape_interval: 15s</code> 15秒抓取一次，一分钟就抓取4次</p><p>那rate() 呢？看下结果</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>rate(node_network_receive_bytes_total[1m])</span></span></code></pre></div><p>获取结果</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>{device=&quot;br-19b2f4f5e7f6&quot;, instance=&quot;masterjoy.top:8100&quot;, job=&quot;masterjoy-node&quot;}</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span>{device=&quot;br-5d9832a8ae2c&quot;, instance=&quot;masterjoy.top:8100&quot;, job=&quot;masterjoy-node&quot;}</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span>{device=&quot;br-d9f9027f6de8&quot;, instance=&quot;masterjoy.top:8100&quot;, job=&quot;masterjoy-node&quot;}</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span>{device=&quot;cni0&quot;, instance=&quot;masterjoy.top:8100&quot;, job=&quot;masterjoy-node&quot;}</span></span>
<span class="line"><span>5927.072682818403</span></span>
<span class="line"><span>{device=&quot;docker0&quot;, instance=&quot;masterjoy.top:8100&quot;, job=&quot;masterjoy-node&quot;}</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span>{device=&quot;eth0&quot;, instance=&quot;masterjoy.top:8100&quot;, job=&quot;masterjoy-node&quot;}</span></span>
<span class="line"><span>1685.0188930873526</span></span>
<span class="line"><span>{device=&quot;flannel.1&quot;, instance=&quot;masterjoy.top:8100&quot;, job=&quot;masterjoy-node&quot;}</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span>{device=&quot;lo&quot;, instance=&quot;masterjoy.top:8100&quot;, job=&quot;masterjoy-node&quot;}</span></span>
<span class="line"><span>38930.76239164258</span></span>
<span class="line"><span>{device=&quot;veth03184be1&quot;, instance=&quot;masterjoy.top:8100&quot;, job=&quot;masterjoy-node&quot;}</span></span>
<span class="line"><span>1035.296732607246</span></span>
<span class="line"><span>{device=&quot;veth0ac84dd4&quot;, instance=&quot;masterjoy.top:8100&quot;, job=&quot;masterjoy-node&quot;}</span></span>
<span class="line"><span>261.6359190931318</span></span>
<span class="line"><span>{device=&quot;veth28d1d2e6&quot;, instance=&quot;masterjoy.top:8100&quot;, job=&quot;masterjoy-node&quot;}</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span>{device=&quot;veth32e8ab5b&quot;, instance=&quot;masterjoy.top:8100&quot;, job=&quot;masterjoy-node&quot;}</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span>{device=&quot;veth37e95e60&quot;, instance=&quot;masterjoy.top:8100&quot;, job=&quot;masterjoy-node&quot;}</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span>{device=&quot;veth5cb0f9fe&quot;, instance=&quot;masterjoy.top:8100&quot;, job=&quot;masterjoy-node&quot;}</span></span>
<span class="line"><span>216.8259613247388</span></span>
<span class="line"><span>{device=&quot;veth7817dfd8&quot;, instance=&quot;masterjoy.top:8100&quot;, job=&quot;masterjoy-node&quot;}</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span>{device=&quot;veth9d20a7a1&quot;, instance=&quot;masterjoy.top:8100&quot;, job=&quot;masterjoy-node&quot;}</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span>{device=&quot;veth9f446455&quot;, instance=&quot;masterjoy.top:8100&quot;, job=&quot;masterjoy-node&quot;}</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span>{device=&quot;vethafab3e15&quot;, instance=&quot;masterjoy.top:8100&quot;, job=&quot;masterjoy-node&quot;}</span></span>
<span class="line"><span>706.645921315848</span></span>
<span class="line"><span>{device=&quot;vethb72df001&quot;, instance=&quot;masterjoy.top:8100&quot;, job=&quot;masterjoy-node&quot;}</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span>{device=&quot;vethc60c7c54&quot;, instance=&quot;masterjoy.top:8100&quot;, job=&quot;masterjoy-node&quot;}</span></span>
<span class="line"><span>400.97799511002444</span></span>
<span class="line"><span>{device=&quot;vethc96a315c&quot;, instance=&quot;masterjoy.top:8100&quot;, job=&quot;masterjoy-node&quot;}</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span>{device=&quot;vethcd1957a7&quot;, instance=&quot;masterjoy.top:8100&quot;, job=&quot;masterjoy-node&quot;}</span></span>
<span class="line"><span>3475.0611246943763</span></span>
<span class="line"><span>{device=&quot;vethd9bd9461&quot;, instance=&quot;masterjoy.top:8100&quot;, job=&quot;masterjoy-node&quot;}</span></span>
<span class="line"><span>0</span></span>
<span class="line"><span>{device=&quot;vethe6dbdc72&quot;, instance=&quot;masterjoy.top:8100&quot;, job=&quot;masterjoy-node&quot;}</span></span>
<span class="line"><span>560.0800177817292</span></span></code></pre></div><p>挑最后一个</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>device=&quot;vethe6dbdc72&quot;</span></span>
<span class="line"><span>560.0800177817292</span></span></code></pre></div><p>指的是 1分钟内平均每秒发送了多少数据，也就是说，当前一分钟该网卡总计发送了多少数据，减去前一分钟该网卡总计发送了多少数据，结果再除以60秒，就是当前的结果</p>`,24)]))}const _=n(p,[["render",o]]);export{r as __pageData,_ as default};
