#### 可以用纯粹的uri来执行查询

|     Name |     Description |
| :--: | :--: |
|      |      |
|      |      |
|      |      |
| | |

Name	Description
q	表示查询字符串
df	在查询中，当没有定义字段的前缀的情况下的默认字段前缀
analyzer	当分析查询字符串时，分析器的名字
default_operator	被用到的默认操作，有AND和OR两种，默认是OR
explain	对于每一个命中(hit)，对怎样得到命中得分的计算给出一个解释
_source	将其设置为false，查询就会放弃检索_source字段。你也可以通过设置_source_include和_source_exclude检索部分文档
fields	命中的文档返回的字段
sort	排序执行。可以以fieldName、fieldName:asc或者fieldName:desc的格式设置。fieldName既可以是存在的字段，也可以是_score字段。可以有多个sort参数
track_scores	当排序的时候，将其设置为true，可以返回相关度得分
timeout	默认没有timeout
from	默认是0
size	默认是10
search_type	搜索操作执行的类型，有dfs_query_then_fetch, dfs_query_and_fetch, query_then_fetch, query_and_fetch, count, scan几种，默认是query_then_fetch
lowercase_expanded_terms	terms是否自动小写，默认是true
analyze_wildcard	是否分配通配符和前缀查询，默认是false
terminate_after	The maximum number of documents to collect for each shard, upon reaching which the query execution will terminate early. If set, the response will have a boolean field terminated_early to indicate whether the query execution has actually terminated_early. Defaults to no terminate_after.