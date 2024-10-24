### 安装 GLP 日志收集系统

在k8s上安装 prometail + loki + grafana 日志收集系统

#### 前提

* 安装了 k8s 
* 安装了 helm

loki 是一个时序性数据库

prometail 用于收集 pod 上的 stdout 日志的

grafana 用于展示收集的日志

#### `0X0001` 首先安装 LOKI

```bash
# helm 添加 grafana 源
helm repo add grafana https://grafana.github.io/helm-charts

# 搜索 loki
helm search repo loki
---
NAME                        	CHART VERSION	APP VERSION	DESCRIPTION                                       
grafana/loki                	2.11.1       	v2.5.0     	Loki: like Prometheus, but for logs.              
grafana/loki-canary         	0.8.0        	2.5.0      	Helm chart for Grafana Loki Canary                
grafana/loki-distributed    	0.48.4       	2.5.0      	Helm chart for Grafana Loki in microservices mode 
grafana/loki-simple-scalable	1.1.0        	2.5.0      	Helm chart for Grafana Loki in simple, scalable...
grafana/loki-stack          	2.6.4        	v2.4.2     	Loki: like Prometheus, but for logs.              
grafana/fluent-bit          	2.3.1        	v2.1.0     	Uses fluent-bit Loki go plugin for gathering lo...
grafana/promtail            	4.2.1        	2.5.0      	Promtail is an agent which ships the contents o...
```

尝试 debug 安装，查看安装的 loki 所有资源文件

```
helm install loki grafana/loki --debug --dry-run
```

发现 loki 是一个 StatefulSet 资源

```
...
# Source: loki/templates/statefulset.yaml
apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: loki
  namespace: default
  labels:
    app: loki
    chart: loki-2.11.1
    release: loki
    heritage: Helm
...
```

说明 loki 是一个有状态的服务，我们需要为其配置文件持久化 pvc/sc ， 否则重启服务会丢失以前存储的数据

再查看一下 helm 安装 loki 的配置文件

```
helm show values grafana/loki > loki.value.yaml
```

查看 value 文件，发现可以在这里进行配置

```
...
## ref: https://kubernetes.io/docs/concepts/storage/persistent-volumes/
## If you set enabled as "True", you need :
## - create a pv which above 10Gi and has same namespace with loki
## - keep storageClassName same with below setting
persistence:
  enabled: false
  accessModes:
  - ReadWriteOnce
  size: 10Gi
  annotations: {}
  # 使用阿里云的 nas 
  storageClassName: alicloud-nas
...
```

修改完毕之后，使用修改好的配置文件进行安装

```
helm upgrade -f loki.value.yaml loki grafana/loki -i -n log-collection
```

命令的意思是，升级 loki ，如果没有安装过，就进行安装 -n 表示安装在哪个命名空间下

#### `0X0002`安装 prometail

和上面一样，先查看，再拉取配置

```
helm install promtail grafana/promtail --debug --dry-run
```

```yaml
# Source: promtail/templates/daemonset.yaml
apiVersion: apps/v1
kind: DaemonSet
metadata:
	...
spec:
  ...
  template:
    metadata:
      ...
    spec:
	  ...
      containers:
        - name: promtail
          image: "docker.io/grafana/promtail:2.5.0"
          imagePullPolicy: IfNotPresent
          args:
            - "-config.file=/etc/promtail/promtail.yaml"
          volumeMounts:
            - name: config
              mountPath: /etc/promtail
            - name: run
              mountPath: /run/promtail
            - mountPath: /var/lib/docker/containers
              name: containers
              readOnly: true
            - mountPath: /var/log/pods
              name: pods
              readOnly: true
         ...
      volumes:
        - name: config
          secret:
            secretName: promtail
        - name: run
          hostPath:
            path: /run/promtail
        - hostPath:
            path: /var/lib/docker/containers
          name: containers
        - hostPath:
            path: /var/log/pods
          name: pods
```

发现这是一个 DaemonSet 资源， 并且设置了 hostPath ，DaemonSet  + hostPath 意味着每台服务器都会有一个 POD, 并且数据会持久化到每台机器，将配置文件拉取下来看看

```
helm show values grafana/promtail > promtail.value.yaml
```

要修改上报的的地址，也就是 loki 的地址

```
config:
  lokiAddress: http://loki:3100/loki/api/v1/push # 需要修改
```

然后开始安装

```
helm upgrade -f promtail.value.yaml promtail grafana/promtail -i -n log-collection
# 或者直接在命名行里面修改配置
helm upgrade --set config.lokiAddress=http://loki:3100/loki/api/v1/push promtail grafana/promtail -i -n log-collection
```

#### `0X0003`安装 grafana

在安装 istio 的时候，就已经安装了 grafana 了，如果没有安装，则流程和上面的一样，这里不复述了

这里讲解配置 grafana

1. 暴露 grafana

如果安装了 istio 使用 gateway

```yaml
apiVersion: networking.istio.io/v1alpha3
kind: Gateway
metadata:
  name: grafana
  namespace: istio-system
spec:
  selector:
    app: istio-ingress
  servers:
    - port:
        protocol: HTTP
        name: http
        number: 80
      hosts:
        - grafana.weather.top
---
apiVersion: networking.istio.io/v1alpha3
kind: VirtualService
metadata:
  name: grafana
  namespace: istio-system # 命名空间是个大坑  VirtualService 和 Service 需要放在同一个命名空间里面
spec:
  hosts:
    - grafana.weather.top
  gateways:
    - istio-system/grafana
  http:
    - route:
        - destination:
            host: grafana
            port:
              number: 3000
