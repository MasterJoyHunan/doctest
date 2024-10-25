import{_ as a,c as i,a2 as n,o as l}from"./chunks/framework.DPuwY6B9.js";const c=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"mysql/调优.md","filePath":"mysql/调优.md","lastUpdated":1729761429000}'),p={name:"mysql/调优.md"};function e(h,s,t,k,d,r){return l(),i("div",null,s[0]||(s[0]=[n(`<h3 id="线程的优化" tabindex="-1">线程的优化 <a class="header-anchor" href="#线程的优化" aria-label="Permalink to &quot;线程的优化&quot;">​</a></h3><h4 id="master-thread-核心线程负责" tabindex="-1">master thread: 核心线程负责 <a class="header-anchor" href="#master-thread-核心线程负责" aria-label="Permalink to &quot;master thread: 核心线程负责&quot;">​</a></h4><ul><li>将缓冲池的数据异步刷新到磁盘</li><li>保证数据的一致性</li><li>脏页的刷新</li><li>合并插入缓冲</li><li>undo 页的回收</li></ul><h4 id="io-thread" tabindex="-1">IO thread <a class="header-anchor" href="#io-thread" aria-label="Permalink to &quot;IO thread&quot;">​</a></h4><p>Innodb 使用 Async IO 处理写 IO 请求, IO thread 主要工作是负责处理这些 IO 的回调</p><ul><li>read thread 默认有4个</li><li>write thread 默认有4个</li><li>insert buffer thread 默认1个</li><li>log thread 默认1个</li></ul><p>可以使用 <code>show variables like &#39;innodb_%_io_threads&#39;</code> 查看</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>+-------------------------+-------+</span></span>
<span class="line"><span>| Variable_name           | Value |</span></span>
<span class="line"><span>+-------------------------+-------+</span></span>
<span class="line"><span>| innodb_read_io_threads  | 4     |</span></span>
<span class="line"><span>| innodb_write_io_threads | 4     |</span></span>
<span class="line"><span>+-------------------------+-------+</span></span></code></pre></div><p>通过命令 <code>show engine innodb status</code> 查看当前</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>$ show engine innodb status;</span></span>
<span class="line"><span>--------</span></span>
<span class="line"><span>FILE I/O</span></span>
<span class="line"><span>--------</span></span>
<span class="line"><span>I/O thread 0 state: waiting for completed aio requests (insert buffer thread)</span></span>
<span class="line"><span>I/O thread 1 state: waiting for completed aio requests (log thread)</span></span>
<span class="line"><span>I/O thread 2 state: waiting for completed aio requests (read thread)</span></span>
<span class="line"><span>I/O thread 3 state: waiting for completed aio requests (read thread)</span></span>
<span class="line"><span>I/O thread 4 state: waiting for completed aio requests (read thread)</span></span>
<span class="line"><span>I/O thread 5 state: waiting for completed aio requests (read thread)</span></span>
<span class="line"><span>I/O thread 6 state: waiting for completed aio requests (write thread)</span></span>
<span class="line"><span>I/O thread 7 state: waiting for completed aio requests (write thread)</span></span>
<span class="line"><span>I/O thread 8 state: waiting for completed aio requests (write thread)</span></span>
<span class="line"><span>I/O thread 9 state: waiting for completed aio requests (write thread)</span></span>
<span class="line"><span>Pending normal aio reads: [0, 0, 0, 0] , aio writes: [0, 0, 0, 0] ,</span></span>
<span class="line"><span> ibuf aio reads:, log i/o&#39;s:, sync i/o&#39;s:</span></span>
<span class="line"><span>Pending flushes (fsync) log: 0; buffer pool: 0</span></span>
<span class="line"><span>274 OS file reads, 3456 OS file writes, 1434 OS fsyncs</span></span>
<span class="line"><span>0.00 reads/s, 0 avg bytes/read, 0.00 writes/s, 0.00 fsyncs/s</span></span></code></pre></div><h4 id="purge-thread" tabindex="-1">purge thread <a class="header-anchor" href="#purge-thread" aria-label="Permalink to &quot;purge thread&quot;">​</a></h4><p>用于回收已经使用并分配的 undo 也,可以 <code>mysqld</code> 下设置多个 purge thread, 这样可以加快 undo 页的回收</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[mysqld]</span></span>
<span class="line"><span>innodb_purge_threads=4</span></span></code></pre></div><p>查看当前系统有几个 purge thread 线程使用 <code>show variables like &#39;innodb%threads&#39;</code></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>+-------------------------+-------+</span></span>
<span class="line"><span>| Variable_name           | Value |</span></span>
<span class="line"><span>+-------------------------+-------+</span></span>
<span class="line"><span>| innodb_purge_threads    | 4     |</span></span>
<span class="line"><span>| innodb_read_io_threads  | 4     |</span></span>
<span class="line"><span>| innodb_write_io_threads | 4     |</span></span>
<span class="line"><span>+-------------------------+-------+</span></span></code></pre></div><h4 id="page-cleaner-thread" tabindex="-1">page cleaner thread <a class="header-anchor" href="#page-cleaner-thread" aria-label="Permalink to &quot;page cleaner thread&quot;">​</a></h4><p>用于脏页刷新</p><h3 id="内存优化" tabindex="-1">内存优化 <a class="header-anchor" href="#内存优化" aria-label="Permalink to &quot;内存优化&quot;">​</a></h3><h4 id="缓冲池" tabindex="-1">缓冲池 <a class="header-anchor" href="#缓冲池" aria-label="Permalink to &quot;缓冲池&quot;">​</a></h4><p>数据库是基于硬盘操作,读写速度是很慢的,使用缓冲池能有效的加快对数据的读写操作</p><p>缓冲池中缓存的数据页类型有</p><ul><li>索引页</li><li>数据页</li><li>插入缓冲</li><li>自适应哈希索引</li><li>锁信息</li><li>数据字典信息</li></ul><p>默认一个数据库只有一个缓冲池,可以通过 <code>innodb_buffer_pool_instances</code> 设置多个缓冲池</p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">$</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> show</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> engine</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> innodb</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> status</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">----------------------</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">BUFFER</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> POOL</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> AND</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> MEMORY</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">----------------------</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Total</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> large</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> memory</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> allocated</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 137428992</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Dictionary</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> memory</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> allocated</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 262517</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Buffer</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> pool</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> size</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">   8191</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> # pool 缓存有多少个页 1页=16kb</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Free</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> buffers</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">       7186</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> # free 列表中的数量</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Database</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> pages</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">     996</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  # lru 列表中的数据</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Old</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> database</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> pages</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 347</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Modified</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> db</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> pages</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  0</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    # 显示脏页数量</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Pending</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> reads</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      0</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Pending</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> writes:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> LRU</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 0,</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> flush</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> list</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 0,</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> single</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> page</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 0</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Pages</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> made</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> young</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 0,</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> not</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> young</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 0</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">0.00</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> youngs/s,</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 0.00</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> non-youngs/s</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Pages</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> read</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 241,</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> created</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 755,</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> written</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 2193</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">0.00</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> reads/s,</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 0.00</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> creates/s,</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 0.00</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> writes/s</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">No</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> buffer</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> pool</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> page</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> gets</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> since</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> the</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> last</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> printout</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Pages</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> read</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ahead</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 0.00/s,</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> evicted</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> without</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> access</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 0.00/s,</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> Random</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> read</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ahead</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 0.00/s</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">LRU</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> len:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 996,</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> unzip_LRU</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> len:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 0</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> # unzip_lru 对普通 lru 进行压缩</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">I/O</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> sum[0]:cur[0],</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> unzip</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> sum[0]:cur[0]</span></span></code></pre></div><p>还可以通过架构表查看缓冲池信息</p><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">SELECT</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> *</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> FROM</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> \`INNODB_BUFFER_POOL_STATS\`</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">POOL_ID</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">POOL_SIZE</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">FREE_BUFFERS</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">DATABASE_PAGES</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">OLD_DATABASE_PAGES</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">MODIFIED_DATABASE_PAGES</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">PENDING_DECOMPRESS</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">PENDING_READS</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">PENDING_FLUSH_LRU</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">PENDING_FLUSH_LIST</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">PAGES_MADE_YOUNG </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">-- make yong page </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">PAGES_NOT_MADE_YOUNG</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">PAGES_MADE_YOUNG_RATE</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">PAGES_MADE_NOT_YOUNG_RATE</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">NUMBER_PAGES_READ</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">NUMBER_PAGES_CREATED</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">NUMBER_PAGES_WRITTEN</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">PAGES_READ_RATE</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">PAGES_CREATE_RATE</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">PAGES_WRITTEN_RATE</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">NUMBER_PAGES_GET</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">HIT_RATE </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">-- 缓存命中率 越高越好</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">YOUNG_MAKE_PER_THOUSAND_GETS</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">NOT_YOUNG_MAKE_PER_THOUSAND_GETS</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">NUMBER_PAGES_READ_AHEAD</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">NUMBER_READ_AHEAD_EVICTED</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">READ_AHEAD_RATE</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">READ_AHEAD_EVICTED_RATE</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">LRU_IO_TOTAL</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">LRU_IO_CURRENT</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">UNCOMPRESS_TOTAL</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">UNCOMPRESS_CURRENT</span></span></code></pre></div><h6 id="缓冲池对读的优化" tabindex="-1">缓冲池对读的优化 <a class="header-anchor" href="#缓冲池对读的优化" aria-label="Permalink to &quot;缓冲池对读的优化&quot;">​</a></h6><p>数据库进行<strong>读取页</strong>的操作,首先判断该页是否在缓冲池中,如果不在,会将磁盘中的页读取到缓冲池中,该过程称为 <code>FIX</code> 第二次读取相同的页,发现该页如果在缓冲池中,则称为缓冲命中</p><h6 id="缓冲池对写的优化" tabindex="-1">缓冲池对写的优化 <a class="header-anchor" href="#缓冲池对写的优化" aria-label="Permalink to &quot;缓冲池对写的优化&quot;">​</a></h6><p>修改数据首先修改在缓冲池的页,然后再以一定频率刷新到磁盘上,这种机制称为 <code>checkpoint</code></p><p>综上所述,缓冲池的大小直接影响数据库的整体性能</p><p>查看缓冲池大小的命令 <code>show variables like &#39;innodb_buffer_pool_size&#39;</code></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>+-------------------------+-----------+</span></span>
<span class="line"><span>| Variable_name           | Value     |</span></span>
<span class="line"><span>+-------------------------+-----------+</span></span>
<span class="line"><span>| innodb_buffer_pool_size | 134217728 | 134217728 / 1024 / 1024 / 1024 = 125MB</span></span>
<span class="line"><span>+-------------------------+-----------+</span></span></code></pre></div><h6 id="缓冲池过期算法-lru" tabindex="-1">缓冲池过期算法 LRU <a class="header-anchor" href="#缓冲池过期算法-lru" aria-label="Permalink to &quot;缓冲池过期算法 LRU&quot;">​</a></h6><p>不同于一般的 LRU 算法 新读取的页<code>默认</code>放在LRU列表的 63% 的地方,上面63%称为 new 列表(活跃数据), 下面的 27% 称为 old 列表(将被淘汰的数据) 这样做的好处是如果某些sql 进行了大量数据的查找或全表扫描的话,不至于把热点数据全部淘汰</p><ul><li>设置 <code>innodb_old_blocks_time</code>,设置新读取页在多少毫秒之后才能加入到 new 列表,从而尽可能保证热点数据不被刷出</li><li>设置 <code>innodb_old_blocks_pct</code>, 设置新读取页插入到什么位置(1%-99%),设置的越小可保留的热点数据越多</li></ul><p>通过架构表 <code>innodb_buffer_page_lru</code> 查询 <code>lru</code> 详情</p><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">select</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> *</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> from</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> innodb_buffer_page_lru</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">POOL_ID</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">LRU_POSITION</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">SPACE</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">PAGE_NUMBER </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">-- </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">PAGE_TYPE</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">FLUSH_TYPE</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">FIX_COUNT</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">IS_HASHED</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">NEWEST_MODIFICATION</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">OLDEST_MODIFICATION </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">-- 大于 0 的就是脏页</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">ACCESS_TIME</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">TABLE_NAME </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">-- 表名</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">INDEX_NAME</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">NUMBER_RECORDS</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">DATA_SIZE</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">COMPRESSED_SIZE</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">COMPRESSED</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">IO_FIX</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">IS_OLD</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">FREE_PAGE_CLOCK</span></span></code></pre></div><h4 id="重做日志缓冲-redo-log-buffer" tabindex="-1">重做日志缓冲 redo log buffer <a class="header-anchor" href="#重做日志缓冲-redo-log-buffer" aria-label="Permalink to &quot;重做日志缓冲 redo log buffer&quot;">​</a></h4><p>innodb 首先会将重做日志放入缓冲区,然后以一定的频率刷新到重做日志文件</p><ul><li>master thread 每秒将重做日志缓冲刷新到重做日志文件</li><li>每个事务提交会将重做日志刷新到重做日志文件</li><li>重做日志缓冲区小于 1/2 时,将重做日志缓冲刷新到重做日志文件</li></ul><p>重做日志由 <code>innodb_log_buffer_size</code> 参数控制,一般为 16M 大小,绝大多数情况下是够用了的</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>show variables like &#39;innodb_log_buffer_size&#39;;</span></span>
<span class="line"><span>+------------------------+----------+</span></span>
<span class="line"><span>| Variable_name          | Value    |</span></span>
<span class="line"><span>+------------------------+----------+</span></span>
<span class="line"><span>| innodb_log_buffer_size | 16777216 | 16777216 / 1024 / 1024 = 16MB</span></span>
<span class="line"><span>+------------------------+----------+</span></span></code></pre></div><h4 id="额外的内存池" tabindex="-1">额外的内存池 <a class="header-anchor" href="#额外的内存池" aria-label="Permalink to &quot;额外的内存池&quot;">​</a></h4><p>对数据结构本身的内存分配,需要从额外的内存池进行,如果额外的内存池不够时,会从缓冲池中进行申请 该配置项为 <code>innodb_additional_mem_pool_size</code></p><h3 id="checkpoint-检查点技术" tabindex="-1">checkpoint 检查点技术 <a class="header-anchor" href="#checkpoint-检查点技术" aria-label="Permalink to &quot;checkpoint 检查点技术&quot;">​</a></h3><p><strong>checkpoint 所做的事就是将缓冲池中的脏页刷新到磁盘上</strong></p><p>如果每次cud操作都将新版本刷新到磁盘,那么这个开销太大了,数据库的性能就会变的很差,如果将缓冲池的页刷新到磁盘的过程中发送的宕机,那么数据就不能恢复</p><p>为了避免数据丢失的问题,大部分数据库都采用了 write ahead log 策略, 当事务提交时,先写重做日志,再修改页. 如果发送宕机而导致数据丢失,可以通过重做日志来完成数据的恢复</p><p>检查点的技术解决以下几个问题</p><ul><li>缩短数据库的恢复时间 <ul><li>当数据库发生宕机时,数据库不需要重做所有的日志,只需要对 checkpoint 之后的重做日志进行恢复,这样就可能大大的缩短恢复时间</li><li>因为 checkpoint 之前的数据已经刷新到了磁盘</li></ul></li><li>缓冲池不够用时,将脏页刷新到磁盘 <ul><li>缓冲池不够用时,会使用 lru 算法淘汰最少使用的页,如果发现该页为脏页,则立即执行 checkpoint ,将脏页刷新到磁盘</li></ul></li><li>重做日志缓冲不够用时,刷新张脏页 <ul><li>重做日志缓冲需要复用,所以会进行回收,当回收时会强行触发 checkpoint</li></ul></li></ul><h4 id="查看-checkpoint" tabindex="-1">查看 checkpoint <a class="header-anchor" href="#查看-checkpoint" aria-label="Permalink to &quot;查看 checkpoint&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>$ show engine innodb status;</span></span>
<span class="line"><span>---</span></span>
<span class="line"><span>LOG</span></span>
<span class="line"><span>---</span></span>
<span class="line"><span>Log sequence number 10501749</span></span>
<span class="line"><span>Log flushed up to   10501749</span></span>
<span class="line"><span>Pages flushed up to 10501749</span></span>
<span class="line"><span>Last checkpoint at  10501740</span></span>
<span class="line"><span>0 pending log flushes, 0 pending chkp writes</span></span>
<span class="line"><span>967 log i/o&#39;s done, 0.00 log i/o&#39;s/second</span></span></code></pre></div>`,53)]))}const o=a(p,[["render",e]]);export{c as __pageData,o as default};
