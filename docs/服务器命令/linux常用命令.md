### 设置开机启动

```sh
systemctl enable xxx.service
systemctl daemon-reload
```

### 防火墙相关

```sh
# 查看防火墙状态
systemctl status firewalld
# 开启防火墙
systemctl start firewalld
# 临时关闭防火墙
systemctl stop firewalld
# 永久关闭防火墙
systemctl disable firewalld
# 开放端口
firewall-cmd --zone=public --add-port=xxxx/tcp --permanent
firewall-cmd --reload
# 查看已开放的端口
firewall-cmd --list-ports
# 查看正在使用的端口
netstat -ntlp
# docker在关闭防火墙之后需要重启
systemctl restart docker
```

### 文件上传下载

```sh
# 安装 lrzsz
yum -y install lrzsz
# 文件下载
sz foo.bar
# 文件上传
rz
```

### 文件列表查看时间

```sh
# ls -l 查看文件更新时间
export TIME_STYLE='+%Y-%m-%d %H:%M:%S'
```

### 查看正在使用的端口

```
lsof -i 
```

### 查看文件及文件夹

```sh
du -ahd 3
-a 查看所有文件夹
-h 以 k/m/g 显示占用大小
-d 匹配要搜索的层数
```

### grep 过滤

```sh
匹配对应的条件,如果匹配到了，进行输出
some bin | grep "\.go"

匹配对应的条件，如果匹配到了，进行过滤
some bin | grep -v "_test.go"
```

### wc 查询行数

```sh
wc -l
```

### 实际案例，查找一个项目下，.go 的文件的个数，不包含 _test.go

```sh
du -ahd 3 | grep "\.go" | grep -v _test | wc -l
```

### 文件压缩

```sh
# 单文件压缩
tar -zcvf log.tar.gz somefile.log

# 对某一个类型（日志）的文件，批量压缩
find . -maxdepth 1 -name "stdout.log.2020-04-2*" -type f ! -name "*.gz" | xargs -I {} tar -zcvf {}.tar.gz {} --remove-files
find . -maxdepth 1 -name "2024*.log" -type f ! -name "*.gz" ! -name $(date "+%Y-%m-%d")* | xargs -I {} tar -zcvf {}.tar.gz {} --remove-files

```

### docker 批量删除镜像

```sh
# 批量删除镜像
docker rmi $(docker images | grep "none" | awk '{print $3}') 
# 批量删除镜像只保留某个版本
docker rmi $(docker images | grep "none" | grep -v v1. | awk '{print $3}') 

docker rmi $(docker images | grep "registry.cn-hangzhou.aliyuncs.com/tanwuyang/" | grep -v latest | awk '{print $3}') 
```
