import { ComponentInfo } from '../domain/component-info'
import { g } from '../util/log-utils'
import path from 'path'
import fs from 'fs'
import { demoTemplate, mdTemplate, demoIndexTemplate } from '../util/template-utils'
import { DOC_ROOT_PATH } from '@{{npmScope}}//build/utils/paths'

/**
 * 创建组件文档、demo及更新菜单
 */
export const initDoc = (componentInfo: ComponentInfo) => {
  // 组件库文档根路径
  const docRootPath = DOC_ROOT_PATH

  const { lineName, lineNameWithPrefix, upCamelName, zhName } = componentInfo

  // 1. 创建组件的 MD 文档
  fs.writeFileSync(path.resolve(docRootPath, `components/comps/${lineName}.md`), mdTemplate(componentInfo))

  // 2. 创建组件文档中的 Demo
  fs.mkdirSync(path.resolve(docRootPath, `demos/${lineName}`))
  fs.writeFileSync(path.resolve(docRootPath, `demos/${lineName}/${lineName}-1.vue`), demoTemplate(lineNameWithPrefix))
  // 创建该组件的入口文件
  fs.writeFileSync(path.resolve(docRootPath, `demos/${lineName}/index.vue`), demoIndexTemplate(lineName))

  // 3. 更新组件库文档菜单
  const menuPath = path.resolve(docRootPath, 'components.ts')
  const content = fs.readFileSync(menuPath).toString()
  const index = content.indexOf('] // end')
  const result =
    content.substring(0, index) +
    `,\n  { text: '${upCamelName} ${zhName}', link: '/components/comps/${lineName}' }\n` +
    content.substring(index)
  fs.writeFileSync(menuPath, result)

  g('component document init success')
}
