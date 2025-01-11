import inquirer, { QuestionCollection } from 'inquirer'
import { COMPONENTS_ROOT_PATH, DOC_ROOT_PATH, THEME_CHALK_ROOT_PATH } from '@{{npmScope}}/build/utils'
import path from 'path'
import { convertToLine, convertToUpCamelName } from '../util/name-utils'
import { execCmd } from '../util/cmd-utils'
import fs from 'fs'

const questions: QuestionCollection = [
  {
    name: 'componentName',
    message: 'Input the component name: ',
    default: ''
  }
]

/**
 * 更新组件库入口文件
 * @param componentName
 */
const updateComponentIndex = (componentName: string) => {
  console.log('componentName', componentName)
  const lineName = convertToLine(componentName)
  const upCamelName = convertToUpCamelName(componentName)
  const libIndexPath = path.resolve(COMPONENTS_ROOT_PATH, 'index.ts')
  const content = fs.readFileSync(libIndexPath).toString()

  const regImport = new RegExp(`import ${upCamelName} from './${lineName}'\nexport \\* from '\\./${lineName}'`, 'g')

  const updateContent = content.replace(regImport, '')

  const reg2 = new RegExp(`, ${upCamelName}|${upCamelName},|${upCamelName}`, 'g')
  const result = updateContent.replace(reg2, '')

  console.log('result')
  fs.writeFileSync(libIndexPath, result)
}

/**
 * 一键移除组件 所有涉及的相关文件
 */
export const removeComponent = () => {
  inquirer.prompt(questions).then(({ componentName }) => {
    console.log('removeComponent', componentName)
    const lineName = convertToLine(componentName)

    // 1. 删除组件目录及文件
    const targetCompRoot = path.resolve(COMPONENTS_ROOT_PATH, lineName)
    execCmd(`rm -rf ${targetCompRoot}`)

    // 2. 删除样式
    const targetStyleRoot = path.resolve(THEME_CHALK_ROOT_PATH, `components/${lineName}.less`)
    execCmd(`rm -rf ${targetStyleRoot}`)

    // 3. 删除组件库入口
    updateComponentIndex(componentName)

    // 4. 组件库文档
    const compMdPath = path.resolve(DOC_ROOT_PATH, `components/comps/${lineName}.md`)
    const compDemoPath = path.resolve(DOC_ROOT_PATH, `demos/${lineName}`)

    execCmd(`rm -rf ${compMdPath} ${compDemoPath}`)
  })
}
