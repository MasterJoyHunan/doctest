#### SAGA 事务

1. 获取 IP 和 雪花算法获取全局唯一 ID
2. 将自己的多个子事务,且每个事务对应的提交接口和回滚接口,提交给 [分布事务管理服务]
3. [分布事务管理服务] 接受到事务请求时,首先会在数据库 trans_global 创建一个提交状态为 submitted 的持久化数据
4. [分布事务管理服务] 在 trans_branch 将所有的子事务一并持久化,每个子事务分别持久化两条数据
   1. 分支类型为 action ,状态设置为 prepared , 保存 [步骤2] 的提交接口
   2. 分支类型为 compensate 状态设置为 prepared , 保存 [步骤2] 的回滚接口
5. [分布事务管理服务] 循环处理子事务类型为 [action ] 的分支,调用保存的接口,如果成功,则将该子事务状态修改为 succeed ,如果失败,则将该子事务状态修改为 failed
6. [分布事务管理服务] 循环完处理子事务类型为 [action ] 的分支之后
   1. 如果所有子事务类型为 [action ] 的分支处理的结果都为 succeed , [分布事务管理服务]会将 trans_global 的状态修改为 succeed
   2. 如果有任何一个子事务类型为 [action ] 的分支失败,则将 trans_global 的状态修改为 aborting
      1. 循环完处理子事务类型为 [compensate] 的分支,重复 [步骤5]
      2. 将 trans_global 的状态修改为 failed

#### 正常时序图

<img src="https://dtm.pub/assets/saga_normal.a2849672.jpg"  width="600" style="float:left"/>

#### 异常时序图

<img src="https://dtm.pub/assets/saga_rollback.8da8593f.jpg"  width="600" style="float:left"/>

#### SAGA 事务超时

1. 

