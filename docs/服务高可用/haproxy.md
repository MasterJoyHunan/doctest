```
global
    log         127.0.0.1 local2
    chroot      /var/lib/haproxy
    pidfile     /var/run/haproxy.pid
    maxconn     4000
    user        haproxy
    group       haproxy
    daemon
    stats socket /var/lib/haproxy/stats

defaults
    mode                    http
    log                     global
    option                  httplog
    option                  dontlognull
    option http-server-close
    option forwardfor       except 127.0.0.0/8
    option                  redispatch
    retries                 3
    timeout http-request    10s
    timeout queue           1m
    timeout connect         10s
    timeout client          1m
    timeout server          1m
    timeout http-keep-alive 10s
    timeout check           10s
    maxconn                 3000

# 前端配置
frontend  main *:8080
    default_backend             app # 连接到哪个后端

# 后端配置
backend app
    balance     roundrobin
    server  213 192.168.20.213:80 check
    server  214 192.168.20.214:80 check

# haproxy 统计信息 复制即可
listen stats *:1250
    stats auth root:123456
    stats uri /stats
    stats refresh 30s
    stats realm Haproxy Manager

```

