import DefaultTheme from 'vitepress/theme'
import { AntDesignContainer } from '@vitepress-demo-preview/component'
import '@vitepress-demo-preview/component/dist/style.css'
import type { EnhanceAppContext } from 'vitepress'
import 'virtual:windi.css'
// 自定义docs文档的布局，全屏展示所有内容
import './custom.less'
import antdUI from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import '@{{npmScope}}/components/theme-chalk/index.css'

import { createFromIconfontCN } from '@ant-design/icons-vue'

const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/c/font_3217625_t80kmopplwr.js' // 在 iconfont.cn 上生成
})

export default {
  ...DefaultTheme,
  async enhanceApp(ctx: EnhanceAppContext) {
    // @ts-ignore
    ctx.app.use(antdUI)
    // @ts-ignore
    if (!import.meta.env.SSR) {
      const KsgUI = await import('@{{npmScope}}/components')
      // @ts-ignore
      ctx.app.use(KsgUI.default)
    }
    // @ts-ignore
    ctx.app.component('IconFont', IconFont)
    ctx.app.component('demo-preview', AntDesignContainer)
  }
}
