---
layout: home
title: {{libraryName}}
titleTemplate: 组件库开发起始模板

hero:
  name: {{libraryName}}
  text: {{description}}
  tagline: Vue3 + Vite + ts + less + vitepress
  actions:
    - theme: brand
      text: Get Started
      link: /guide/
    - theme: alt
      text: GitLab
      link: https://kdev.corp.xxx.com/git/ksg-frontend/ksg-ui/-/overview?repoId=125033

features:
  - icon: 📦
    title: 完善的打包配置
    details: 打包后的组件库支持对组件和样式按需导入。
  - icon: ⚡️
    title: 专注于组件文件的编写
    details: 通过简单命令自动生成约定组件目录，自动导入配置文件，只需要关注组件文件的编写。
  - icon: 📖
    title: 专注于文档内容的编写
    details: 内置Vitepress以及自动化脚本，按照约定的目录结构编写文档，自动生成路由。
  - icon: 💪
    title: 约定式开发
    details: 按照约定的方式来对组件库进行简单快速开发。同时有example模式可以调试组件
  - icon: 🔩
    title: 支持Less
    details: 通过对环境变量的修改来转换对样式文件的打包模式。
  - icon: 🔑
    title: 类型提示支持
    details: 支持完整的 TypeScript 类型。
---
