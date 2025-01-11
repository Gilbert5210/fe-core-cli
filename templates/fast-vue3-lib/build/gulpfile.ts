import { src, series, parallel, dest } from 'gulp'
import path from 'path'
import {
  complete,
  delPath,
  withTaskName,
  THEME_CHALK_ROOT_PATH,
  run,
  DOC_ROOT_PATH,
  ROOT_PATH,
  COMPONENTS_ROOT_PATH
} from './utils'
import onBuildStyle from './src/buildStyle'
import { removeComponentsDist } from './src/clear'
import replace from 'gulp-replace'
import rename from 'gulp-rename'
/**
 * 删除各个模块下dist文件
 */
export const removeDist = async () => {
  const paths = [THEME_CHALK_ROOT_PATH].map((item) => path.resolve(item, 'dist'))
  await delPath(paths)
  await removeComponentsDist()

  complete('removeDist')
}

/**
 * 打包样式文件
 */
export const buildStyle = async () => {
  onBuildStyle(() => {
    complete('buildStyle')
  })
}

/**
 * 打包前端组件
 */
export const buildComponent = async () => {
  await run('pnpm run -C packages/components build')

  complete('buildComponent')
}

// /**
//  * 打包工具函数
//  */
// export const buildUtil = async () => {
//   onBuildUtil(() => {
//     complete('buildUtil')
//   })
// }

/**
 * 复制最新的更新日志信息
 */
const copyCompChangeLogDocs = () => {
  return src(path.resolve(COMPONENTS_ROOT_PATH, './CHANGELOG.md'))
    .pipe(replace('##', '###'))
    .pipe(
      rename((path) => {
        path.basename = 'log'
      })
    )
    .pipe(dest(path.resolve(DOC_ROOT_PATH, './components')))
}

/**
 * 复制最新的更新日志信息
 */
const copyCompReadmeDocs = () => {
  return src(path.resolve(COMPONENTS_ROOT_PATH, './README.md'))
    .pipe(
      rename((path) => {
        path.basename = 'index'
      })
    )
    .pipe(dest(path.resolve(DOC_ROOT_PATH, './components')))
}

/**
 * 复制根目录的README，到指南文件的index
 */
const copyRootReadmeDocs = () => {
  return src(path.resolve(ROOT_PATH, './README.md'))
    .pipe(replace('##', '###'))
    .pipe(
      rename((path) => {
        path.basename = 'index'
      })
    )
    .pipe(dest(path.resolve(DOC_ROOT_PATH, './guide')))
}

export default series(
  withTaskName('removeDist', removeDist),
  parallel(withTaskName('buildStyle', buildStyle), withTaskName('buildComponent', buildComponent)),
  withTaskName('copyCompChangeLogDocs', copyCompChangeLogDocs),
  withTaskName('copyCompReadmeDocs', copyCompReadmeDocs),
  withTaskName('copyRootReadmeDocs', copyRootReadmeDocs)
)
