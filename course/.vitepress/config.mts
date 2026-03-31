import { defineConfig } from 'vitepress'
import mathjax3 from 'markdown-it-mathjax3'
import footnote from 'markdown-it-footnote'
import container from 'markdown-it-container'
import { withMermaid } from 'vitepress-plugin-mermaid'

const mathjaxTags = [
  'mjx-container', 'mjx-assistive-mml', 'math', 'maction', 'maligngroup',
  'malignmark', 'menclose', 'merror', 'mfenced', 'mfrac', 'mi', 'mlongdiv',
  'mmultiscripts', 'mn', 'mo', 'mover', 'mpadded', 'mphantom', 'mroot',
  'mrow', 'ms', 'mscarries', 'mscarry', 'msgroup', 'mstack', 'msline',
  'mspace', 'msqrt', 'msrow', 'mstyle', 'msub', 'msup', 'msubsup',
  'mtable', 'mtd', 'mtext', 'mtr', 'munder', 'munderover', 'semantics',
  'annotation', 'annotation-xml',
]

const stripStyle = (html: string) =>
  html.replace(/<style[\s\S]*?<\/style>/g, '')

function registerContainer(
  md: any,
  name: string,
  defaultTitle: string,
  cssClass: string,
) {
  container(md, name, {
    validate: (params: string) => params.trim().match(new RegExp(`^${name}\\s*(.*)$`)),
    render: (tokens: any[], idx: number) => {
      const m = tokens[idx].info.trim().match(new RegExp(`^${name}\\s*(.*)$`))
      if (tokens[idx].nesting === 1) {
        const title = m && m[1].trim() ? m[1].trim() : defaultTitle
        return `<div class="${cssClass} custom-block"><p class="custom-block-title">${title}</p>\n`
      }
      return '</div>\n'
    },
  })
}

export default withMermaid(
  defineConfig({
    lang: 'zh-CN',
    title: '分布式世界里的程序',
    description: '从程序员日常出发的分布式系统入门教材',
    base: '/programs-in-dist/',

    markdown: {
      config: (md) => {
        md.use(mathjax3)
        md.use(footnote)

        // 剥离 mathjax style 标签
        const origInline = md.renderer.rules.math_inline!
        const origBlock = md.renderer.rules.math_block!
        md.renderer.rules.math_inline = (...args: any[]) =>
          stripStyle(origInline(...args))
        md.renderer.rules.math_block = (...args: any[]) =>
          stripStyle(origBlock(...args))

        // 脚注：去掉方括号，纯上标数字
        md.renderer.rules.footnote_ref = (tokens: any[], idx: number) => {
          const id = tokens[idx].meta.id + 1
          return `<sup class="footnote-ref"><a href="#fn${id}" id="fnref${id}">${id}</a></sup>`
        }

        // 自定义容器
        registerContainer(md, 'expand', '展开', 'expand')
        registerContainer(md, 'thinking', '思考', 'thinking')
        registerContainer(md, 'practice', '练习', 'practice')
      },
    },

    vue: {
      template: {
        compilerOptions: {
          isCustomElement: (tag: string) => mathjaxTags.includes(tag),
        },
      },
    },

    themeConfig: {
      nav: [
        { text: '首页', link: '/' },
      ],

      sidebar: [
        {
          text: '前言',
          link: '/prologue',
        },
        {
          text: '第一章：基础约束与容错',
          items: [
            { text: '01 从单机到分布式', link: '/constraints/01-from-one-to-many' },
            { text: '02 故障、超时与不确定性', link: '/constraints/02-fault-and-timeout' },
            { text: '03 消息、重试与幂等', link: '/constraints/03-message-and-retry' },
          ],
        },
        {
          text: '第二章：复制',
          items: [
            { text: '04 单主复制', link: '/replication/01-single-leader' },
            { text: '05 读一致性与故障转移', link: '/replication/02-read-consistency' },
            { text: '06 时间、因果与冲突', link: '/replication/03-time-and-conflict' },
            { text: '07 无主复制与仲裁', link: '/replication/04-leaderless' },
          ],
        },
        {
          text: '第三章：一致性与共识',
          items: [
            { text: '08 一致性模型', link: '/consistency/01-consistency-models' },
            { text: '09 共识与不可能性', link: '/consistency/02-consensus-impossibility' },
            { text: '10 Raft', link: '/consistency/03-raft' },
          ],
        },
        {
          text: '第四章：分区与事务',
          items: [
            { text: '11 分区', link: '/partitioning/01-partitioning' },
            { text: '12 分布式事务', link: '/partitioning/02-distributed-tx' },
          ],
        },
        {
          text: '项目：zraft',
          items: [
            { text: 'P1 领导者选举', link: '/zraft/01-election' },
            { text: 'P2 日志复制与安全性', link: '/zraft/02-log-replication' },
            { text: 'P3 分区 KV', link: '/zraft/03-partitioned-kv' },
          ],
        },
      ],

      outline: {
        level: [2, 3],
        label: '本页目录',
      },

      search: {
        provider: 'local',
      },

      docFooter: {
        prev: '上一篇',
        next: '下一篇',
      },
    },
  }),
)
