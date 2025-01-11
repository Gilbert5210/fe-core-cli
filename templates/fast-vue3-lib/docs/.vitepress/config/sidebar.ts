/*
 * @Description: 侧边栏配置
 */
import * as path from 'path'
// @ts-ignore
import glob from 'fast-glob'
import { components } from '../../components'
import { DefaultTheme } from 'vitepress'

const basePath = path.resolve(__dirname, '../../components/comps')
// const pageBasePath = path.resolve(__dirname, '../../components/pages')

// 生成组件文档链接
const excludeFiles = (files: string[]) => {
  // 过滤特殊的md
  const excludes = ['faq', 'index']
  return files.filter((path) => !excludes.some((exclude) => path.includes(exclude)))
}
const componentDocs = glob.sync('**/*.md', {
  cwd: basePath,
  absolute: true,
  onlyFiles: true
})

// const pageDocs = glob.sync('**/*.md', {
//   cwd: pageBasePath,
//   absolute: true,
//   onlyFiles: true
// })

const zhComponentDocs = excludeFiles(componentDocs).map((it) => {
  const name = path.basename(it)
  const key = name.split('.')[0]
  const link = `/components/comps/${key}`
  const text = components.find((item) => item.link === link)?.text || key

  return {
    text,
    link
  }
})

// const zhPageDocs = excludeFiles(pageDocs).map((it) => {
//   const name = path.basename(it)
//   const key = name.split('.')[0]
//   return {
//     text: key,
//     link: `/components/pages/${key}`
//   }
// })

const getSidebars = (): DefaultTheme.Sidebar => {
  return {
    '/components/': [
      {
        text: '使用',
        collapsed: false,
        items: [
          {
            text: '快速开始',
            link: '/components/'
          },
          {
            text: '更新日志',
            link: '/components/log'
          },
          {
            text: '常见问题',
            link: '/components/faq'
          }
        ]
      },
      {
        text: '组件',
        items: zhComponentDocs
      }
      // {
      //   text: '页面',
      //   items: [...zhPageDocs]
      // }
    ],
    '/guide': [
      {
        text: '新人必读',
        collapsed: false,
        items: [
          {
            text: '快速开始',
            link: '/guide/'
          },
          {
            text: '开发流程',
            link: '/guide/process'
          }
        ]
      }
    ],
    '/utilModules': [
      {
        text: '工具库',
        items: [
          { text: '快速开始', link: '/utilModules/README' },
          { text: '更新日志', link: '/utilModules/' },
          { text: 'modules', link: '/utilModules/modules' }
        ]
      }
    ]
  }
}

export const sidebar = getSidebars()
