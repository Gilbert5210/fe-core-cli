import { defineConfig } from 'vite-plugin-windicss'

export default defineConfig({
  extract: {
    include: ['**/*.{md,vue}', '.vitepress/**/*.{ts,md,vue}']
  },
  attributify: true,
  shortcuts: {
    'bg-main': 'bg-white dark:bg-[#111]'
  },
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#424242',
          deep: '#242424'
        }
      },
      fontFamily: {
        /* eslint-disable */
        mono: "'IBM Plex Mono', source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace"
      }
    }
  }
})
