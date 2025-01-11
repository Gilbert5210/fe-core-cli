import path from 'path'
import { defineConfig } from 'vite'
import plugins from './plugins'

export default defineConfig({
  plugins: plugins(),
  resolve: {
    alias: {
      '@{{npmScope}}/components': path.resolve(__dirname, '../packages/components'),
      // '@ksg-ui': path.resolve(__dirname, '../packages/components'),
      // 解决utils需要打包的问题
      '@{{npmScope}}/utils': path.resolve(__dirname, '../packages/utils'),
      '@/': path.resolve(__dirname, 'src/')
    }
  },
  server: {
    port: 3000,
    cors: true,
    hmr: true,
    host: true,
    https: true,
    proxy: {}
  },
  css: {
    preprocessorOptions: {
      less: {
        // modifyVars: {
        //   hack: `true; @import (reference) "${path.resolve('src/assets/style/common.less')}";`
        // },
        // additionalData: '@import "src/assets/style/common.less";',
        javascriptEnabled: true
      }
    }
  },
  envDir: path.resolve(__dirname, 'env'),
  build: {
    outDir: path.resolve(__dirname, '../dist')
  }
})
