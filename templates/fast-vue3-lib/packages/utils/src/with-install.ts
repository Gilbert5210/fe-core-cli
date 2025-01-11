/**
 * @author Gilbert
 * @Description: ksg-ui组件库按需加载的解析器
 * @date 31.05.2023
 */

import type { App, Plugin } from 'vue'
export type SFCWithInstall<T> = T & Plugin

/**
 * 给组件实例增加 install属性，解决Vue.use报类型异常的问题
 * @param comp vue组件实例
 */
export const withInstall = <T>(comp: T) => {
  ;(comp as SFCWithInstall<T>).install = (app: App) => {
    // 当组件是 script setup 的形式时，会自动以为文件名注册，会挂载到组件的__name 属性上
    // 所以要加上这个条件
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const name = (comp as any).name || (comp as any).__name
    //注册组件
    app.component(name, comp as SFCWithInstall<T>)
  }
  return comp as SFCWithInstall<T>
}

export default withInstall
