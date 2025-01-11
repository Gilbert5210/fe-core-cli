import {
  BUILD_ROOT_PATH,
  CLI_ROOT_PATH,
  complete,
  COMPONENTS_ROOT_PATH,
  delPath,
  DOC_ROOT_PATH,
  EXAMPLE_ROOT_PATH,
  ROOT_PATH,
  run,
  THEME_CHALK_ROOT_PATH,
  UTILS_ROOT_PATH,
  withTaskName
} from '../utils'
import { parallel } from 'gulp'
import path from 'path'

const ALL_PAK_PATHS = [
  COMPONENTS_ROOT_PATH,
  UTILS_ROOT_PATH,
  THEME_CHALK_ROOT_PATH,
  DOC_ROOT_PATH,
  ROOT_PATH,
  BUILD_ROOT_PATH,
  CLI_ROOT_PATH,
  EXAMPLE_ROOT_PATH
]
// 特殊文件名
const DIR_NAMES = ['esm', 'lib', 'theme-chalk']

/**
 * 删除组件库的打包产物
 */
export const removeComponentsDist = async () => {
  const paths = DIR_NAMES.map((item) => path.resolve(COMPONENTS_ROOT_PATH, item))
  await delPath(paths)
}

/**
 * 删除工具函数库的打包产物
 */
export const removeUtilsDist = async () => {
  const paths = DIR_NAMES.map((item) => path.resolve(UTILS_ROOT_PATH, item))
  await delPath(paths)
}

/**
 * 删除各个模块下dist文件
 */
export const removeDist = async () => {
  const paths = ALL_PAK_PATHS.map((item) => path.resolve(item, 'dist'))
  await delPath(paths)
  await removeComponentsDist()
  await removeUtilsDist()

  complete('removeDist')
}

/**
 * 删除各个模块下node_modules文件
 */
export const removeNodeModules = async () => {
  ALL_PAK_PATHS.forEach((path) => run('rm -rf node_modules', path))
}

/**
 * 清空dist 和 node_modules
 */
export const clear = parallel(
  withTaskName('removeDist', removeDist),
  withTaskName('removeNodeModules', removeNodeModules)
)
export default clear
