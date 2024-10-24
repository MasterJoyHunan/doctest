### curl 的使用说明-注意区分大小写

### -x

因为中国国情特殊限制，访问国外的网站需要代理(如果你有代理的话)，使用该命令可以使用当前的代理地址

`curl -x 127.0.0.1:7890 https://some.com`

`curl -x socks5://127.0.0.1:7890 https://some.com`

### -X

设置请求方法

`curl -X POST https://some.com`

`curl -X PUT https://some.com`

`curl -X DELETE https://some.com`

### -d

发送 post 请求体

`curl -d 'login=emma&password=123' -X POST https://some.com`

`curl -d 'login=emma' -d 'password=123' -X POST https://some.com`

### -H

设置请求头，多个使用多次 -H

`curl -H "token:xxxx" -H "auth:xxxx" https://some.com`

### --cacret

设置 ca 证书，https 使用 

`curl --cacret /var/somepath https://some.com`

### -v

输出调试详细信息

`curl -v https://some.com`

### -u 

设置账户密码

`curl -u 'bob:12345' https://some.com`

### -s

不是输出错误和进度信息

当不启用该参数时 `curl http://localhost:8444/api` 将会返回
```
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100    15  100    15    0     0   1363      0 --:--:-- --:--:-- --:--:--  1500simple-rc-c77pv

```

当启用 `-s` 参数是，将只返回结果 `curl -s http://localhost:8444/api`
```
imple-rc-c77pv
```