import { ComponentInfo } from '../domain/component-info'
// import { execCmd } from '../util/cmd-utils'
import path from 'path'
// import { globalConfig as Config } from '../..//config'
import fs from 'fs'
import { g } from '../util/log-utils'

const updateComponentLibIndex = (componentInfo: ComponentInfo) => {
  const { parentPath: libPath, upCamelName, lineName } = componentInfo
  const indexPath = path.join(libPath, 'index.ts')
  const content = fs.readFileSync(indexPath).toString()

  const index1 = content.indexOf('// import component end')
  const index2 = content.indexOf('] // components')

  const result =
    `${content.substring(0, index1)}` +
    `import ${upCamelName} from './${lineName}'\n` +
    `export * from './${lineName}'\n` +
    content.substring(index1, index2) +
    `,\n  ${upCamelName}\n` +
    content.substring(index2)

  fs.writeFileSync(indexPath, result)
}

/**
 * 更新组件库入口
 */
export const updateComponentLib = async (componentInfo: ComponentInfo) => {
  // 组件库入口的路径
  // const libPath = path.resolve(componentInfo.parentPath, Config.COMPONENTS)

  // // 1. 添加新创建的组件到依赖中
  // await execCmd(`cd ${libPath} && pnpm install ${componentInfo.nameWithLib}`)

  // 2. 更新入口 index.ts
  updateComponentLibIndex(componentInfo)

  g('component library update success')
}
