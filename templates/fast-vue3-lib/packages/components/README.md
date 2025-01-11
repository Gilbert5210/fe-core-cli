# 快速开始

### 介绍
@{{npmScope}}/components 是 Vue3 + Typescript 组件库UI包；
是从各个业务系统中提取的公共组件，避免重复开发，旨在提高前端的开发效率。


### 特性
有以下的特性：
+ 基于antdv二次开发（也无需重复造轮子）
+ 更贴近业务，开箱即用高质量的vue3组件
+ 约定式开发，大幅减轻开发者工作量
+ 已经完成组件库前期构建和打包阶段，只需要关注到组件的开发（内置发版本规则和指令）
+ 按照约定目录进行开发，打包后的组件库能够支持按需导入，完美配合TreeShaking
+ 集成Vitepress，按照约定位置创建文件会自动配置路由，只需要关注文档内容的编写
+ 对测试环境支持约定式路由写法，无需编写路由文件（example调试组件）
+ 通过命令行来创建组件文件，减去繁琐的文件创建过程
+ 通过简单的修改环境变量来修改开发方式


## 怎么使用
### 安装
使用 npm 或 yarn 安装
```bash
yarn add @{{npmScope}}/components
```

### 示例
```typescript
// 全量引入
import KsgUI from '@{{npmScope}}/components'
app.use(KsgUI)

// 全局引入样式
import '@{{npmScope}}/components/theme-chalk/index.css'

// 按需加载
// 手动按需加载
import { KsgButton } from '@{{npmScope}}/components';
app.use(KsgButton);

// 组件样式按需加载
import '@{{npmScope}}/components/theme-chalk/ksg-button.css'
```

### 按需引入
- 手动按需引入
```typescript
import KsgButton from '@{{npmScope}}/components/esm/button'; // 加载 JS
// 或者 import { KsgButton } from '@{{npmScope}}/components';
import '@{{npmScope}}/components/theme-chalk/ksg-button.css'
```
- Vite 按需引入

```typescript
// vite.config.js
import Components from 'unplugin-vue-components/vite';
import { KsgUIResolver } from '@{{npmScope}}/utils'

export default {
  plugins: [
    /* ... */
    Components({
      resolvers: [
      	KsgUIResolver()
      ],
    }),
  ],
};
```

### 使用demo
```vue
<template>
  <ksg-button></ksg-button>
</template>

<script lang="ts" setup>
import { KsgButton } from '@{{npmScope}}/components'; // 加载 JS
import '@{{npmScope}}/components/theme-chalk/ksg-button.css'; // 加载 CSS
</script>
```

