import { defineConfig } from 'vitepress'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "xhsndl 前端库",
  description: "基于VitePress",
  // head: [['link', { rel: 'icon', href: '/favicon.ico' }]],
  themeConfig: {
    // aside: false,
    logo:'../cat.png',
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '后台系统模板', link: '/system/normal/conditionTemplate' },
      {
        text: '选择库类型',
        items: [
          { text: 'H5模板库', link: '/systemH5/normal/dynamicTemplate' },
          { text: '功能库', link: '/function/normal/apiTemplate' },
        ]
      },
      { text: '低代码平台', link: '/design/normal/pageOne' },
      { text: '关于', link: '/about/normal/introduce' },
    ],
    search: {
      provider: 'local',
      options: {
        locales: {
          zh: {
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
                  navigateText: '切换'
                }
              }
            }
          }
        }
      }
    },
    sidebar: {
      '/system/':[
        {
          text: '后台系统模板',
          items: [
            { text: '条件筛选模板', link: '/system/normal/conditionTemplate' },
            { text: '基础创建模板', link: '/system/normal/createTemplate' },
            { text: '试卷创建模板', link: '/system/normal/createExamTemplate' },
          ]
        },
        {
          text: '模态框界面',
          items: [
            { text: '表格筛选模态框', link: '/system/modal/table' },
            { text: '分级筛选模态框', link: '/system/modal/select' },
          ]
        },
        {
          text: '自定义组件',
          items: [
            { text: '省市区选择器', link: '/system/component/area' },
          ]
        },
        {
          text: '高级后台系统模板',
          items: [
            { text: '条件筛选模板', link: '/system/advanced/conditionTemplate' },
          ]
        },
      ],
      '/systemH5/':[
        {
          text: 'H5模板',
          items: [
            { text: '动态显示模板', link: '/systemH5/normal/dynamicTemplate' },
          ]
        }
      ],
      '/function/':[
        {
          text: '基本功能库',
          items: [
            { text: '接口模板', link: '/function/normal/apiTemplate' },
            { text: '本地存储模板', link: '/function/normal/storeTemplate' },
          ]
        },
        {
          text: '高级功能库',
          items: [
            { text: '扫码识别', link: '/function/advance/scanTemplate' },
          ]
        },
      ],
      '/about/':[
        {
          text: '关于',
          items: [
            { text: '项目介绍', link: '/about/normal/introduce' },
            { text: '低代码平台', link: '/about/normal/lowCodeFont' },
          ]
        },
      ],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/BocaiheDabaicai/module_grages' }
    ],
    footer: {
      message: '邮箱：54572905@qq.com | 仓库：https://github.com/BocaiheDabaicai/module_grages',
      copyright: '"The only way to do great work is to love what you do." — Steve Jobs'
    },
    lastUpdated: {
      text: '最后更新于',
      formatOptions: {
        dateStyle: 'full',
        timeStyle: 'medium'
      }
    },
  },
  vite:{
    plugins:[
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
    ],
    ssr: {
      // 关键：告诉 Vite 在 SSR（静态生成）构建时，不要将 CSS 文件外部化。
      // 这样 CSS 会被打包进构建产物，而不是被 Node.js 直接导入。
      noExternal: ['element-plus']
    },
  },
})
