#### TCC事务

1. 获取 IP 和 雪花算法获取全局唯一 ID
2. [分布事务管理服务] 接受到事务请求时,首先会在数据库 trans_global 创建一个提交状态为 prepare 的持久化数据
3. 循环注册子事务分支
   1. [客户端]注册子事务分支,分别提供 try, confirm, cancel 接口
   2. [分布事务管理服务] 在 trans_branch 将子事务持久化为 3 条 branch_type = try / confirm / cancel 的数据
   3. [客户端]执行子事务分支 try 分支
   4. 如果无异常进行下一轮循环
   5. 如果有异常,则 abort
      1.  将 trans_global 状态修改为 aborting
      2.  调用 trans_branch 的 branch_type = cancel 保存的 url
      3.  如果调用成功 branch_type = cancel 保存的 url , 则将branch_type = cancel 状态修改为 succeed
      4.  将 trans_global 状态修改为 failed
4. 所有子事务都进行 try 了之后, [分布事务管理服务] 将 trans_global 状态修改为 submitted
5. 调用所有子事务的 confirm 分支
6. 如果所有子事务的 confirm 分支都返回成功,则将 trans_global 状态修改为 succeed

#### 成功时序图

<img src="https://dtm.pub/assets/tcc_normal.dea14fb3.jpg"  width="600" style="float:left"/>

#### 失败时序图

<img src="https://dtm.pub/assets/tcc_rollback.f28601d7.jpg"  width="600" style="float:left"/>
