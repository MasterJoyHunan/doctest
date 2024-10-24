### k8s 组成
![http://tc.masterjoy.top/20201118/362538626eeecb2e917b9da16f652970.png](http://tc.masterjoy.top/20201118/362538626eeecb2e917b9da16f652970.png)

* 主节点（控制面板）-- 控制面板的组件持有井控制集群状态，但是它们不运行你的应用程序。这是由工作节点完成的 
	* etcd -- 可靠的分布式存储，持久化存储集群配置
	* api 服务器 -- 其他控制面板组件都要和它通信
	* scheduler -- 调度你的应用(为应用的每个可部署组件分配一 个工作节 点〕
	* controller manager -- 它执行集群级别的功能，如复制组件、持续跟踪工作节点 、处理节点失败 等
* 工作节点
	* kubelet -- 与 api 服务器通信，并管理所在节点的容器
	* kube-proxy -- 负载均衡
	* 容器 -- docker 或 rtk 等其他.......

### k8s 描述文件部署过程
![http://tc.masterjoy.top/20201119/874ab8ef044255f4e1ed67a700bfbf16.png](http://tc.masterjoy.top/20201119/874ab8ef044255f4e1ed67a700bfbf16.png)


### 运行进行镜像过程

![http://tc.masterjoy.top/20201119/126cdab2d3314ed2b1754c73782aadc6.png](http://tc.masterjoy.top/20201119/126cdab2d3314ed2b1754c73782aadc6.png)

### pod 、rc、service 的关系
![http://tc.masterjoy.top/20201120/47744c6bb1605f90a74fa400f89f12f8.png](http://tc.masterjoy.top/20201120/47744c6bb1605f90a74fa400f89f12f8.png)

### configMap
![http://tc.masterjoy.top/20201211/514a056550f7f32b8a4f73eb389354fe.png](http://tc.masterjoy.top/20201211/514a056550f7f32b8a4f73eb389354fe.png)

### 事件链
![image-20201223111332687](http://tc.masterjoy.top/typory/image-20201223111332687.png)

### k8s 高可用
![image-20201223090846400](http://tc.masterjoy.top/typory/image-20201223090846400.png)

### RBAC 角色绑定

![image-20201224092438106](http://tc.masterjoy.top/typory/image-20201224092438106.png)

### 典型 k8s 应用包含的组件

![image-20201230155007656](http://tc.masterjoy.top/typory/image-20201230155007656.png)

### 创建configMap
```
kubectl create configmap mysql-redis-config --from-file=config_map_file
```

### 创建证书
```
kubectl create secret tls [name] --cert=[xx] --key=[xxx]
```

### 创建证书2
```
kubectl create secret generic fortune-https --from-file=[dir or file]
```

### 将本地文件配置文件上传至服务器
```
scp -r ./* root@masterjoy.top:/home/k8s/config
```

### k8s 进行滚动升级
```
kubectl apply -f xxx.yaml --record
```

滚动升级的几种方式
```
kubectl edit deployment [xxx]
```
```
kubectl patch deployment [xxx] -p '{"spec":{"template": {"spec": {"containers": [ {"name":"nodejs", "image": "luksa/kubia:v2"}]}}}}'
```
```
# 常用
kubectl apply -f [xxx]
```
```
kubectl replace
```
```
# 常用
kubectl set image deployment [xxx] ContainerName=ImageName
```

`--record` 会记录升级过程，使用了该参数，在升级过程中，使用下面的命令，会打印详细升级日志

```
kubectl rollout status deployment [xxx]
```

### k8s 查看升级记录，前提是必须加上 --record 参数
```
kubectl rollout history deployment [xxx]
```
返回
```
deployment.apps/shttp-dp
REVISION  CHANGE-CAUSE
1         kubectl.exe apply --filename=deployment/deployment.yaml --record=true
3         kubectl.exe apply --filename=deployment/deployment.yaml --record=true
4         kubectl.exe apply --filename=deployment/deployment.yaml --record=true
```

### k8s 进行回滚升级
```
kubectl rollout undo deployment [xxx]
```
如果需要回滚到指定的版本
```
kubectl rollout undo deployment [xxx] --to-revision=1
```
`--to-revision` 指的是上面 `kubectl rollout history` 里的 `revision`

### k8s 进行暂停和启用 并使用该特性作为金丝雀发布
```
kubectl rollout pause deployment [xxx]
```
```
kubectl rollout resume deployment [xxx]
```

### k8s 创建一个临时的 POD
```
kubectl run -it srvlookup --image=tutum/dnsutils --rm --restart=Never -- dig SRV shttps-ss.default.svc.cluster.local
```
上面的命令运行
一个名为srvlookup 的一次性pod(--restart=Never ) ,
它会关联控制台(-it )并且在终止后立即删除(--rm)。 这个pod依据tutum/
dnsutils镜像启动单独的容器

### k8s 强制删除某个POD
```
kubectl delete po [XXX] --force --grace-period 0
```

### 优化展示
```
 kubectl get po -o custom-columns=POD:metadata.name,NODE:spec.nodeName --sort-by metadata.name -n kube-system
```

 `custom-columns` 优化展示某个项
 `--sort-by` 对某个项目进行排序

### 为某个节点添加污点
```
kubect1 taint node [some-node-name] [key]=[value]:[effect]
e.g.
kubect1 taint node node.master node-type=prod:NoSchedule
```

### 为某个节点删除污点
```
kubect1 taint node [some-node-name] [key]
e.g.
kubect1 taint node node.master node-type
```


