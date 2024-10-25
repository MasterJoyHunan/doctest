import{_ as s,c as a,a2 as n,o as l}from"./chunks/framework.DPuwY6B9.js";const E=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"spring/6.spring-boot.md","filePath":"spring/6.spring-boot.md","lastUpdated":1729761429000}'),t={name:"spring/6.spring-boot.md"};function e(p,i,h,r,o,k){return l(),a("div",null,i[0]||(i[0]=[n(`<h3 id="spring-boot-初始化" tabindex="-1">Spring-boot 初始化 <a class="header-anchor" href="#spring-boot-初始化" aria-label="Permalink to &quot;Spring-boot 初始化&quot;">​</a></h3><ol><li><p>获取 bean definition 配置源</p><div class="language-JAVA vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">JAVA</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// Some.class 是 bean definition 配置源</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">SpringApplication application </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> new</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> SpringApplication</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(Some.class);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  </span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 添加其他配置源</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">HashSet&lt;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">Object</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt; objects </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> new</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> HashSet&lt;&gt;();</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">objects.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">add</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;classpath:bean.xml&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">application.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">setSources</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">new</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> HashSet&lt;&gt;());</span></span></code></pre></div></li><li><p>判断是什么应用 Web/Reactive/非Web</p></li><li><p>添加 ApplicationContext 初始化器</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> application.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">addInitializers</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">new</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> ApplicationContextInitializer&lt;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">ConfigurableApplicationContext</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;() {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">   @</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">Override</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">   public</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> void</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> initialize</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(ConfigurableApplicationContext </span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">applicationContext</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">     System.out.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">println</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;可以对 applicationContext 做点什么&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">   }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> });</span></span></code></pre></div></li><li><p>注册监听器</p><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">spring.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">addListeners</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">new</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> ApplicationListener&lt;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">ApplicationEvent</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;() {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  @</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">Override</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  public</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> void</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> onApplicationEvent</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(ApplicationEvent </span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">event</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">		System.out.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">println</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;可以监听spring提供的发布事件&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">});</span></span></code></pre></div></li><li><p>推断主启动类</p></li></ol><h3 id="spring-boot-run" tabindex="-1">Spring-boot run <a class="header-anchor" href="#spring-boot-run" aria-label="Permalink to &quot;Spring-boot run&quot;">​</a></h3><ol><li>获取事件发布器发布事件 <ol><li>starting 事件 -- 容器刚开始启动</li><li>environmentPrepared -- 环境信息准备完成</li><li>contextPrepared -- spring 容器创建完成，并初始化</li><li>contextLoaded -- 加载完所有的 bean definition</li><li>started -- spring 容器初始化完成 （refresh 完成）</li><li>running -- spring-boot 启动完毕</li><li>failed -- spring-boot 启动失</li></ol></li><li>包装 args 参数</li><li>准备环境变量 -- 加载配置文件,系统的环境变量,启动容器使用的参数</li><li>将不规范的环境变量,转换为规范的环境变量</li><li>将 spring.main 相关的环境变量绑定到 SpringApplication 对象</li><li>打印 banner 信息 (启动时出现 springboot 的输出)</li><li>创建 spring 容器 (web 还是非web 容器)</li><li>回调 初始化器 (构造 SpringApplication 使用的 ApplicationContextInitializer)</li><li>获取所有的 beanDefinition 源, 加载到容器</li><li>调用 refresh() 方法</li><li>回调实现了 ApplicationRunner, CommandLineRunner 的方法</li></ol><h3 id="refresh-做了什么" tabindex="-1">refresh() 做了什么 <a class="header-anchor" href="#refresh-做了什么" aria-label="Permalink to &quot;refresh() 做了什么&quot;">​</a></h3><ol><li><p><code>prepareRefresh()</code>将 spring 容器设置为激活状态</p></li><li><p><code>obtainFreshBeanFactory()</code> 创建一个 beanFactory</p></li><li><p><code>prepareBeanFactory(beanFactory)</code> beanFactory 进行准备工作</p><ol><li>设置类加载器</li><li>设置表达式的解析器</li><li>注册一些 beanPostProcessor</li><li>注册一些 bean</li></ol></li><li><p><code>postProcessBeanFactory(beanFactory)</code> beanFactory准备工作完成后进行的后置处理工作 (空实现)</p></li><li><p><code>invokeBeanFactoryPostProcessors(beanFactory)</code> 执行 beanFactoryPostProcessors 的处理逻辑</p><ol><li>包含 <code>BeanFactoryPostProcessor::postProcessBeanFactory() </code></li><li>和 <code>BeanDefinitionRegistryPostProcessor::postProcessBeanDefinitionRegistry()</code></li></ol></li><li><p><code>registerBeanPostProcessors(beanFactory)</code> 注册 BeanPostProcessors (重点)</p></li><li><p><code>initMessageSource()</code> 初始化 i18n 组件</p></li><li><p><code>initApplicationEventMulticaster()</code> 初始化事件发布器</p></li><li><p><code>onRefresh()</code> 准备好各种组件后,调用(空实现)</p></li><li><p><code>registerListeners()</code> 注册监听器</p></li><li><p><code>finishBeanFactoryInitialization(beanFactory)</code> 初始化所有的单实例 bean (重点)</p><ol><li>bean 的生命周期</li></ol></li><li><p><code>finishRefresh()</code> 完成 IOC 容器的创建</p></li></ol><h3 id="bean-的生命周期" tabindex="-1">Bean 的生命周期 <a class="header-anchor" href="#bean-的生命周期" aria-label="Permalink to &quot;Bean 的生命周期&quot;">​</a></h3><ol><li>bean定义</li><li>bean注册</li><li>实例化</li><li>依赖注入</li><li>初始化</li><li>销毁</li></ol>`,8)]))}const c=s(t,[["render",e]]);export{E as __pageData,c as default};
