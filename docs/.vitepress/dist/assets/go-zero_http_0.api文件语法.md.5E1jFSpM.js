import{_ as a,c as n,a2 as p,o as e}from"./chunks/framework.DPuwY6B9.js";const u=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"go-zero/http/0.api文件语法.md","filePath":"go-zero/http/0.api文件语法.md","lastUpdated":1729761429000}'),i={name:"go-zero/http/0.api文件语法.md"};function l(t,s,o,c,r,d){return e(),n("div",null,s[0]||(s[0]=[p(`<h2 id="service语法块" tabindex="-1">service语法块 <a class="header-anchor" href="#service语法块" aria-label="Permalink to &quot;service语法块&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>@server(</span></span>
<span class="line"><span>  jwt: Auth</span></span>
<span class="line"><span>  group: foo</span></span>
<span class="line"><span>  middleware: AuthMiddleware</span></span>
<span class="line"><span>  prefix: api</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span>service foo-api{</span></span>
<span class="line"><span>  @doc &quot;foo&quot;</span></span>
<span class="line"><span>  @handler foo</span></span>
<span class="line"><span>  post /foo/:id (Foo) returns (Bar)</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>service foo-api{</span></span>
<span class="line"><span>  @handler ping // </span></span>
<span class="line"><span>  get /ping</span></span>
<span class="line"><span>  </span></span>
<span class="line"><span>  @doc &quot;foo&quot;</span></span>
<span class="line"><span>  @handler bar</span></span>
<span class="line"><span>  post /bar/:id (Foo)</span></span>
<span class="line"><span>}</span></span></code></pre></div>`,2)]))}const f=a(i,[["render",l]]);export{u as __pageData,f as default};
