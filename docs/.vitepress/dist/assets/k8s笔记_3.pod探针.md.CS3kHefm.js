import{_ as i,c as a,a2 as n,o as p}from"./chunks/framework.DPuwY6B9.js";const g=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"k8s笔记/3.pod探针.md","filePath":"k8s笔记/3.pod探针.md","lastUpdated":1729761429000}'),h={name:"k8s笔记/3.pod探针.md"};function l(t,s,k,e,E,r){return p(),a("div",null,s[0]||(s[0]=[n(`<h3 id="存活探针" tabindex="-1">存活探针 <a class="header-anchor" href="#存活探针" aria-label="Permalink to &quot;存活探针&quot;">​</a></h3><p>k8s 可以通过存活探针检查容器是否还在运行。 可以为 pod 中的每个容器单独指定存活探针。 k8s 将定期执行探针，如果探测失败，重新启动容器。</p><p>k8s 有以下三种探测容器的机制</p><ul><li>httpGet -- 返回 2xx, 3xx 状态码则为成功， 否则将会重启容器</li><li>TCP -- 与容器指定端口建立 tcp 连接，如果无法连接，则重启容器</li><li>Exec -- 探针在容器内执行任意命令，并检查命令的退出状态码。如果状态码是 0 则探测成功。所有其他状态码都被认为失败。</li></ul><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">apiVersion</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">v1</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">kind</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">Pod</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">metadata</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  name</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">shttp</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> </span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">spec</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  containers</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    - </span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">image</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">w4762061/shttp:v1</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">      name</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">shttp</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">      ports</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        - </span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">containerPort</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">8222</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">          protocol</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">TCP</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">      livenessProbe</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 存活探针</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">      	httpGet</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">          path</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">/health</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">          port</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">8222</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">        initialDelaySeconds</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">15</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> # 延迟探测，否则有可能程序还在启动中，探针就过来探测，导致无法响应的问题</span></span></code></pre></div><h3 id="就绪探针" tabindex="-1">就绪探针 <a class="header-anchor" href="#就绪探针" aria-label="Permalink to &quot;就绪探针&quot;">​</a></h3><p>Service 在 pod 启动过程中，如果 pod 还无法处理请求（如 java spring 项目启动时间需要 5-30 秒），也会将请求转发至该 pod，会给客户带来糟糕的体验。如果需要杜绝这种情况，可以为你的 pod 准备一个就绪探针</p><p>和存活探针一样有3种探测容器的机制，但是不需要设置延迟探测，因为未准备好的 pod 不会被重启，而是 service 不会转发至该 pod， 直至该 pod 已经准备好</p><p>默认情况下每<strong>10</strong> 秒检查一次</p><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">apiVersion</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">v1</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">kind</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">Pod</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">metadata</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  name</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">shttp</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> </span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">spec</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  containers</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    - </span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">image</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">w4762061/shttp:v1</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">      name</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">shttp</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">      ports</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        - </span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">containerPort</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">8222</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">          protocol</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">TCP</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">      readinessProbe</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 就绪探针</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">        httpGet</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">          path</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">/probe</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">          port</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">8222</span></span></code></pre></div>`,10)]))}const y=i(h,[["render",l]]);export{g as __pageData,y as default};
