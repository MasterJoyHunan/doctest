```
! Configuration File for keepalived

global_defs {
   router_id k8s # 使用默认的即可，主从都无需修改
}

# 对应下方的 track_script 里面的值
vrrp_script check_some_software {
    script "/foo/bar/xx.sh" # 脚本路径
    interval 3 # 多少秒运行一次脚本
    weight -20 # 如果失败，权重减多少
    fall 3     # 检测几次失败才为失败，整数
    rise 2     # 检测几次状态为正常的，才确认正常，整数
}

vrrp_instance VI_1 {
    state MASTER # 使用 MASTER BACKUP
    interface ens33 # 本机网卡 主从都需修改
    virtual_router_id 51 # VIP 唯一标识 主从需一致
    priority 100 # 权重，谁设置的权重大，VIP 就漂移至那个节点
    advert_int 1 # 通告频率，单位为秒
    unicast_src_ip 172.18.153.44 # 本机IP
    unicast_peer { # 其他机器的IP
        172.18.153.46 
        172.18.153.45
    }
    authentication { # 验证机制，默认即可
        auth_type PASS
        auth_pass 1111
    }

    virtual_ipaddress {
        192.168.20.100 # VIP 的 IP
    }
    
    # 追踪脚本，通常用于去执行上面的vrrp_script定义的脚本内容
    # 用于编写脚本对业务进程进行检测监控
    # 如果脚本执行结果为0，并且weight配置的值大于0，则优先级相应的增加
    # 如果脚本执行结果非0，并且weight配置的值小于0，则优先级相应的减少
    # 优先级相对大的节点会会切换为主节点
    track_script {
		check_some_software
    }
}
```

