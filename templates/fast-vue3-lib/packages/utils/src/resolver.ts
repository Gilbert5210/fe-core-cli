/**
 * @author Gilbert
 * @Description: unPlugin-vue-components 按需加载解析器
 * @date 31.05.2023
 */

import type { ComponentResolver, SideEffectsInfo } from 'unplugin-vue-components/types'
import { GLOBAL_CONFIG } from '@{{npmScope}}/build/globalConfig'
import { firstLetterToLowerCase, kebabCase } from './string'

// const packageName = '@ksg/components'
const packageName = `${GLOBAL_CONFIG.NPM_SCOPE}/${GLOBAL_CONFIG.COMPONENTS}`

export interface KsgComponentsResolverOptions {
  /**
   * exclude components that do not require automatic import
   * 这个传参数为全部小写即可
   * 比如：ksg-test  ===>> ['ksgtest']
   * @default []
   */
  exclude?: string[]

  // 执行加载 css 还是 less，默认加载 css
  importStyle?: boolean | 'css' | 'less'
}

/**
 * 动态解析css路径
 * @param compName
 * @param options
 * @return 返回转化后的字符串
 * @example
 * ``` typescript
 * getSideEffects('table')
 * => '@ksg/components/theme-chalk/ksg-table.css'
 * => '@ksg/components/theme-chalk/src/components/ksg-table.less'
 * ```
 */
function getSideEffects(compName: string, options: KsgComponentsResolverOptions = {}): SideEffectsInfo {
  // 是否加载
  const { importStyle = true } = options
  if (!importStyle) {
    return
  }

  const kebabCaseName = kebabCase(compName)
  const dirName = `${GLOBAL_CONFIG.COMPONENT_PREFIX}-${kebabCaseName}`

  if (importStyle === 'less') {
    return `${packageName}/${GLOBAL_CONFIG.THEME_NAME}/src/components/${kebabCaseName}.less`
  }

  return `${packageName}/${GLOBAL_CONFIG.THEME_NAME}/${dirName}.css`
}

/**
 * ksgUI的解析器，动态解析组件和样式
 * @param options
 * @return 返回配置 ComponentResolver
 * @example
 * ``` typescript
 * import Components from 'unplugin-vue-components/vite'
 * import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
 * import { KsgUIResolver } from '@ksg/utils/lib/resolver'
 *
 * export const AutoRegistryComponents = () => {
 *   return Components({
 *      // 自定义组件的解析器
 *     resolvers: [
 *       AntDesignVueResolver({
 *         resolveIcons: true // 导入antd 内置的icon
 *       }),
 *       KsgUIResolver()
 *     ]
 *   })
 * ```
 */
export function KsgUIResolver(options?: KsgComponentsResolverOptions): ComponentResolver {
  return {
    type: 'component',
    resolve: (compName: string) => {
      const name = compName.toLowerCase()
      if (name.startsWith(GLOBAL_CONFIG.COMPONENT_PREFIX) && !options?.exclude?.includes(name)) {
        const importName = firstLetterToLowerCase(compName.slice(3))
        return {
          name: compName,
          from: packageName,
          sideEffects: getSideEffects(importName, options)
        }
      }
    }
  }
}
