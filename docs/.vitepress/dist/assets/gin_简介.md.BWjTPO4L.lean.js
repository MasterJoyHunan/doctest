import{_ as a,c as i,a2 as n,o as p}from"./chunks/framework.DPuwY6B9.js";const d=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"gin/简介.md","filePath":"gin/简介.md","lastUpdated":1729815932000}'),l={name:"gin/简介.md"};function h(t,s,k,e,E,g){return p(),i("div",null,s[0]||(s[0]=[n(`<h3 id="当前版本-1-6-3" tabindex="-1">当前版本 1.6.3 <a class="header-anchor" href="#当前版本-1-6-3" aria-label="Permalink to &quot;当前版本 1.6.3&quot;">​</a></h3><h3 id="gin-框架介绍" tabindex="-1"><code>Gin</code> 框架介绍 <a class="header-anchor" href="#gin-框架介绍" aria-label="Permalink to &quot;\`Gin\`  框架介绍&quot;">​</a></h3><p><code>Gin</code> 是一个 go 写的 web 框架，具有高性能的优点</p><p>官方地址：<a href="https://github.com/gin-gonic/gin" target="_blank" rel="noreferrer">https://github.com/gin-gonic/gin</a></p><h3 id="目录结构" tabindex="-1">目录结构 <a class="header-anchor" href="#目录结构" aria-label="Permalink to &quot;目录结构&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>│  .gitignore</span></span>
<span class="line"><span>│  .travis.yml</span></span>
<span class="line"><span>│  auth.go</span></span>
<span class="line"><span>│  AUTHORS.md</span></span>
<span class="line"><span>│  auth_test.go</span></span>
<span class="line"><span>│  BENCHMARKS.md</span></span>
<span class="line"><span>│  benchmarks_test.go</span></span>
<span class="line"><span>│  CHANGELOG.md</span></span>
<span class="line"><span>│  codecov.yml</span></span>
<span class="line"><span>│  CODE_OF_CONDUCT.md</span></span>
<span class="line"><span>│  context.go</span></span>
<span class="line"><span>│  context_appengine.go</span></span>
<span class="line"><span>│  context_test.go</span></span>
<span class="line"><span>│  CONTRIBUTING.md</span></span>
<span class="line"><span>│  debug.go</span></span>
<span class="line"><span>│  debug_test.go</span></span>
<span class="line"><span>│  deprecated.go</span></span>
<span class="line"><span>│  deprecated_test.go</span></span>
<span class="line"><span>│  doc.go</span></span>
<span class="line"><span>│  errors.go</span></span>
<span class="line"><span>│  errors_test.go</span></span>
<span class="line"><span>│  fs.go</span></span>
<span class="line"><span>│  gin.go</span></span>
<span class="line"><span>│  gin_integration_test.go</span></span>
<span class="line"><span>│  gin_test.go</span></span>
<span class="line"><span>│  githubapi_test.go</span></span>
<span class="line"><span>│  go.mod</span></span>
<span class="line"><span>│  go.sum</span></span>
<span class="line"><span>│  LICENSE</span></span>
<span class="line"><span>│  logger.go</span></span>
<span class="line"><span>│  logger_test.go</span></span>
<span class="line"><span>│  Makefile</span></span>
<span class="line"><span>│  middleware_test.go</span></span>
<span class="line"><span>│  mode.go</span></span>
<span class="line"><span>│  mode_test.go</span></span>
<span class="line"><span>│  path.go</span></span>
<span class="line"><span>│  path_test.go</span></span>
<span class="line"><span>│  README.md</span></span>
<span class="line"><span>│  recovery.go</span></span>
<span class="line"><span>│  recovery_test.go</span></span>
<span class="line"><span>│  response_writer.go</span></span>
<span class="line"><span>│  response_writer_test.go</span></span>
<span class="line"><span>│  routergroup.go</span></span>
<span class="line"><span>│  routergroup_test.go</span></span>
<span class="line"><span>│  routes_test.go</span></span>
<span class="line"><span>│  test_helpers.go</span></span>
<span class="line"><span>│  tree.go</span></span>
<span class="line"><span>│  tree_test.go</span></span>
<span class="line"><span>│  utils.go</span></span>
<span class="line"><span>│  utils_test.go</span></span>
<span class="line"><span>│  version.go</span></span>
<span class="line"><span>│</span></span>
<span class="line"><span>├─.github</span></span>
<span class="line"><span>│      ISSUE_TEMPLATE.md</span></span>
<span class="line"><span>│      PULL_REQUEST_TEMPLATE.md</span></span>
<span class="line"><span>│</span></span>
<span class="line"><span>├─binding</span></span>
<span class="line"><span>│      binding.go</span></span>
<span class="line"><span>│      binding_msgpack_test.go</span></span>
<span class="line"><span>│      binding_nomsgpack.go</span></span>
<span class="line"><span>│      binding_test.go</span></span>
<span class="line"><span>│      default_validator.go</span></span>
<span class="line"><span>│      form.go</span></span>
<span class="line"><span>│      form_mapping.go</span></span>
<span class="line"><span>│      form_mapping_benchmark_test.go</span></span>
<span class="line"><span>│      form_mapping_test.go</span></span>
<span class="line"><span>│      header.go</span></span>
<span class="line"><span>│      json.go</span></span>
<span class="line"><span>│      json_test.go</span></span>
<span class="line"><span>│      msgpack.go</span></span>
<span class="line"><span>│      msgpack_test.go</span></span>
<span class="line"><span>│      multipart_form_mapping.go</span></span>
<span class="line"><span>│      multipart_form_mapping_test.go</span></span>
<span class="line"><span>│      protobuf.go</span></span>
<span class="line"><span>│      query.go</span></span>
<span class="line"><span>│      uri.go</span></span>
<span class="line"><span>│      validate_test.go</span></span>
<span class="line"><span>│      xml.go</span></span>
<span class="line"><span>│      xml_test.go</span></span>
<span class="line"><span>│      yaml.go</span></span>
<span class="line"><span>│      yaml_test.go</span></span>
<span class="line"><span>│</span></span>
<span class="line"><span>├─examples</span></span>
<span class="line"><span>│      README.md</span></span>
<span class="line"><span>│</span></span>
<span class="line"><span>├─ginS</span></span>
<span class="line"><span>│      gins.go</span></span>
<span class="line"><span>│      README.md</span></span>
<span class="line"><span>│</span></span>
<span class="line"><span>├─internal</span></span>
<span class="line"><span>│  ├─bytesconv</span></span>
<span class="line"><span>│  │      bytesconv.go</span></span>
<span class="line"><span>│  │      bytesconv_test.go</span></span>
<span class="line"><span>│  │</span></span>
<span class="line"><span>│  └─json</span></span>
<span class="line"><span>│          json.go</span></span>
<span class="line"><span>│          jsoniter.go</span></span>
<span class="line"><span>│</span></span>
<span class="line"><span>├─render</span></span>
<span class="line"><span>│      data.go</span></span>
<span class="line"><span>│      html.go</span></span>
<span class="line"><span>│      json.go</span></span>
<span class="line"><span>│      msgpack.go</span></span>
<span class="line"><span>│      protobuf.go</span></span>
<span class="line"><span>│      reader.go</span></span>
<span class="line"><span>│      reader_test.go</span></span>
<span class="line"><span>│      redirect.go</span></span>
<span class="line"><span>│      render.go</span></span>
<span class="line"><span>│      render_msgpack_test.go</span></span>
<span class="line"><span>│      render_test.go</span></span>
<span class="line"><span>│      text.go</span></span>
<span class="line"><span>│      xml.go</span></span>
<span class="line"><span>│      yaml.go</span></span>
<span class="line"><span>│</span></span>
<span class="line"><span>└─testdata</span></span>
<span class="line"><span>    ├─certificate</span></span>
<span class="line"><span>    │      cert.pem</span></span>
<span class="line"><span>    │      key.pem</span></span>
<span class="line"><span>    │</span></span>
<span class="line"><span>    ├─protoexample</span></span>
<span class="line"><span>    │      test.pb.go</span></span>
<span class="line"><span>    │      test.proto</span></span>
<span class="line"><span>    │</span></span>
<span class="line"><span>    └─template</span></span>
<span class="line"><span>            hello.tmpl</span></span>
<span class="line"><span>            raw.tmpl</span></span></code></pre></div><p>整个 <code>Gin</code> 结构也就这么点文件，说明 <code>Gin</code> 是个轻量级，快速的框架是不无道理的 接下来我们去除无用的代码（test代码，example代码），重点研究 <code>Gin</code> 的精髓，去除之后仅剩下</p><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">│  auth.</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">go</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">              // 权限中间件，可无视</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">│  context.</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">go</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">           // 核心</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">│  context_appengine.</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">go</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> // 编译使用，debug 同样可无视</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">│  debug.</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">go</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">             // 打印输出，可无视</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">│  deprecated.</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">go</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">        // debug使用，可无视</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">│  doc.</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">go</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">               // doc 文档 无内容，可无视</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">│  errors.</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">go</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">            // 错误处理</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">│  fs.</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">go</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">                // 文件的工具类，没几行代码</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">│  gin.</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">go</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">               // 核心</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">│  logger.</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">go</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">            // 日志中间件，可无视</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">│  mode.</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">go</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">              // 设置开发模式 debug | release | test 同样可无视</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">│  path.</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">go</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">              // 对应 url 路径的 工具类</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">│  recovery.</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">go</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">          // recovery中间件，可无视</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">│  response_writer.</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">go</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">   // 核心，</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">│  routergroup.</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">go</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">       // 核心，路由抽象</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">│  tree.</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">go</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">              // 核心，前缀树</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">│  utils.</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">go</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">             // 工具类</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">│  version.</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">go</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">           // 版本，可无视</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">│</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">├─binding               </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 参数绑定以及验证</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">│      binding.</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">go</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">│      binding_nomsgpack.</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">go</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">│      default_validator.</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">go</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">│      form.</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">go</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">│      form_mapping.</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">go</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">│      header.</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">go</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">│      json.</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">go</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">│      msgpack.</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">go</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">│      multipart_form_mapping.</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">go</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">│      protobuf.</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">go</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">│      query.</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">go</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">│      uri.</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">go</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">│      xml.</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">go</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">│      yaml.</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">go</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">│</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">├─ginS                </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 实验功能</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">│      gins.</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">go</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">│</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">├─internal </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">│  ├─bytesconv </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">│  │      bytesconv.</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">go</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> // 字符串与 byte 互转工具</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">│  │</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">│  └─json             </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// json解析器</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">│          json.</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">go</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">│          jsoniter.</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">go</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">│</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">└─render              </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 渲染</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    data.</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">go</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    html.</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">go</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    json.</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">go</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    msgpack.</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">go</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    protobuf.</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">go</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    reader.</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">go</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    redirect.</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">go</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    render.</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">go</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    text.</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">go</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    xml.</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">go</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    yaml.</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">go</span></span></code></pre></div><p>接下来我们从入口文件分析 <code>Gin</code> 到底做了什么，一个最简单的使用方式如下：</p><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">package</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> main</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">github.com/gin-gonic/gin</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">func</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> main</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">() {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">	r </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> gin.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">New</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">	r.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">GET</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;/index&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">func</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">context</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> *</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">gin</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Context</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">		context.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">JSON</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">200</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">gin</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">H</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">			&quot;code&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">			&quot;data&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;hello world&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">		})</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">	})</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">	panic</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(r.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Run</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;:8080&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">))</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><h4 id="gin-new-做了什么" tabindex="-1"><code>gin.New()</code> 做了什么 <a class="header-anchor" href="#gin-new-做了什么" aria-label="Permalink to &quot;\`gin.New()\` 做了什么&quot;">​</a></h4><p>见名思意，New 肯定是创建了一个对象，看源码，让我们看看 <code>Gin</code> 到底创建了一个什么对象让我们使用</p><p>顺带说一下，源码中出现了 <code>var _ IRouter = &amp;Engine{}</code> 这样的代码，看上去很难理解，其实这代码是用来类型推断的，其作用是，在编译时，判断 <code>Engine</code> 类型是否实现 <code>IRouter</code> 接口</p><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">func</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> New</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">() </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">*</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Engine</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">	......</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">	engine </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:=</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> &amp;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Engine</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{ </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 实例化 gin 的引擎</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">		RouterGroup: </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">RouterGroup</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{ </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 路由</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">			Handlers: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">nil</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">			basePath: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;/&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">			root:     </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">true</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">		},</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">		FuncMap:                </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">template</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">FuncMap</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{},</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">		RedirectTrailingSlash:  </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">true</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">		RedirectFixedPath:      </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">false</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">		HandleMethodNotAllowed: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">false</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">		ForwardedByClientIP:    </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">true</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">		AppEngine:              defaultAppEngine,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">		UseRawPath:             </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">false</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">		UnescapePathValues:     </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">true</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">		MaxMultipartMemory:     defaultMultipartMemory,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">		trees:                  </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">make</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">methodTrees</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">9</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">), </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 路由--前缀树</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">		delims:                 </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">render</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Delims</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{Left: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;{{&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, Right: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;}}&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">},</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">		secureJsonPrefix:       </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;while(1);&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">	}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">	engine.RouterGroup.engine </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> engine</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">	engine.pool.New </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> func</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">() </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">interface</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{} {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">		return</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> engine.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">allocateContext</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">	}</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">	return</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> engine</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><h4 id="routergroup-是个啥" tabindex="-1">RouterGroup 是个啥？ <a class="header-anchor" href="#routergroup-是个啥" aria-label="Permalink to &quot;RouterGroup 是个啥？&quot;">​</a></h4><p>看定义</p><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">type</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> RouterGroup</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> struct</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">	Handlers </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">HandlersChain</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> // 对对应路径处理的方法链</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">	basePath </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">string</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> // 路由地址 如果是 a/b/c 这里指存放 a/b/c</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">	engine   </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">*</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Engine</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">	root     </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">bool</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> // 是否是根目录</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><p>不难判断，其实这玩意就是一个对路由分组处理的对象</p><p>其核心方法</p><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">func</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">group </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">*</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">RouterGroup</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">handle</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">httpMethod</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">relativePath</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> string</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">handlers</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> HandlersChain</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">IRoutes</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">	absolutePath </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> group.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">calculateAbsolutePath</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(relativePath) </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 获取绝对路径 -- example relativePath=/a/:base group.basePath=/q/e then absolutePath = /q/e/a/:base</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">	handlers </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> group.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">combineHandlers</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(handlers) </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 将新的handlers合并到方法链最后</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">	group.engine.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">addRoute</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(httpMethod, absolutePath, handlers) </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 路由核心方法</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">	return</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> group.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">returnObj</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">() </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 返回自己</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><p>再来看看 <code>addRoute</code> 做了什么</p><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">func</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">engine </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">*</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Engine</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">addRoute</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">method</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">path</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> string</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">handlers</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> HandlersChain</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">	assert1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(path[</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">] </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">==</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">/</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;path must begin with &#39;/&#39;&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">	assert1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(method </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">!=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;HTTP method can not be empty&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">	assert1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">len</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(handlers) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&gt;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;there must be at least one handler&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">	debugPrintRoute</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(method, path, handlers)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">	root </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> engine.trees.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">get</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(method) </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 判断</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">	if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> root </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">==</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> nil</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">		root </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> new</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">node</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">		root.fullPath </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;/&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">		engine.trees </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> append</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(engine.trees, </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">methodTree</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{method: method, root: root})</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">	}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">	root.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">addRoute</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(path, handlers)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div>`,22)]))}const o=a(l,[["render",h]]);export{d as __pageData,o as default};
