import { defineConfig } from 'vite'
import VueJsx from '@vitejs/plugin-vue-jsx'
import WindiCSS from 'vite-plugin-windicss'

export default defineConfig({
  plugins: [
    VueJsx(),
    WindiCSS({
      preflight: false
    })
  ],
  ssr: {
    noExternal: ['@{{npmScope}}/utils', '@{{npmScope}}/components']
  },
  server: {
    port: 3100
  }
})
