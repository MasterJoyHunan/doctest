chart 代表一个 helm 的安装包
release 代表一个 chart  的实例

* 添加仓库 `helm repo add stable(自定义仓库名) https://charts.helm.sh/stable(仓库地址)`
* 查看仓库和对应的url `helm repo list`
* 删除仓库 `helm remove [repo]`
* 搜索本地可安装的 chart `helm search repo [store] [chart]`
* 搜索 hub 可安装的 chart `helm search hub [chart]`
* 升级源 `helm repo update`
* 安装 chart，并自动生成名字 `helm install [store]/[chart] --generate-name`
* 安装 chart `helm install [release] [store]/[chart]`
* 安装 chart，并设置配置文件 `helm install -f [values.yaml] [store]/[chart] --generate-name`
* 安装 chart，并通过命令行设置配置 `helm get values `
* 查看 chart `helm show chart [store]/[chart]` or `helm show all [store]/[chart]`
* 查看当前部署的所有 release `helm list`
* 查看示 Helm 保留的所有 release 记录 `helm list --all`
* 卸载一个版本 `helm uninstall [release] --keep-history`
* 查看帮助信息 `helm get -h`
* 查看 release 状态 `helm status [release]` 
* 查看 chart 中的可配置选项 `helm show values [store]/[chart]`
    * 升级 helm 或修改 release  `helm upgrade -f [values.yaml] [release] [store]/[chart]`

* 查看 release 修订版本号 `helm history [release]`
* 回滚 release 至某个版本 ` helm rollback [release] [version]`
* 删除 chart `help delete [release] [-n namespace]`

创建自己的 chart

1. 创建一套 chart 模板 `helm create [xxx-project]`
2. 在编辑的时候校验模板是否正确 `helm lint`
3. 打包分发 `helm package [xxx-project]`
4. 使用自己打包的 `helm install [release] [xxx-project.tgz]`
5. 调试使用 `helm install [release] --debug --dry-run`