#### XA事务

```sql
XA start '4fPqCNTYeSG'
UPDATE `user_account` SET `balance`=balance + 30,`update_time`='2021-06-09 11:50:42.438' WHERE user_id = '1'
XA end '4fPqCNTYeSG'

-- (一阶段)执行
XA prepare '4fPqCNTYeSG'

-- (二阶段)当所有的参与者完成了prepare，就提交
xa commit '4fPqCNTYeSG'

-- (二阶段)当有任一的参与者 faild，就回滚
xa rollback '4fPqCNTYeSG'

-- 可以查看本地所有 prepare 状态的 xa 事务
xa recover 
```



1. 获取 IP 和 雪花算法获取全局唯一 ID
2. *一阶段*
   1.  [分布事务管理服务] 接受到事务请求时,首先会在数据库 trans_global 创建一个提交状态为 prepared 的持久化数据
   2. 主程序调用多个子事务 (接口/微服务)
      1. 每个子事务都会在本地建立一个新的数据库连接,且顺序执行
         1.  `xa start 'gid'``
         2. ``update/delete 业务逻辑` 
         3.  [分布事务管理服务] 将会在 trans_branch 插入一条 branch_type = commit 和一条 rollback , state = prepare 的数据,持久化记录子事务当前状态
         4.  `xa end 'gid'` 
         5.  `xa prepare 'gid'`
      2. 关闭数据库连接
3. *二阶段*
    1.  如果所有子事务没有返回异常
       1.  将 trans_global 状态修改为 submitted
       2.  将 trans_branch 的 branch_type = commit 状态修改为 succeed
       3.  请求 trans_branch  保存的 url ,子事务提交自己事务 *`xa submmit 'gid'`*
       4.  将 trans_global 状态修改为 succeed
    2.  如果有任一子事务发生异常
        1.  将 trans_global 状态修改为 aborting
        2.  将 trans_branch 的 branch_type = rollback 状态修改为 succeed
        3.  请求 trans_branch  保存的 url ,子事务提交自己事务 *`xa rollback 'gid'`*
        4.  将 trans_global 状态修改为 failed

#### 成功时序图

<img src="http://tc.masterjoy.top/typory/xa_normal.5a0ce600.jpg"  width="600" style="float:left"/>

#### 失败时序图

<img src="http://tc.masterjoy.top/typory/xa_rollback.dccc3558.jpg"  width="600" style="float:left"/>

