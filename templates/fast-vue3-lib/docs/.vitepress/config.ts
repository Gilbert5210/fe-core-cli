import { DefaultTheme, defineConfig } from 'vitepress'
import { componentPreview, containerPreview } from '@vitepress-demo-preview/plugin'
import { sidebar } from './config/sidebar'

/**
 * 顶部菜单导航入口
 */
const nav: DefaultTheme.NavItem[] = [
  { text: '指南', link: '/guide/' },
  { text: '组件', link: '/components/' },
  { text: '工具库', link: '/utilModules/README' }
]

export default defineConfig({
  outDir: './dist',
  title: '{{libraryName}}',
  description: '{{description}}',
  ignoreDeadLinks: 'localhostLinks',
  lang: 'cn-ZH',
  lastUpdated: true,
  themeConfig: {
    search: {
      provider: 'local'
    },
    logo: '/logo.png',
    siteTitle: '{{libraryName}} {{description}}',
    outline: 3,
    socialLinks: [
      { icon: 'github', link: 'https://kdev.corp.xxx.com/git/ksg-frontend/ksg-ui/-/overview?repoId=125033' }
    ],
    nav,
    sidebar,
    footer: {
      message: '组件库开发解决方案团队.',
      copyright: 'Copyright © 2024-present'
    }
  },
  cleanUrls: false,
  markdown: {
    theme: {
      light: 'vitesse-light',
      dark: 'vitesse-dark'
    },
    lineNumbers: true,
    config(md) {
      md.use(componentPreview)
      md.use(containerPreview)
    }
  }
})
