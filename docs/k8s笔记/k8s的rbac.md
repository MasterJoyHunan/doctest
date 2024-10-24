主体

* user
* service account
* group

角色
* 命名空间角色 （role）
* 集群角色 (cluster-role)

资源 

* 命名空间的资源 
  * service
* 集群级别的资源
  * node
  * pv
  * namespace
  * 不表示资源的 api 路径 `/healthz`

定义一个 role 

```YAML
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  namespace: foo # 适用于哪个命名空间
  name: foo-role
rules:
  - resources:
      - "services" # 设置对 service 有什么权限
    apiGroups:     # service 是核心 apiGroup 的资源，所以是 ""
      - ""
    verbs:
      - "get"  	   # 对 service 有查看详情的权限
      - "list"     # 对 service 有查看列表的权限

```

也可以使用命令行来创建

```shell
kubectl create role [role-name] --verb=get --verb=list --resources=services
```

* apiGroups  资源组
* verbs         权限
* resources  哪些资源

将角色绑定到一个主体（sevices-account）

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  namespace: foo # 注意命名空间
  name: foo-role-binding
roleRef: # 角色绑定引用，一个角色绑定只能将一个角色绑定到一个或多个主体
  apiGroup: rbac.authorization.k8s.io # ？？？
  kind: Role # 对角色进行绑定
  name: foo-role # 绑定的名称
subjects: # 主体是 foo 命名空间的叫做 default 的 ServiceAccount
  - kind: ServiceAccount 
    name: default 
    namespace: foo 
  - kind: ServiceAccount  # 新增一个 bar 命名空间的叫做 default 的 ServiceAccount
    name: default 
    namespace: bar 
# 所以总结一下就是 foo,bar 命名空间下 default 的 ServiceAccount 都可以访问 foo 命名空间下的 services
```

也可以用命名行

```shell
kubectl create rolebinding [rolebinding-name] --role=[role-name] --serviceaccount=[service-account] -n=[namesbase]
设置用户 --user
设置组 --group
```

因为一个常规的角色只允许访问和角色在同一个命名空间中的资源，如果需要跨命名空间，需要在多个命名空间中创建多个 role & role-binding ，而且常规角色也无法访问不表示资源的 api 路径 `/healthz`，所以 cluster-role 孕育而生 

创建一个 cluster-role

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  name: test-admin # 集群角色名
rules:
  - resources:
      - "ingresses" # 设置对 ingresses 有什么权限
    apiGroups:      # 资源组
      - "networking.k8s.io"
    verbs:
      - "get"  	   # 对 ingresses 有查看详情的权限
      - "list"     # 对 ingresses 有查看列表的权限
```

如果将 cluster-role 使用 role-binding 绑定到 service-account, 则会出现 service-account 无法访问到集群方面的资源，如 `ingresses` `pv` `pvc` 等等，如果需要访问集群的资源，则需要 cluster-role-binding, 

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: test-cluster-admin
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: cluster-admin
subjects:
- apiGroup: rbac.authorization.k8s.io
  kind: ServiceAccount
  name: default
  namespace: foo

```

命令行

```shell
kubectl create clusterrolebinding [crb-name] --clusterrole=[clusterrole] --serviceaccount=[serviceaccount]
```

role <-> role-binding  正常操作,可访问命名空间内的资源

cluster-role <-> cluster-role-binding 正常操作，可访问集群及URL资源

cluster-role <-> role-binding  无法访问集群资源，但是可以访问命名空间内的资源，利用这个特性可以定义个 cluster-role ,多个 role-binding 使其主体只能访问命名空间内的资源，而无需重复定义多个 role

role <-> cluster-role-binding 

