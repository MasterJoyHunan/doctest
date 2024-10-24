## 重置标签

教程：https://blog.csdn.net/qq_42883074/article/details/115894190

### 标签选择

```yaml
relabel_configs:
  - source_labels: # 对源标签做操作
  	  - team
  	regex: joy # 正则表达式(全限定)
  	action: keep # 操作
  	target_label: belones # 将源标签转换为自定义标签
  	replacement: no1 # 将源内容转换为自定内容
```

action: 操作
* keep : labels 中含有 source_labels 定义的目标，如果多个，则需要并且
* drop:  labels 中不含有 source_labels 定义的目标
* replace: 替换，配合 replacement、target_label 使用，将目标 labels 替换成自定义 labels ，且可以将 目标 labels 的值替换成自定义内容
* labelmap 重新修改标签名

source_labels：对目标中 labels 含有 source_labels 中定义的目标，可以多个 ``
* 配合 action: keep 
  * regex: foo -- source_labels 值等于 foo 的
  * regex: foo|bar -- source_labels 值等于 foo 或 bar 的
  * regex: foo;bar -- source_labels 第一个值等于 foo 并且，第二个值等于 bar 的
  * regex: 可以使用正则表达式匹配

* 配合 action: drop
  * regex: foo -- source_labels 值不等于 foo 的
  * regex: foo|bar -- source_labels 值不等于 foo 或 bar 的
  * regex: foo;bar -- source_labels 第一个值不等于 foo 并且，第二个值不等于 bar 的
  * regex: 可以使用正则表达式匹配

​	

wmm0iqKQAAJ3e624FigLUm-4FZhWjgNA
