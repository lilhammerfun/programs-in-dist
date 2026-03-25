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

      sidebar: [],

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
