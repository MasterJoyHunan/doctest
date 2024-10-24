### kubectl 常用命令

* kubectl cluster-info -- 获取集群信息
* kubectl get nodes -- 获取节点列表
* kubectl describe node [x] -- 获取节点详细信息
* kubectl get pods -- 获取正在运行的pod
* kubectl get rc -- 获取rc
* kubectl run [xxx] --image=[xxx] --port=[xxx] --generator=run/v1
* kubectl expose rc [xxx] --type=LoadBalancer --name [xxx-xx]
* kubectl delete pods [xxx] 删除某些 pod
* kubectl delete rc [xxx] 删除某些 ReplicationController
* kubectl delete service [xxx] 删除某些 service
* kubectl sclac rc [xxx] --replicas = [n] 修改某个 rc 控制的 pod 副本数量
* kubectl explain pods -- 获取帮助
* kubectl explain pod.spec -- 获取更详细的帮助
* kubectl create -f xxxx.yaml -- 根据文件来创建资源
* kubectl logs [xxx] -- 获取pod中容器的打印日志
* kubectl logs [xxx] -c [xxx] -- 单个pod中含有多个容器，打印单个容器的日志
* kubectl port-forward [xxx] 8888:8080 -- 如果不想使用service 暴露我们的端口，则可以使用端口转发，使宿主机8888转发容器端口8080    (暂时使用)
* kubectl label pods [xxx] [ddd1] [ddd2] -- 修改某个pod 的标签 （对 node 同样有效）
* kubectl get po -l [xxx] -- 按标签筛选pod （对 node 同样有效）
* kubectl annotate pod [xxx] [ddd1] [ddd2]  -- 修改某个pod的注解
* kubectl get ns -- 获取 k8s 的命名空间 namespace
* kubectl create namespace [xxx] 创建一个命名空间
* kubectl create -f [xxx.yaml] -n [xxx] 创建一组资源的时候主动设置命名空间
* kubectl config set-context $(kubectl config current-context) --namespace [xxx] -- 切换当前上下文的命名空间
* kubectl delete po [xxx] [xxx] --删除某个或多个 pod (同样适用于命名空间,命名空间内的pod 会同步删除)
* kubectl delete po -l [xxx]  -- 根据某个标签删除某个或多个 pod 
* kubectl delete po --all --删除当前命名空间下所有的pod
* kubectl delete all --all --删除当前命名空间下几乎所有资源 （rc, pod, service .......）
* kubectl edit rc [xxx] 编辑某个RC
* kubectl delete rc [xxx] --cascad=false -- 删除 rc 但是不删除 rc 创建的 pod
* kubectl exec [xxx] --远程地在一个已经存在的pod容器上执行任何 命令。
* kubectl create serviceaccount [xxx] 创建一个 serviceaccount


### kubectl 标签选择器常用操作

选择标签含有 publishEnv 的 pod `l- publishEnv`
选择标签不含有 publishEnv 的 pod `l- '!publishEnv'`
选择标签含有 publishEnv 且值等于 prod 的 pod `l- publishEnv=prod`
选择标签含有 publishEnv 且值不等于 prod 的 pod `l- publishEnv!=prod`
选择标签含有 publishEnv 且值包含 prod、dev 的 pod `l- 'publishEnv in (prod,dev)'`
选择标签含有 publishEnv 且值不包含 prod、dev 的 pod `l- 'publishEnv notin (prod,dev)'`
组合使用 （相当于&&）`publishEnv=prod,app=pc
