import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import routes from 'virtual:generated-pages'

const router = createRouter({
  history: createWebHashHistory(),
  routes
})
// import antdUI from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'

// 使用打包后的文件
// import KsgUI from '@ksg/components'
// import '@ksg/components/theme-chalk/index.css'

// todo: 实时响应的文件引用方式,但是整个项目会失去热更新的机制
import KsgUI from '@{{npmScope}}/components/index'
import '../../packages/theme-chalk/components/index.less'

import { createFromIconfontCN } from '@ant-design/icons-vue'

const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/c/font_3217625_t80kmopplwr.js' // 在 iconfont.cn 上生成
})

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const env = import.meta.env
console.log('环境变量', env)

const app = createApp(App)
// app.use(antdUI)

app.use(router).use(KsgUI).component('IconFont', IconFont).mount('#app')
