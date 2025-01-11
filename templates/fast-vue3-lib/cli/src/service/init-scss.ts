import { ComponentInfo } from '../domain/component-info'
import path from 'path'
import { lessTemplate } from '../util/template-utils'
import fs from 'fs'
import { g } from '../util/log-utils'
import { THEME_CHALK_ROOT_PATH } from '@{{npmScope}}//build/utils/paths'

const updateComponentLessIndex = (scssRootPath: string, lineName: string) => {
  const indexScssPath = path.resolve(scssRootPath, 'components/index.less')

  const content = fs.readFileSync(indexScssPath).toString()
  const newContent = content.substring(0, content.length) + `\n@import "${lineName}";\n`
  fs.writeFileSync(indexScssPath, newContent)
}

/**
 * 创建组件库 less 文件，并在 scss/components/index.less 中引入该文件
 */
export const initLess = (componentInfo: ComponentInfo) =>
  new Promise((resolve) => {
    // tsx 类型需要创建scss文件
    if (componentInfo.type === 'tsx') {
      const { lineName } = componentInfo

      // 1. 创建组件的 less 文件
      const componentLessPath = path.resolve(THEME_CHALK_ROOT_PATH, `components/${lineName}.less`)
      fs.writeFileSync(componentLessPath, lessTemplate(lineName))

      // 2. 在组件库 scss 入口文件 （packages/components/index.less）引入上面创建的文件
      updateComponentLessIndex(THEME_CHALK_ROOT_PATH, lineName)

      g('component less init success')
    }
    resolve(componentInfo)
  })
