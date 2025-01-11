import { dest, parallel, series, src } from 'gulp'
import replace from 'gulp-replace'
import buildModule from '../task/buildModule'
import { complete, DOC_ROOT_PATH, run, UTILS_ROOT_PATH, withTaskName } from '../utils'
import { removeUtilsDist } from '@{{npmScope}}/build/src/clear'
import path from 'path'
import rename from 'gulp-rename'

/**
 * 删除缓存数据 dist
 */
const removeDist = async () => {
  await removeUtilsDist()

  complete('removeDist')
}

/**
 * 工具函数的打包
 */
const utilModuleBuild = async () => {
  await buildModule('utils')
}

/**
 * 构建输出最新的文档
 */
const utilModuleBuildDocs = async () => {
  await run('pnpm run -C packages/utils doc')
}

const copyUtilsDocs = () => {
  return src(path.resolve(UTILS_ROOT_PATH, './CHANGELOG.md'))
    .pipe(replace('##', '###'))
    .pipe(
      rename((path) => {
        path.basename = 'index'
      })
    )
    .pipe(dest(path.resolve(DOC_ROOT_PATH, './utilModules')))
}

export const buildUtil = series(
  withTaskName('removeUtilsDist', removeDist),
  parallel(withTaskName('utilModuleBuild', utilModuleBuild), withTaskName('utilModuleBuildDocs', utilModuleBuildDocs)),
  withTaskName('copyUtilsDocs', copyUtilsDocs)
)

export default buildUtil
