import type { App } from 'vue'
import PAK_JSON from './package.json'
/**
 * todo: 这里的导入和导出需要放置一起，否则自动删除会出问题
 * import  from './form'
 * export * from './form'
 */
import Tooltip from './tooltip'
export * from './tooltip'

// import component end

// eslint-disable-next-line max-len
const components = [Tooltip] // components

// 全局动态添加组件
const install = (app: App): void => {
  components.forEach((component) => {
    // @ts-ignore
    app.component(component.name, component)
  })
}

export default {
  install,
  version: PAK_JSON.version
}
