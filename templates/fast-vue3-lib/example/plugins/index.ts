import { AutoImport } from './autoImport'
import path from 'path'
import vue from '@vitejs/plugin-vue'
import eslint from 'vite-plugin-eslint'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueSetupExtend from 'vite-plugin-vue-setup-extend'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import Pages from 'vite-plugin-pages'
import mkCert from 'vite-plugin-mkcert'

export default function () {
  return [
    vue(),
    vueSetupExtend(),
    vueJsx(),
    mkCert(),
    eslint({
      fix: true,
      exclude: ['**/esm/**', '**/lib/**', '**/md5Worker.js']
    }),
    createSvgIconsPlugin({
      // 要缓存的图标文件夹
      iconDirs: [path.resolve(__dirname, 'src/svg')],
      // 执行 icon name 的格式
      symbolId: 'icon-[name]'
    }),
    AutoImport(), // 自动按需引入组件
    Pages({
      pagesDir: [
        { dir: 'src/pages', baseRoute: '/' },
        {
          dir: path.resolve(__dirname, '../../docs/demos'),
          baseRoute: ''
        },
        {
          dir: path.resolve(__dirname, '../../docs/pageDemos'),
          baseRoute: '/page'
        }
      ],
      exclude: ['**/example-demo.vue'],
      extensions: ['vue']
    })
  ]
}
