/* eslint-disable @typescript-eslint/ban-ts-comment */
import path from 'path'
import { PACKAGE_ROOT_PATH } from '../utils'
import glob from 'fast-glob'
import esbuild from 'rollup-plugin-esbuild'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import babel from '@rollup/plugin-babel'
import rollupTypescript from 'rollup-plugin-typescript2'
import commonjs from '@rollup/plugin-commonjs'
import terser from '@rollup/plugin-terser'
import { OutputOptions, rollup } from 'rollup'
import dts from 'rollup-plugin-dts'

/**
 * rollup 打包工具函数通用方法
 */
export const buildModule = async (moduleName: string) => {
  const targetRoot = path.resolve(PACKAGE_ROOT_PATH, moduleName)

  const input = await glob(['src/**/*.{js,ts}', 'index.{js,ts}'], {
    cwd: targetRoot,
    absolute: true,
    onlyFiles: true
  })

  const plugins = [
    babel({
      exclude: ['node_modules/**'],
      babelrc: false,
      babelHelpers: 'bundled',
      presets: [['env', { modules: false }]]
    }),
    nodeResolve(),
    rollupTypescript({
      tsconfig: path.resolve(targetRoot, 'tsconfig.json')
    }),
    commonjs(),
    terser(),
    esbuild({
      minify: true
    })
  ]

  try {
    const bundle = await rollup({
      input,
      plugins,
      external: ['vue', 'lodash-es', 'axios', 'vue-router', 'ant-design-vue', 'qs'],
      treeshake: true
    })

    const bundleDts = await rollup({
      input,
      plugins: [
        dts({
          // 来自的所有外部依赖项node_modules都会自动从捆绑中排除
          // respectExternal: true
        })
      ],

      external: ['vue', 'lodash-es', 'qs'],
      treeshake: true
    })

    const outputOptions: OutputOptions[] = [
      {
        format: 'esm',
        dir: path.resolve(targetRoot, 'esm')
      },
      {
        format: 'cjs',
        exports: 'named',
        dir: path.resolve(targetRoot, 'lib')
      }
      // {
      //   name: 'template',
      //   format: 'umd',
      //   exports: 'named',
      //   sourcemap: true,
      //   file: path.resolve(targetRoot, 'dist/umd/index.js')
      //   // dir: path.resolve(targetRoot, 'dist/umd')
      // }
    ]

    // 工具函数代码打包
    const outputBundles = outputOptions.map((option) => {
      return bundle.write({
        ...option,
        entryFileNames: option.format === 'esm' ? '[name].mjs' : '[name].js'
      })
    })

    /**
     * 工具函数dts 生成
     * 注意：这里比如用两个bundle分别打包代码和dts，否则会存在打包的问题，且输出的时候也会覆盖文件
     */
    const outputBundlesDts = outputOptions.map((option) => {
      return bundleDts.write({
        ...option
      })
    })

    await Promise.all([...outputBundles, ...outputBundlesDts])
  } catch (e) {
    console.log('rollup-error:', e)
  }
}

export default buildModule
