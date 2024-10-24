#### es搜索笔记

* 删除全部
```json
POST bank/account/_delete_by_query
{
  "query": {
        "match_all" :{}
  }
}
```


* 查询所有
```json
GET bank/_search
{
    "query": {
        "match_all" :{}
    }
}
```

* 分页查询
```json
GET bank/_search
{
    "query": {
        "match_all" :{}
    }，
    "from": 10, // 相当于 offset
    "size": 10 // 相当于 limit
}
```

* 排序
```json
GET bank/_search
{
    "query": {
        "match_all" :{}
    },
    "sort": {
        "balance": {
            "order": "desc"
        }
    }
}
```

* 选择字段返回
```json
GET bank/_search
{
    "query": {
        "match_all" :{}
    },
    "_source": [
        "name",
        "balance"
    ]
}
```
* 按条件查询 相当于like 基于分词 不区分大小写 多个搜索使用空格隔开
```json
GET bank/_search
{
    "query": {
        "match" :{
            "name": "Sutton Knox"
        }
    }
}
```
* 按条件查询 相当于like 
```json
GET bank/_search
{
    "query": {
        "match_phrase" :{
            "name": "Sutton Knox"
        }
    }
}
```
* 布尔查询 利用布尔逻辑将较小的查询组合成较大的查询
```json
GET bank/_search
{
    "query": {
        "bool": {
            "must":[ // 相当于 and
                {
                    "match":{"name": "Knox"}
                },
                {
                    "match": {"about": "dolore"}
                }
            ]
        }
    }
}
```

```json
GET bank/_search
{
    "query": {
        "bool": {
            "should":[ // 相当于 or
                {
                    "match":{"name": "Knox"}
                },
                {
                    "match": {"about": "dolore"}
                }
            ]
        }
    }
}
```

```json
GET bank/_search
{
    "query": {
        "bool": {
            "must_not":[ // 相当于 not and not
                {
                    "match":{"name": "Knox"}
                },
                {
                    "match": {"about": "dolore"}
                }
            ]
        }
    }
}
```
* 多层级 bool 操作 (and and )
```json
GET bank/_search
{
    "query": {
        "bool": {
            "must_not":[
                {
                    "match":{"name": "Knox"}
                },
                {
                    "match": {"about": "dolore"}
                }
            ],
            "must": [
                {
                    "match": {"balance": "1000"}
                }
            ]
        }
    }
}
```

