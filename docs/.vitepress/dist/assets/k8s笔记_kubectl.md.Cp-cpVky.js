import{_ as l,c,a2 as t,o as i}from"./chunks/framework.DPuwY6B9.js";const s=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"k8s笔记/kubectl.md","filePath":"k8s笔记/kubectl.md","lastUpdated":1729761429000}'),o={name:"k8s笔记/kubectl.md"};function d(x,e,p,a,r,u){return i(),c("div",null,e[0]||(e[0]=[t('<h3 id="kubectl-常用命令" tabindex="-1">kubectl 常用命令 <a class="header-anchor" href="#kubectl-常用命令" aria-label="Permalink to &quot;kubectl 常用命令&quot;">​</a></h3><ul><li>kubectl cluster-info -- 获取集群信息</li><li>kubectl get nodes -- 获取节点列表</li><li>kubectl describe node [x] -- 获取节点详细信息</li><li>kubectl get pods -- 获取正在运行的pod</li><li>kubectl get rc -- 获取rc</li><li>kubectl run [xxx] --image=[xxx] --port=[xxx] --generator=run/v1</li><li>kubectl expose rc [xxx] --type=LoadBalancer --name [xxx-xx]</li><li>kubectl delete pods [xxx] 删除某些 pod</li><li>kubectl delete rc [xxx] 删除某些 ReplicationController</li><li>kubectl delete service [xxx] 删除某些 service</li><li>kubectl sclac rc [xxx] --replicas = [n] 修改某个 rc 控制的 pod 副本数量</li><li>kubectl explain pods -- 获取帮助</li><li>kubectl explain pod.spec -- 获取更详细的帮助</li><li>kubectl create -f xxxx.yaml -- 根据文件来创建资源</li><li>kubectl logs [xxx] -- 获取pod中容器的打印日志</li><li>kubectl logs [xxx] -c [xxx] -- 单个pod中含有多个容器，打印单个容器的日志</li><li>kubectl port-forward [xxx] 8888:8080 -- 如果不想使用service 暴露我们的端口，则可以使用端口转发，使宿主机8888转发容器端口8080 (暂时使用)</li><li>kubectl label pods [xxx] [ddd1] [ddd2] -- 修改某个pod 的标签 （对 node 同样有效）</li><li>kubectl get po -l [xxx] -- 按标签筛选pod （对 node 同样有效）</li><li>kubectl annotate pod [xxx] [ddd1] [ddd2] -- 修改某个pod的注解</li><li>kubectl get ns -- 获取 k8s 的命名空间 namespace</li><li>kubectl create namespace [xxx] 创建一个命名空间</li><li>kubectl create -f [xxx.yaml] -n [xxx] 创建一组资源的时候主动设置命名空间</li><li>kubectl config set-context $(kubectl config current-context) --namespace [xxx] -- 切换当前上下文的命名空间</li><li>kubectl delete po [xxx] [xxx] --删除某个或多个 pod (同样适用于命名空间,命名空间内的pod 会同步删除)</li><li>kubectl delete po -l [xxx] -- 根据某个标签删除某个或多个 pod</li><li>kubectl delete po --all --删除当前命名空间下所有的pod</li><li>kubectl delete all --all --删除当前命名空间下几乎所有资源 （rc, pod, service .......）</li><li>kubectl edit rc [xxx] 编辑某个RC</li><li>kubectl delete rc [xxx] --cascad=false -- 删除 rc 但是不删除 rc 创建的 pod</li><li>kubectl exec [xxx] --远程地在一个已经存在的pod容器上执行任何 命令。</li><li>kubectl create serviceaccount [xxx] 创建一个 serviceaccount</li></ul><h3 id="kubectl-标签选择器常用操作" tabindex="-1">kubectl 标签选择器常用操作 <a class="header-anchor" href="#kubectl-标签选择器常用操作" aria-label="Permalink to &quot;kubectl 标签选择器常用操作&quot;">​</a></h3><p>选择标签含有 publishEnv 的 pod <code>l- publishEnv</code> 选择标签不含有 publishEnv 的 pod <code>l- &#39;!publishEnv&#39;</code> 选择标签含有 publishEnv 且值等于 prod 的 pod <code>l- publishEnv=prod</code> 选择标签含有 publishEnv 且值不等于 prod 的 pod <code>l- publishEnv!=prod</code> 选择标签含有 publishEnv 且值包含 prod、dev 的 pod <code>l- &#39;publishEnv in (prod,dev)&#39;</code> 选择标签含有 publishEnv 且值不包含 prod、dev 的 pod <code>l- &#39;publishEnv notin (prod,dev)&#39;</code> 组合使用 （相当于&amp;&amp;）`publishEnv=prod,app=pc</p>',4)]))}const b=l(o,[["render",d]]);export{s as __pageData,b as default};
