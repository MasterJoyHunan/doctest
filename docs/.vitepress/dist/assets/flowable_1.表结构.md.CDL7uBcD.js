import{_ as i,c as e,a2 as a,o as p}from"./chunks/framework.DPuwY6B9.js";const C=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"flowable/1.表结构.md","filePath":"flowable/1.表结构.md","lastUpdated":1729761429000}'),_={name:"flowable/1.表结构.md"};function t(o,l,r,T,n,A){return p(),e("div",null,l[0]||(l[0]=[a('<p><a href="https://blog.51cto.com/u_14318784/3240951" target="_blank" rel="noreferrer">参考</a></p><h3 id="flowable数据库表命名规则" tabindex="-1">Flowable数据库表命名规则 <a class="header-anchor" href="#flowable数据库表命名规则" aria-label="Permalink to &quot;Flowable数据库表命名规则&quot;">​</a></h3><ul><li>ACT_RE_* <ul><li><code>RE</code>表示repository（存储）。RepositoryService接口操作的表。带此前缀的表包含的是静态信息，如，流程定义，流程的资源（图片，规则等）。</li></ul></li></ul><p>ACT_RU_*</p><ul><li><code>RU</code>表示runtime。这是运行时的表存储着流程变量，用户任务，变量，职责（job）等运行时的数据。flowable只存储实例执行期间的运行时数据，当流程实例结束时，将删除这些记录。这就保证了这些运行时的表小且快。</li></ul><p>ACT_ID_*</p><ul><li><code>ID</code>表示identity(组织机构)。这些表包含标识的信息，如用户，用户组，等等。</li></ul><p>ACT_HI_*</p><ul><li><code>HI</code>表示history。就是这些表包含着历史的相关数据，如结束的流程实例，变量，任务，等等。</li></ul><p>ACT_GE_* 普通数据，各种情况都使用的数据。</p><h3 id="通用数据库-2" tabindex="-1">通用数据库(2) <a class="header-anchor" href="#通用数据库-2" aria-label="Permalink to &quot;通用数据库(2)&quot;">​</a></h3><ul><li><p>ACT_GE_BYTEARRAY 资源表(存储流程定义相关的资源)--ByteArrayEntityImpl</p></li><li><p>ACT_GE_PROPERTY 属性表(保存流程引擎的kv键值属性)--PropertyEntityImpl</p></li></ul><h3 id="流程定义表-4" tabindex="-1">流程定义表(4) <a class="header-anchor" href="#流程定义表-4" aria-label="Permalink to &quot;流程定义表(4)&quot;">​</a></h3><ul><li><p>ACT_RE_DEPLOYMENT 流程部署表--DeploymentEntityImpl</p></li><li><p>ACT_PROCDEF_INFO 流程定义动态改变信息表--ProcessDefinitionInfoEntityImpl</p></li><li><p>ACT_RE_MODEL 模型信息表(用于Web设计器)--ModelEntityImpl</p></li><li><p>ACT_RE_PROCDEF 流程定义信息表--ProcessDefinitionEntityImpl</p></li></ul><h3 id="流程历史记录-8" tabindex="-1">流程历史记录(8) <a class="header-anchor" href="#流程历史记录-8" aria-label="Permalink to &quot;流程历史记录(8)&quot;">​</a></h3><ul><li><p>ACT_HI_ACTINST 历史的流程实例</p></li><li><p>ACT_HI_ATTACHMENT 历史的流程附件</p></li><li><p>ACT_HI_COMMENT 历史的说明性信息</p></li><li><p>ACT_HI_DETAIL 历史的流程运行中的细节信息</p></li><li><p>ACT_HI_IDENTITYLINK 历史的流程运行过程中用户关系</p></li><li><p>ACT_HI_PROCINST 历史的流程实例</p></li><li><p>ACT_HI_TASKINST 历史的任务实例</p></li><li><p>ACT_HI_VARINST 历史的流程运行中的变量信息</p></li></ul><h3 id="用户用户组表-9" tabindex="-1">用户用户组表(9) <a class="header-anchor" href="#用户用户组表-9" aria-label="Permalink to &quot;用户用户组表(9)&quot;">​</a></h3><ul><li><p>ACT_ID_USER 用户基本信息表--UserEntityImpl</p></li><li><p>ACT_ID_GROUP 用户组信息表</p></li><li><p>ACT_ID_INFO 用户扩展表--IdentityInfoEntityImpl</p></li><li><p>ACT_ID_BYTEARRAY 二进制数据表</p></li><li><p>ACT_ID_MEMBERSHIP 人与组关系表</p></li><li><p>ACT_ID_PRIV 权限表</p></li><li><p>ACT_ID_PRIV_MAPPING 用户或组权限关系表</p></li><li><p>ACT_ID_PROPERTY 属性表(flowable)--</p></li><li><p>ACT_ID_TOKEN 系统登录日志表(flowable)--</p></li></ul><h3 id="运行实例表-10" tabindex="-1">运行实例表(10) <a class="header-anchor" href="#运行实例表-10" aria-label="Permalink to &quot;运行实例表(10)&quot;">​</a></h3><ul><li><p>ACT_RU_DEADLETTER_JOB 正在运行的任务表</p></li><li><p>ACT_RU_EVENT_SUBSCR 运行时事件</p></li><li><p>ACT_RU_EXECUTION 运行时流程执行实例</p></li><li><p>ACT_RU_HISTORY_JOB 历史作业表</p></li><li><p>ACT_RU_IDENTITYLINK 运行时用户关系信息</p></li><li><p>ACT_RU_JOB 运行时作业表</p></li><li><p>ACT_RU_SUSPENDED_JOB 暂停作业表</p></li><li><p>ACT_RU_TASK 运行时任务表</p></li><li><p>ACT_RU_TIMER_JOB 定时作业表</p></li><li><p>ACT_RU_VARIABLE 运行时变量表</p></li></ul><h3 id="其他表-2" tabindex="-1">其他表(2) <a class="header-anchor" href="#其他表-2" aria-label="Permalink to &quot;其他表(2)&quot;">​</a></h3><ul><li><p>ACT_EVT_LOG 事件日志表</p></li><li><p>ACT_PROCDEF_INFO 流程定义信息</p></li></ul>',22)]))}const E=i(_,[["render",t]]);export{C as __pageData,E as default};
