import{_ as s,c as e,a2 as n,o as t}from"./chunks/framework.DPuwY6B9.js";const u=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"服务器命令/windows常用命令.md","filePath":"服务器命令/windows常用命令.md","lastUpdated":1729761429000}'),i={name:"服务器命令/windows常用命令.md"};function o(d,a,p,l,c,r){return t(),e("div",null,a[0]||(a[0]=[n(`<h3 id="清空-windows-dns-缓存" tabindex="-1">清空 windows dns 缓存 <a class="header-anchor" href="#清空-windows-dns-缓存" aria-label="Permalink to &quot;清空 windows dns 缓存&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>ipconfig /flushdns</span></span></code></pre></div><h3 id="windows命令行关闭本地占用的端口" tabindex="-1">WINDOWS命令行关闭本地占用的端口 <a class="header-anchor" href="#windows命令行关闭本地占用的端口" aria-label="Permalink to &quot;WINDOWS命令行关闭本地占用的端口&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>netstat  -aon|findstr  &quot;8080&quot;  </span></span>
<span class="line"><span>taskkill /pid xxx /f</span></span></code></pre></div>`,4)]))}const w=s(i,[["render",o]]);export{u as __pageData,w as default};
