### 背景

因为 k8s 需要部署一些静态文件，和需要处理一些的文件上传 app 。并且使用了是阿里云的机器，所以研究一下阿里的 k8s 文件挂载的处理方式

阿里云的文件挂载有3种方式，

1. 云盘 -- ECS用的磁盘。该磁盘只能给一台机器使用。用到容器里，也就是一个云盘存储卷PV只能被一个POD使用，不能在多个POD中共享

2. nas -- K8S中使用，通常是用在频繁读写的场景，或者是需要多个POD间共享的场景

3. oss -- OSS适合写入频度比较低，对于读取要求比较高，没有随机访问需求，比如媒体文件访问等

很明显，我们需要的是 nas 和 oss 文件系统，权衡利弊，我使用了 nas，

参考文档 https://help.aliyun.com/document_detail/140392.html?spm=a2c4g.11186623.6.576.5fe71120UsFkju

教程 https://developer.aliyun.com/topic/containernas?spm=a2c4g.11186623.2.15.26a8ba9btdE829

### 文件挂载驱动

要挂载文件系统就需要存储插件，阿里云的存储插件包含了 

* Flexvolume 存储插件
* CSI 存储插件

此处使用 Flexvolume  举例

参考 https://help.aliyun.com/document_detail/140392.html?spm=a2c4g.11186623.6.576.5fe71120UsFkju

```yaml
kind: Deployment
apiVersion: apps/v1
metadata:
  name: alicloud-nas-controller
  namespace: kube-system # 注意命名空间
spec:
  selector:
    matchLabels:
      app: alicloud-nas-controller
  strategy:
    type: Recreate
  template:
    metadata:
      labels:
        app: alicloud-nas-controller
    spec:
      tolerations:
      - operator: Exists
      affinity:
        nodeAffinity:
          preferredDuringSchedulingIgnoredDuringExecution:
          - weight: 1
            preference:
              matchExpressions:
              - key: node-role.kubernetes.io/master
                operator: Exists
      priorityClassName: system-node-critical
      serviceAccount: admin # 注意这里
      hostNetwork: true
      containers:
        - name: nfs-provisioner
          image: registry.cn-hangzhou.aliyuncs.com/acs/alicloud-nas-controller:v1.14.3.8-58bf821-aliyun
          env:
          - name: PROVISIONER_NAME
            value: alicloud/nas
          securityContext:
            privileged: true
          volumeMounts:
          - mountPath: /var/log
            name: log
      volumes:
      - hostPath:
          path: /var/log
        name: log
```

因为是自建自建 k8s ，所以默认是没有 admin 这个 serviceAccount 的，解决方案是自创一个 serviceAccount 

```shell
k create serviceaccount -n kube-system admin
```

将 admin 绑定到角色

```yaml
k create clusterrolebinding kube-sys-admin --clusterrole=cluster-admin --serviceaccount=kube-system:admin
```

再将其重新创建

```
k delete -f flexvolumn.yaml
&& 
k apply -f flexvolumn.yaml
```

完美解决

验证

```
k get pods --all-namespaces

NAMESPACE     NAME                                                READY   STATUS    RESTARTS   AGE
kube-system   alicloud-nas-controller-7c577579b5-dnwrl            1/1     Running   0          3m42s
```

创建 storage-class

```yaml
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: alicloud-nas
mountOptions:
- nolock,tcp,noresvport
- vers=3
parameters:
  server: id-hangzhou.nas.aliyuncs.com:/nasroot1/
  driver: flexvolume
provisioner: alicloud/nas
reclaimPolicy: Retain
```

也可直接使用 volumn 

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: shttp-dp
spec:
  replicas: 1
  selector:
    matchLabels:
      app: testApp
  template:
    metadata:
      name: simple-po
      labels:
        app: testApp
    spec:
      containers:
        - name: shttp
          image: some-image
          volumeMounts:
            - mountPath: /data/
              name: alicloud-nas
      volumes:
        - name: alicloud-nas
          flexVolume:
            driver: alicloud/nas
            options:
              server: id-shenzhen.nas.aliyuncs.com
              path: /test-web
              vers: "3"
              options: nolock,tcp,noresvport

```

需要注意的是，创建 nas 文件系统需要和主机在同一个专有网络VPC 内，不然云主机无法访问 nas

![image-20210511103155992](http://tc.masterjoy.top/typory/image-20210511103155992.png)

接下来通过一个小项目来应用我们上面学到的理论知识

首先介绍一下这个小项目，这是个上传图片至七牛云的 webapp, 使用前后端分离的技术架构。具体的流程就是将图片文件上传后，后端将图片进行校验，重命名，然后上传给七牛云，返回重命名图片的地址。

在刚进入这个页面的时候，显示最近100条上传的图片

![image-20210511163132767](http://tc.masterjoy.top/typory/image-20210511163132767.png)

总体来说是个很简单很简单的项目

接下来一步一步编写配置文件，分别部署前端后端，服务，ingress

### 部署前端服务

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: tuchuang-nginx-config
data:
  defalut.conf: |+
    server {
        listen 80;
        server_name testtuchuang.top;
        index index.html;
        root /data/test;
    }
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: tuchuang-nginx
spec:
  replicas: 1
  selector:
    matchLabels:
      app: tuchuang-nginx
  template:
    metadata:
      name: tuchuang-nginx
      labels:
        app: tuchuang-nginx
    spec:
      containers:
        - name: tuchuang-nginx
          image: nginx:1.19.6-alpine
          ports:
            - containerPort: 80
          volumeMounts:
            - mountPath: /data/
              name: web-static-file
            - mountPath: /etc/nginx/conf.d/
              name: nginx-config
      volumes:
        - name: alicloud-nas
          flexVolume:
            driver: alicloud/nas
            options:
              server: id-shenzhen.nas.aliyuncs.com
              path: /test-web
              vers: "3"
              options: nolock,tcp,noresvport
        - name: nginx-config # 需要先创建 configMap
          configMap:
            name: tuchuang-nginx-config
```

上面先生成了一个 nginx 的配置文件，再使用 Deployment 部署了一个 nginx 服务，nginx 服务的配置 /etc/nginx/conf.d/ 挂载了我们自定义的配置，配置中的 root 目录 /data/test 又被我们挂载 nas 文件系统，所以理论上来说，只要我们将 index.html 等文件复制到 nas 文件系统里，访问 testtuchuang.top 即可访问到我们写的 web 项目。但是实际上，现在暂时还无法访问到 testtuchuang.top

### 添加service 和 ingress

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: tuchuang-ingress
spec:
  rules:
    - host: testtuchuang.top
      http:
        paths:
          - pathType: Prefix
            path: "/"
            backend:
              service:
                name: tuchuang-nginx
                port:
                  number: 80
---
apiVersion: v1
kind: Service
metadata:
  name: tuchuang-nginx
spec:
  selector:
    app: tuchuang-nginx
  ports:
    - port: 80
      targetPort: 80
```

这里创建了一个 tuchuang-nginx 服务，并创建了一个 Ingress 规则，将服务该 ingress 规则的域名指向了 tuchuang-nginx，这样一个简单 web 服务就搞定了。接下来就是部署后端方面的服务了，毕竟不能只有一副躯壳，而没有灵魂

### 部署后端服务之前的准备

因为后端使用的 redis 缓存服务充当了数据库，我们并没有将 redis 使用 k8s 部署，这样的话，就无法在 k8s 中直接访问 redis，需要创建一个 headless 服务来间接的访问 redis ，我们需要先创建一个

> 有时不需要或不想要负载均衡，以及单独的 Service IP。 遇到这种情况，可以通过指定 Cluster IP（`spec.clusterIP`）的值为 `"None"` 来创建 `Headless` Service。

```yaml
apiVersion: v1
kind: Endpoints
metadata:
  name: base-service-endpoint
subsets:
  - addresses:
      - ip: 192.168.0.1 # mysql,redis 所在集群服务的IP
    ports:
      - name: mysql
        port: 3306
      - name: redis
        port: 6379
---
apiVersion: v1
kind: Service
metadata:
  name: base-service-endpoint
spec:
  ports:
    - name: mysql
      port: 3306
    - name: redis
      port: 6379

```

创建好之后就可以直接使用 http://base-service-endpoint:6379 来直接访问 redis 了 

### 部署后端程序

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: tuchuang-admin
spec:
  selector:
    matchLabels:
      app: tuchuang-admin
  template:
    metadata:
      name: tuchuang-admin
      labels:
        app: tuchuang-admin
    spec:
      containers:
        - name: tuchuang
          image: admin-image # 自定义
          env:
            - name: REDIS_HOST
              value: base-service-endpoint
            - name: REDIS_PORT
              value: "6379"
          ports:
            - containerPort: 8868
```

这步没什么难的，主要就是 env，我将 redis 地址使用了环境变量的方式传进去，这样就不需要在代码里写死。同样的，后端是也是需要域名访问的，所以也需要配置 service 和 ingress

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: tuchuang-ingress
  annotations:
    nginx.ingress.kubernetes.io/configuration-snippet: |+
      rewrite ^/api/(.*)$ /$1 break;
spec:
  rules:
    - host: testtuchuang.top
      http:
        paths:
          - pathType: Prefix
            path: "/api"
            backend:
              service:
                name: tuchuang-admin
                port:
                  number: 8868

---
apiVersion: v1
kind: Service
metadata:
  name: tuchuang-admin
spec:
  selector:
    app: tuchuang-admin
  ports:
    - port: 8868
      targetPort: 8868
```

因为在前端调用接口，不想又跨域请求，所以请求的地址是 http://testtuchuang.top/api/[xxxxx]，但是实际上 /api 是没有任何处理的，我们需要做的就是将请求到 /api 的接口转发到 tuchuang-admin 服务。所以在 ingress 中加入了一个注解  `rewrite ^/api/(.*)$ /$1 break;` 这里意思就是将 /api 的接口转发到 tuchuang-admin 的服务，并且在转发的同时，删除 /api 这个url ，如将 `http://testtuchuang.top/api/[xxxxx]` 转换成 http://testtuchuang.top/[xxxxx]， 并由 tuchuang-admin 服务处理

### 全部 yaml

```yaml
apiVersion: v1
kind: Endpoints
metadata:
  name: base-service-endpoint
subsets:
  - addresses:
      - ip: 192.168.0.1 # mysql,redis 所在集群服务的IP
    ports:
      - name: mysql
        port: 3306
      - name: redis
        port: 6379
---
apiVersion: v1
kind: Service
metadata:
  name: base-service-endpoint
spec:
  ports:
    - name: mysql
      port: 3306
    - name: redis
      port: 6379
---
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: tuchuang-ingress
  annotations:
    nginx.ingress.kubernetes.io/configuration-snippet: |+
      rewrite ^/api/(.*)$ /$1 break;
spec:
  rules:
    - host: testtuchuang.top
      http:
        paths:
          - pathType: Prefix
            path: "/"
            backend:
              service:
                name: tuchuang-nginx
                port:
                  number: 80
          - pathType: Prefix
            path: "/api"
            backend:
              service:
                name: tuchuang-admin
                port:
                  number: 8868

---
apiVersion: v1
kind: Service
metadata:
  name: tuchuang-nginx
spec:
  selector:
    app: tuchuang-nginx
  ports:
    - port: 80
      targetPort: 80
---
apiVersion: v1
kind: Service
metadata:
  name: tuchuang-admin
spec:
  selector:
    app: tuchuang-admin
  ports:
    - port: 8868
      targetPort: 8868
---
apiVersion: v1
kind: ConfigMap
metadata:
  name: tuchuang-nginx-config
data:
  defalut.conf: |+
    server {
        listen 80;
        server_name testtuchuang.top;
        index index.html;
        root /data/test;
    }
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: tuchuang-nginx
spec:
  replicas: 1
  selector:
    matchLabels:
      app: tuchuang-nginx
  template:
    metadata:
      name: tuchuang-nginx
      labels:
        app: tuchuang-nginx
    spec:
      containers:
        - name: tuchuang-nginx
          image: nginx:1.19.6-alpine
          ports:
            - containerPort: 80
          volumeMounts:
            - mountPath: /data/
              name: web-static-file
            - mountPath: /etc/nginx/conf.d/
              name: nginx-config
      volumes:
        - name: alicloud-nas
          flexVolume:
            driver: alicloud/nas
            options:
              server: id-shenzhen.nas.aliyuncs.com
              path: /test-web
              vers: "3"
              options: nolock,tcp,noresvport
        - name: nginx-config
          configMap:
            name: tuchuang-nginx-config
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: tuchuang-admin
spec:
  selector:
    matchLabels:
      app: tuchuang-admin
  template:
    metadata:
      name: tuchuang-admin
      labels:
        app: tuchuang-admin
    spec:
      containers:
        - name: tuchuang
          image: admin-image
          env:
            - name: REDIS_HOST
              value: base-service-endpoint
            - name: REDIS_PORT
              value: "6379"
          ports:
            - containerPort: 8868
```



