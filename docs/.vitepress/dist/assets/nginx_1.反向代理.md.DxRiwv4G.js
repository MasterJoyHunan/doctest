import{_ as n,c as a,a2 as p,o as e}from"./chunks/framework.DPuwY6B9.js";const f=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"nginx/1.反向代理.md","filePath":"nginx/1.反向代理.md","lastUpdated":1729815932000}'),l={name:"nginx/1.反向代理.md"};function t(i,s,c,o,r,d){return e(),a("div",null,s[0]||(s[0]=[p(`<div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>upstream xcw{</span></span>
<span class="line"><span>        server 127.0.0.1:8080;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>server {</span></span>
<span class="line"><span>        listen 80;</span></span>
<span class="line"><span>        listen       443 ssl;</span></span>
<span class="line"><span>        server_name  foo.bar.zoo;</span></span>
<span class="line"><span>        ssl_certificate     /usr/local/nginx/conf/foo.pem;</span></span>
<span class="line"><span>        ssl_certificate_key  /usr/local/nginx/conf/foo.key;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        location / {</span></span>
<span class="line"><span>            proxy_set_header X-Forwarded-For $remote_addr;</span></span>
<span class="line"><span>            proxy_set_header Host            $http_host;</span></span>
<span class="line"><span>            proxy_pass http://xcw;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>}</span></span></code></pre></div>`,1)]))}const m=n(l,[["render",t]]);export{f as __pageData,m as default};
