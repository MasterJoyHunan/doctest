```go
// 准备
engine.POST("/api/dtmsvr/prepare", common.WrapHandler(prepare))
// 提交
engine.POST("/api/dtmsvr/submit", common.WrapHandler(submit))
// 注册
engine.POST("/api/dtmsvr/registerXaBranch", common.WrapHandler(registerXaBranch))
// 注册
engine.POST("/api/dtmsvr/registerTccBranch", common.WrapHandler(registerTccBranch))
// 取消
engine.POST("/api/dtmsvr/abort", common.WrapHandler(abort))
// 查询
engine.GET("/api/dtmsvr/query", common.WrapHandler(query))
// 获取新的ID
engine.GET("/api/dtmsvr/newGid", common.WrapHandler(newGid))
```

```go
type TransGlobal struct {
	common.ModelBase
	Gid              string `json:"gid"`
	TransType        string `json:"trans_type"` 
	Data             string `json:"data"`
	Status           string `json:"status"`
	QueryPrepared    string `json:"query_prepared"`
	CommitTime       *time.Time
	FinishTime       *time.Time
	RollbackTime     *time.Time
	NextCronInterval int64
	NextCronTime     *time.Time
}
```

### 准备

```go
func prepare(c *gin.Context) (interface{}, error) {
	t := TransFromContext(c)
	t.Status = "prepared"
	t.saveNew(dbGet())
	return dtmcli.ResultSuccess, nil
}
```

```go
// 返回一个 TransGlobal 对象
func TransFromContext(c *gin.Context) *TransGlobal {
	data := M{}
	b, err := c.GetRawData()
	e2p(err)
	dtmcli.MustUnmarshal(b, &data)
	dtmcli.Logf("creating trans in prepare")
	if data["steps"] != nil {
		data["data"] = dtmcli.MustMarshalString(data["steps"])
	}
	m := TransGlobal{}
	dtmcli.MustRemarshal(data, &m)
	return &m
}
```

```go
func (t *TransGlobal) saveNew(db *common.DB) {
	if t.Gid == "" {
		t.Gid = GenGid()
	}
	err := db.Transaction(func(db1 *gorm.DB) error {
		db := &common.DB{DB: db1}
		updates := t.setNextCron(config.TransCronInterval)
		writeTransLog(t.Gid, "create trans", t.Status, "", t.Data)
		dbr := db.Must().Clauses(clause.OnConflict{
			DoNothing: true,
		}).Create(t)
		if dbr.RowsAffected > 0 { // 如果这个是新事务，保存所有的分支
			branches := t.getProcessor().GenBranches()
			if len(branches) > 0 {
				writeTransLog(t.Gid, "save branches", t.Status, "", dtmcli.MustMarshalString(branches))
				db.Must().Clauses(clause.OnConflict{
					DoNothing: true,
				}).Create(&branches)
			}
		} else if dbr.RowsAffected == 0 && t.Status == "submitted" { // 如果数据库已经存放了prepared的事务，则修改状态
			dbr = db.Must().Model(t).Where("gid=? and status=?", t.Gid, "prepared").Select(append(updates, "status")).Updates(t)
		}
		return nil
	})
	e2p(err)
}
```

总而言之, 插入 trans_global 表一条数据, trans_branch 表多条数据

* xa 全局事务 - trans_branch 表不生成数据
* tcc 同上
* msg 全局事务 - 根据 data 生产多条数据 插入 trans_branch  表
* saga 同上

### 提交

```go
func submit(c *gin.Context) (interface{}, error) {
	db := dbGet()
    // 返回 TransGlobal 对象
	t := TransFromContext(c)
    // 根据 gid 数据库 TransGlobal 表获取数据
	dbt := TransFromDb(db, t.Gid)
	if dbt != nil && dbt.Status != "prepared" && dbt.Status != "submitted" {
		return M{"dtm_result": "FAILURE", "message": fmt.Sprintf("current status %s, cannot sumbmit", dbt.Status)}, nil
	}
	t.Status = "submitted"
	t.saveNew(db)
	return t.Process(db, c.Query("wait_result") == "true" || c.Query("wait_result") == "1"), nil
}
```

```go
// 数据库获取数据
func TransFromDb(db *common.DB, gid string) *TransGlobal {
	m := TransGlobal{}
	dbr := db.Must().Model(&m).Where("gid=?", gid).First(&m)
	if dbr.Error == gorm.ErrRecordNotFound {
		return nil
	}
	e2p(dbr.Error)
	return &m
}
```

```go
// 看是否需要等待
func (t *TransGlobal) Process(db *common.DB, waitResult bool) dtmcli.M {
	if !waitResult {
		go t.processInner(db)
		return dtmcli.ResultSuccess
	}
	submitting := t.Status == "submitted"
	err := t.processInner(db)
	if err != nil {
		return dtmcli.M{"dtm_result": "FAILURE", "message": err.Error()}
	}
	if submitting && t.Status != "succeed" {
		return dtmcli.M{"dtm_result": "FAILURE", "message": "trans failed by user"}
	}
	return dtmcli.ResultSuccess
}
```