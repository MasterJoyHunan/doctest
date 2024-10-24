#### 以下内容仅适合 es7.x
因业务需要，在 es 某个 index 的字段修改为中文搜索。顺其自然的想到了 ik 分词器，至于 ik 分词器怎么安装，配置之类，百度就好了，这里暂且不表，本文只想写修改 mapping 遇到的坑。

##### 创建一个新的 index
因为之前在某个 index 已经设置好了 mapping，es 是不允许修改设置好的 mapping 字段。不要做无谓的挣扎，百度谷歌也没用，请直接另外新建一个 index 吧。如下：
```json
PUT other_index
{
	"mappings" : {
		"properties": {
			"title" : {
				"type": "text",
				"analyzer": "ik_smart", // 简易使用 smart 分词器，ik_max_word 分词将会占用很大的空间
				"fields": {
					"keyword": {
						"type": "keyword",
						"ignore_above": 256
					}
				}
			},
			... // 更多字段
		}
	}
}
```

需要注意的地方，es 7.x 不再支持设置 mapping 的时候定义 type ，所以如下的输入会出现错误（在6.x可行）
```json
PUT other_index
{
	"mappings" : {
		"smoe_type": { // 这个 type 需要省略了 
            "properties": {
                "title" : {
                    "type": "text",
                    "analyzer": "ik_smart", // 简易使用 smart 分词器，ik_max_word 分词将会占用很大的空间
                    "fields": {
                        "keyword": {
                            "type": "keyword",
                            "ignore_above": 256
                        }
                    }
                },
                ... // 更多字段
            }
		}
	}
}
```

> 时代在进步，8.0将完全抛弃 type，接受它，以后定义 index 不要在设置 type 了 

##### 将老数据迁移到新的 index
数据迁移没什么可说的，没有多少数据的时候迁移还是很快的，但是随着时间的增长，数据越来越多，到时候可以设置一些参数，加快其速度，这里暂不展示，仅展示其简单用法
```json
POST _reindex
{
	"source": {
		"index": "old_index"
	},
	"dest": {
		"index": "new_index"
	}
}
// 将 source 下的 index 数据复制一份到 dest 的 index
```
对应的 index 下的 type 迁移？想多了，7.x 没这个功能了。在 6.x 及以前你可能需要这样
```json
POST _reindex
{
	"source": {
		"index": "old_index",
		"type": "some type" // 关键位置
	},
	"dest": {
		"index": "new_index",
		"type": "some_tpyessssss" // 关键位置
	}
}
```
##### 加别名
以上准好了 mapping 和数据之后，如果你以前的直接搜索 index 而不是使用别名的话，以上操作除了占用的你的内存，硬盘空间，恐怕什么也没改变，如果需要使用我们上面添加了分词器的 index 的话，你还得修改代码。或者也可以将删除 old_index 然后将 再重新创建一个 old_index, 再将 new_index 里的数据同步到 old_index。显然这个一件麻烦事

所以在开始构思使用 es 的时候，就需要想到使用别名来操作 index 是非常必要的。因为对别名进行增删改查，就相当于对某个 index 进行增删改查，对以后 mapping 的变更是非常方便。因为仅修改别名的指向，而无需停机，无需修改代码。

下面讲讲如何创建别名，设置别名的指向
```json
POST _aliases
{
	"actions": [
		{
			"add": { // 添加别名
				"index": "some_index", // 需要对哪个 index 进行操作
                "alias": "ali_index"   // 设置该 index 的别名为 ali_index
            }
       },
       {
			"remove": { // 删除别名
				"index": "some_index", // 需要对哪个 index 进行操作
                "alias": "ali_index"   // 删除该 index 的别名 ali_index
            }
       },
	]
}
```
##### 总结
1. 对可能会变频变动 mapping 结构的 index 使用别名是非常棒的设计
2. 不要再使用 type 了，官方明确的说明会将这玩意给删掉
3. 多看文档，多谷歌，有时候在低版本能用的设置，在高版本将无法使用

