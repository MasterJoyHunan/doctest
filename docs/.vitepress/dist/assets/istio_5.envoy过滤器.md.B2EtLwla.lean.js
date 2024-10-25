import{_ as i,c as a,a2 as n,o as l}from"./chunks/framework.DPuwY6B9.js";const y=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"istio/5.envoy过滤器.md","filePath":"istio/5.envoy过滤器.md","lastUpdated":1729761429000}'),h={name:"istio/5.envoy过滤器.md"};function t(p,s,k,e,E,r){return l(),a("div",null,s[0]||(s[0]=[n(`<h3 id="没有深入研究" tabindex="-1">没有深入研究 <a class="header-anchor" href="#没有深入研究" aria-label="Permalink to &quot;没有深入研究&quot;">​</a></h3><p>配置项手册：<a href="https://istio.io/latest/docs/reference/config/networking/destination-rule/" target="_blank" rel="noreferrer">https://istio.io/latest/docs/reference/config/networking/destination-rule/</a></p><h3 id="envoyfilter" tabindex="-1">EnvoyFilter <a class="header-anchor" href="#envoyfilter" aria-label="Permalink to &quot;EnvoyFilter&quot;">​</a></h3><p>EnvoyFilter提供了一种自定义 Istio Pilot 生成的 Envoy 配置的机制。使用 EnvoyFilter 修改某些字段的值、添加特定过滤器，甚至添加全新的侦听器、集群等。必须谨慎使用此功能，因为不正确的配置可能会破坏整个网格的稳定性。与其他 Istio 网络对象不同，EnvoyFilter 是附加应用的。对于特定命名空间中的给定工作负载，可以存在任意数量的 EnvoyFilter。这些 EnvoyFilter 的应用顺序如下：配置根命名空间中的所有 EnvoyFilter ，然后是工作负载命名空间中的所有匹配的 EnvoyFilter。</p><p>EnvoyFilter 示例：</p><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">apiVersion</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">networking.istio.io/v1alpha3</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">kind</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">EnvoyFilter</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">metadata</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  name</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">filter-local-ratelimit-svc</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  #namespace: istio-system</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">spec</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  workloadSelector</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    labels</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">      app</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">nginx</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  configPatches</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    - </span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">applyTo</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">HTTP_FILTER</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">      match</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">        context</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">SIDECAR_INBOUND</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">        listener</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">          filterChain</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">            filter</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">              name</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;envoy.filters.network.http_connection_manager&quot;</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">      patch</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">        operation</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">INSERT_BEFORE</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">        value</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">          name</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">envoy.filters.http.local_ratelimit</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">          typed_config</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">            &quot;@type&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">type.googleapis.com/udpa.type.v1.TypedStruct</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">            type_url</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">type.googleapis.com/envoy.extensions.filters.http.local_ratelimit.v3.LocalRateLimit</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">            value</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">              stat_prefix</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">http_local_rate_limiter</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    - </span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">applyTo</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">HTTP_ROUTE</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">      match</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">        context</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">SIDECAR_INBOUND</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">        routeConfiguration</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">          vhost</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">            name</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;inbound|http|80&quot;</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">            route</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">              action</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">ANY</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">      patch</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">        operation</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">MERGE</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">        value</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">          typed_per_filter_config</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">            envoy.filters.http.local_ratelimit</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">              &quot;@type&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">type.googleapis.com/udpa.type.v1.TypedStruct</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">              type_url</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">type.googleapis.com/envoy.extensions.filters.http.local_ratelimit.v3.LocalRateLimit</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">              value</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">                stat_prefix</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">http_local_rate_limiter</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">                token_bucket</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">                  max_tokens</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">                  tokens_per_fill</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">                  fill_interval</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">60s</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">                filter_enabled</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">                  runtime_key</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">local_rate_limit_enabled</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">                  default_value</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">                    numerator</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">100</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">                    denominator</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">HUNDRED</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">                filter_enforced</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">                  runtime_key</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">local_rate_limit_enforced</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">                  default_value</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">                    numerator</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">100</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">                    denominator</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">HUNDRED</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">                response_headers_to_add</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">                  - </span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">append</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">false</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">                    header</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">                      key</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">x-local-rate-limit</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">                      value</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;true&#39;</span></span></code></pre></div><h3 id="workloadselector-工作空间选择器" tabindex="-1">workloadSelector 工作空间选择器 <a class="header-anchor" href="#workloadselector-工作空间选择器" aria-label="Permalink to &quot;workloadSelector 工作空间选择器&quot;">​</a></h3><p>用于选择应应用此补丁配置的特定 Pod/VM 集的标准。如果省略，此配置中的补丁集将应用于同一命名空间中的所有工作负载实例。如果<code>EnvoyFilter</code>存在于配置根命名空间中，它将应用于任何命名空间中的所有适用工作负载。</p><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">workloadSelector</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  labels</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 标签搜索的范围仅限于资源所在的配置命名空间。</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    app</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">nginx</span></span></code></pre></div><h3 id="configpatches" tabindex="-1">configPatches <a class="header-anchor" href="#configpatches" aria-label="Permalink to &quot;configPatches&quot;">​</a></h3><p>具有匹配条件的一个或多个补丁</p><h4 id="applyto" tabindex="-1">applyTo <a class="header-anchor" href="#applyto" aria-label="Permalink to &quot;applyTo&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">configPatches</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">- </span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">applyTo</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">HTTP_FILTER</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> # 指定应在 Envoy 配置中的何处应用给定补丁。</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  match</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 匹配侦听器/路由配置/集群。</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  	context</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">ANY</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> # 要匹配的特定配置生成上下文</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  	listener</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    routeConfiguration</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    cluster</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span></code></pre></div><h4 id="match" tabindex="-1">match <a class="header-anchor" href="#match" aria-label="Permalink to &quot;match&quot;">​</a></h4><h4 id="patch" tabindex="-1">patch <a class="header-anchor" href="#patch" aria-label="Permalink to &quot;patch&quot;">​</a></h4><h3 id="priority" tabindex="-1">priority <a class="header-anchor" href="#priority" aria-label="Permalink to &quot;priority&quot;">​</a></h3><p>优先级定义了补丁集在上下文中应用的顺序。当一个补丁依赖于另一个补丁时，补丁应用的顺序很重要。API 提供了两种主要的补丁订购方式。根命名空间中的补丁集先于工作负载命名空间中的补丁集应用。补丁集中的补丁按照它们在<code>configPatches</code>列表中出现的顺序进行处理。</p><p>优先级的默认值为 0，范围为 [ min-int32, max-int32 ]。优先级为负的补丁集会在默认优先级之前处理。优先级为正的补丁集将在默认值之后进行处理。</p><p>建议从 10 的倍数的优先级值开始，以便为进一步插入留出空间。</p><p>补丁集按以下升序键顺序排序：优先级、创建时间、完全限定资源名称。</p><p>限流是一种预防措施，在发生灾难发生前就对并发访问进行限制</p><h3 id="全局速率限制" tabindex="-1">全局速率限制 <a class="header-anchor" href="#全局速率限制" aria-label="Permalink to &quot;全局速率限制&quot;">​</a></h3><h3 id="本地速率限制" tabindex="-1">本地速率限制 <a class="header-anchor" href="#本地速率限制" aria-label="Permalink to &quot;本地速率限制&quot;">​</a></h3><p>支持 L4 连接的本地（非分布式）速率限制 。区别在于本地速率限制侦听器过滤器 &lt;config_listener_filters_local_rate_limit&gt;在 TLS 握手和过滤器链匹配之前处理套接字。</p><p>Envoy 另外还支持通过 HTTP 本地速率限制 <a href="https://www.envoyproxy.io/docs/envoy/latest/configuration/http/http_filters/local_rate_limit_filter#config-http-filters-local-rate-limit" target="_blank" rel="noreferrer">过滤器对 HTTP 请求进行本地速率限制</a>。这可以在侦听器级别或更具体的级别（例如：虚拟主机或路由级别）全局激活。</p><p>最后，Envoy 还支持<a href="https://www.envoyproxy.io/docs/envoy/latest/intro/arch_overview/other_features/global_rate_limiting#arch-overview-global-rate-limit" target="_blank" rel="noreferrer">全局速率限制</a>。本地速率限制可以与全局速率限制结合使用，以减少全局速率限制服务的负载。</p><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">apiVersion</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">networking.istio.io/v1alpha3</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">kind</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">EnvoyFilter</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">metadata</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  name</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">filter-local-ratelimit-svc</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  namespace</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">istio-system</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">spec</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  workloadSelector</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    labels</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">      app</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">productpage</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  configPatches</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    - </span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">applyTo</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">HTTP_FILTER</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">      match</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">        context</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">SIDECAR_INBOUND</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">        listener</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">          filterChain</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">            filter</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">              name</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;envoy.filters.network.http_connection_manager&quot;</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">      patch</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">        operation</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">INSERT_BEFORE</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">        value</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">          name</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">envoy.filters.http.local_ratelimit</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">          typed_config</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">            &quot;@type&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">type.googleapis.com/udpa.type.v1.TypedStruct</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">            type_url</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">type.googleapis.com/envoy.extensions.filters.http.local_ratelimit.v3.LocalRateLimit</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">            value</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">              stat_prefix</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">http_local_rate_limiter</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">              token_bucket</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">                max_tokens</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">10</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">                tokens_per_fill</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">10</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">                fill_interval</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">60s</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">              filter_enabled</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">                runtime_key</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">local_rate_limit_enabled</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">                default_value</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">                  numerator</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">100</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">                  denominator</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">HUNDRED</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">              filter_enforced</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">                runtime_key</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">local_rate_limit_enforced</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">                default_value</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">                  numerator</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">100</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">                  denominator</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">HUNDRED</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">              response_headers_to_add</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">                - </span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">append</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">false</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">                  header</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">                    key</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">x-local-rate-limit</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">                    value</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;true&#39;</span></span></code></pre></div>`,27)]))}const g=i(h,[["render",t]]);export{y as __pageData,g as default};
