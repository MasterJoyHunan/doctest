import { defineConfig } from 'vitepress';

// refer https://vitepress.dev/reference/site-config for details
export default defineConfig({
    lang: 'zh-CN',
    title: '随手笔记',
    base: '/doctest/',

    themeConfig: {
        // nav: [
        //     { text: 'xfxccxx', link: '/example' },
        // ],

        sidebar: [
            {
                text: '服务器命令',
                base: '/服务器命令',
                collapsed: true,
                items: [
                    { text: 'linux常用命令', link: '/linux常用命令' },
                    { text: 'windows常用命令', link: '/windows常用命令' },
                ],
            },
            {
                text: '分布式事务',
                base: '/分布式事务',
                collapsed: true,
                items: [
                    { text: '1.分布式事务', link: '/1.分布式事务' },
                    { text: '2.SAGA', link: '/2.SAGA' },
                    { text: '3.TCC', link: '/3.TCC' },
                    { text: '4.XA', link: '/4.XA' },
                    { text: '5.二阶段提交', link: '/5.二阶段提交' },
                ],
            },
            {
                text: '服务高可用',
                base: '/服务高可用',
                collapsed: true,
                items: [
                    { text: 'haproxy', link: '/haproxy' },
                    { text: 'keepalived', link: '/keepalived' },
                ],
            },
            {
                text: 'CURL',
                link: '/curl/readme',
            },
        ],

        lastUpdated: {
            text: '最新更新时间',
            formatOptions: {
                dateStyle: 'medium',
                timeStyle: 'medium'
            }
        },
        search: {
            provider: 'local',
            options: {
                translations: {
                    button: {
                        buttonText: '搜索文档',
                        buttonAriaLabel: '搜索文档'
                    },
                    modal: {
                        noResultsText: '无法找到相关结果',
                        resetButtonTitle: '清除查询条件',
                        footer: {
                            selectText: '选择',
                            navigateText: '切换',
                            closeText: '关闭',
                        }
                    }
                }
            },

            miniSearch: {
                options: {},
                searchOptions: {}
            }
        },
        outline: {
            level: [1, 6],
            label: '页面导航'
        },
        docFooter: {
            prev: '上一篇',
            next: '下一篇'
        }
    },
    cleanUrls: true,
    lastUpdated: true,
    prev: true,
    next: true
});
