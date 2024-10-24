#### 镜像制作

最简单的镜像

```dockerfile
FROM nginx # 基于哪个镜像
RUN echo '<h1>Hello, Docker!</h1>' > /usr/share/nginx/html/index.html # 后续操作
```

后续操作
* FROM  基于某个镜像
* RUN 执行命令
* COPY <from> <to> 将本地文件复制到Doker container
