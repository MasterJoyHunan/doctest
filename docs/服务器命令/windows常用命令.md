### 清空 windows dns 缓存
```
ipconfig /flushdns
```

### WINDOWS命令行关闭本地占用的端口
```
netstat  -aon|findstr  "8080"  
taskkill /pid xxx /f
```

