import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import * as path from 'path'
import VueJsx from '@vitejs/plugin-vue-jsx'
import viteDts from 'vite-plugin-dts'
import eslintPlugin from 'vite-plugin-eslint' //导入包
const COMPONENTS_ROOT_PATH = path.resolve(__dirname, './')

export default defineConfig({
  plugins: [
    vue(),
    VueJsx(),
    viteDts({
      insertTypesEntry: true,
      staticImport: false,
      outputDir: ['esm', 'lib'],
      //指定使用的tsconfig.json为我们整个项目根目录下,如果不配置,你也可以在components下新建tsconfig.json
      tsConfigFilePath: path.resolve(__dirname, 'tsconfig.json')
    }),
    eslintPlugin({
      include: ['**/*.js', '**/*.vue', '**/*.ts', '**/*.tsx'],
      exclude: ['esm/**', 'lib/**', 'theme-chalk/**', 'node_modules/**', '**/md5Worker.js']
    })
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, './index.ts'),
      name: 'ksgUI',
      fileName: (format) => `ksgUI.${format}.js`
    },
    outDir: path.resolve(__dirname, './'),
    rollupOptions: {
      external: [
        'vue',
        '@{{npmScope}}/utils',
        /\.scss/,
        'vue-router',
        'ant-design-vue',
        '@wangeditor/editor',
        '@ant-design/icons-vue',
        'lodash-es',
        'dayjs'
      ],
      output: [
        {
          //打包格式
          format: 'es',
          //打包后文件名
          entryFileNames: '[name].mjs',
          // //让打包目录和我们目录对应
          preserveModules: true,
          preserveModulesRoot: COMPONENTS_ROOT_PATH,
          exports: 'named',
          //配置打包根目录
          dir: 'esm'
        },
        {
          //打包格式
          format: 'cjs',
          //打包后文件名
          entryFileNames: '[name].js',
          //让打包目录和我们目录对应
          preserveModules: true,
          preserveModulesRoot: COMPONENTS_ROOT_PATH,
          exports: 'named',
          //配置打包根目录
          dir: 'lib'
        }
      ]
    }
    // sourcemap: true
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './')
      // '@ksg-ui': path.resolve(__dirname, './')
    }
  }
})
