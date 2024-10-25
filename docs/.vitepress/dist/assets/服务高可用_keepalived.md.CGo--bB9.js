import{_ as n,c as a,a2 as p,o as e}from"./chunks/framework.DPuwY6B9.js";const u=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"服务高可用/keepalived.md","filePath":"服务高可用/keepalived.md","lastUpdated":1729761429000}'),l={name:"服务高可用/keepalived.md"};function i(c,s,t,r,o,d){return e(),a("div",null,s[0]||(s[0]=[p(`<div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>! Configuration File for keepalived</span></span>
<span class="line"><span></span></span>
<span class="line"><span>global_defs {</span></span>
<span class="line"><span>   router_id k8s # 使用默认的即可，主从都无需修改</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 对应下方的 track_script 里面的值</span></span>
<span class="line"><span>vrrp_script check_some_software {</span></span>
<span class="line"><span>    script &quot;/foo/bar/xx.sh&quot; # 脚本路径</span></span>
<span class="line"><span>    interval 3 # 多少秒运行一次脚本</span></span>
<span class="line"><span>    weight -20 # 如果失败，权重减多少</span></span>
<span class="line"><span>    fall 3     # 检测几次失败才为失败，整数</span></span>
<span class="line"><span>    rise 2     # 检测几次状态为正常的，才确认正常，整数</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>vrrp_instance VI_1 {</span></span>
<span class="line"><span>    state MASTER # 使用 MASTER BACKUP</span></span>
<span class="line"><span>    interface ens33 # 本机网卡 主从都需修改</span></span>
<span class="line"><span>    virtual_router_id 51 # VIP 唯一标识 主从需一致</span></span>
<span class="line"><span>    priority 100 # 权重，谁设置的权重大，VIP 就漂移至那个节点</span></span>
<span class="line"><span>    advert_int 1 # 通告频率，单位为秒</span></span>
<span class="line"><span>    unicast_src_ip 172.18.153.44 # 本机IP</span></span>
<span class="line"><span>    unicast_peer { # 其他机器的IP</span></span>
<span class="line"><span>        172.18.153.46 </span></span>
<span class="line"><span>        172.18.153.45</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    authentication { # 验证机制，默认即可</span></span>
<span class="line"><span>        auth_type PASS</span></span>
<span class="line"><span>        auth_pass 1111</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    virtual_ipaddress {</span></span>
<span class="line"><span>        192.168.20.100 # VIP 的 IP</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    # 追踪脚本，通常用于去执行上面的vrrp_script定义的脚本内容</span></span>
<span class="line"><span>    # 用于编写脚本对业务进程进行检测监控</span></span>
<span class="line"><span>    # 如果脚本执行结果为0，并且weight配置的值大于0，则优先级相应的增加</span></span>
<span class="line"><span>    # 如果脚本执行结果非0，并且weight配置的值小于0，则优先级相应的减少</span></span>
<span class="line"><span>    # 优先级相对大的节点会会切换为主节点</span></span>
<span class="line"><span>    track_script {</span></span>
<span class="line"><span>		check_some_software</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div>`,1)]))}const v=n(l,[["render",i]]);export{u as __pageData,v as default};
