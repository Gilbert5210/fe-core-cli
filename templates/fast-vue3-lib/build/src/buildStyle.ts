import path from 'path'
import chalk from 'chalk'
import { dest, parallel, series, src } from 'gulp'
import autoprefixer from 'gulp-autoprefixer'
import cleanCSS from 'gulp-clean-css'
import rename from 'gulp-rename'
import consola from 'consola'
import { COMPONENTS_ROOT_PATH, THEME_CHALK_ROOT_PATH } from '../utils'
import { GLOBAL_CONFIG } from '../globalConfig'
import less from 'gulp-less'
const distFolder = path.resolve(THEME_CHALK_ROOT_PATH, 'dist')
const distBundle = path.resolve(COMPONENTS_ROOT_PATH, 'theme-chalk')
const indexLess = path.resolve(THEME_CHALK_ROOT_PATH, './index.less')
const componentsLess = path.resolve(THEME_CHALK_ROOT_PATH, './components/*.less')
const indexComponentsLess = path.resolve(THEME_CHALK_ROOT_PATH, './components/index.less')
/**
 * compile theme-chalk scss & minify
 * not use sass.sync().on('error', sass.logError) to throw exception
 * @returns
 */
export function buildThemeChalk() {
  const noElPrefixFile = /(index|base|display)/
  return (
    src([indexLess, componentsLess, `!${indexComponentsLess}`])
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      .pipe(less({ javascriptEnabled: true }))
      .pipe(autoprefixer({ cascade: false }))
      .pipe(
        cleanCSS(
          // 解决@import 第三方库的样式报错的问题
          {
            inline: ['none']
          },
          (details) => {
            const originalSize = details.stats.originalSize / 1000
            const minifiedSize = details.stats.minifiedSize / 1000
            consola.success(
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              `${chalk.cyan(details.name)}: ${chalk.yellow(originalSize)} KB -> ${chalk.green(minifiedSize)} KB`
            )
          }
        )
      )
      .pipe(
        rename((path) => {
          if (!noElPrefixFile.test(path.basename)) {
            path.basename = `${GLOBAL_CONFIG.COMPONENT_PREFIX}-${path.basename}`
          }
        })
      )
      .pipe(dest(distFolder))
  )
}

/**
 * copy source file to packages
 */
export function copyThemeChalkSource() {
  return src(path.resolve(THEME_CHALK_ROOT_PATH, './**/*.less')).pipe(dest(path.resolve(distBundle, 'src')))
}

/**
 * copy from packages/theme-chalk/dist to dist/element-plus/theme-chalk
 */
export function copyThemeChalkBundle() {
  return src(`${distFolder}/**`).pipe(dest(distBundle))
}

export const buildStyle = parallel(copyThemeChalkSource, series(buildThemeChalk, copyThemeChalkBundle))

export default buildStyle
