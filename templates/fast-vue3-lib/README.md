# {{libraryName}}

## 介绍
{{libraryName}} 开源的 Vue3 + Typescript 组件库开发模板；
简单轻松构建功能完善的组件库，按照约定的目录编排来进行开发，使开发者只需关注组件的开发以及说明文档的编写，无需关注其他繁琐的配置。

相信许多团队都希望沉淀出一套组件库，更加贴合业务，但是大部分人都困在组件库开发的前期构建以及打包阶段，而fast-vue3-lib就是为此而生。

同时，我们使用pnpm管理多包，也可集成所有的团队的基建在一个仓库，比如 `@xxx/utils`、`@xxx/components`、`@xxx/cli`

业务示例：[ksgUI](https://ksg-ui.staging.xxx.com/)

## 特性
有以下的特性：
+ 基于 antdv 二次开发（也无需重复造轮子）
+ 更贴近业务，开箱即用高质量的vue3组件
+ 约定式开发，大幅减轻开发者工作量
+ 已经完成组件库前期构建和打包阶段，只需要关注到组件的开发（内置发版本规则和指令）
+ 按照约定目录进行开发，打包后的组件库能够支持按需导入，完美配合TreeShaking
+ 集成 Vitepress，按照约定位置创建文件会自动配置路由，只需要关注文档内容的编写
+ 对测试环境支持约定式路由写法，无需编写路由文件（example调试组件）
+ 通过命令行来创建组件文件，减去繁琐的文件创建过程
+ 通过简单的修改环境变量来修改开发方式

## UI库包含功能

- 组件库开发、打包、发布
- 门户文档docs 编写、打包、一套代码编写和演示 Demo
- 快速创建组件命令行 cli
- 组件库搭建的 example 演示
- 专门管理打包的模块 build

## 组件库脚手架技术栈

- Vite 3
- Vue 3
- TypeScript
- Vitepress 1.x
- ESLint
- Rollup
- Gulp
- pnpm
- monorepo

## 使用说明

#### 克隆代码到本地：

```shell
npm install -g @ksg/ksg-cli

# 选择 fast-vue3-lib
ksg-cli create xxx-demo
```

#### 安装依赖
node >= 18
如果您没有安装 pnpm，需要先安装 pnpm

```shell
npm install -g pnpm
```

安装依赖：

```shell
pnpm i
```

#### 本地开发

在 example 中开发组件，使用命令：

```shell
pnpm run dev:dev
```

访问地址为 http://localhost:3000/

在组件库文档中开发组件，使用命令：

```shell
pnpm run docs:dev
```

访问地址为 http://localhost:3100/

#### 创建新组件

```shell
pnpm run gen:component
```
按照提示输入组件名称、组件中文名称、组件类型（.tsx 或 .vue）

#### 构建文档
```shell
pnpm run build:docs
```
打包构建后的文件位于 _docs/.vitepress/dist_ 目录

#### 构建 example
```shell
pnpm run build:dev
```
打包构建后的文件位于 _dist_ 目录

#### 构建 utils

```shell
pnpm run build:utils
```

打包构建后的文件位于 _dist_ 目录

#### 发布组件库

1. 组件库打包：

   ```shell
   pnpm run build:lib
   ```



2. 组件库发版

   - 在发布 npm 前可以在本地私服进行测试。

     ```shell
     # 启动本地私服：
     # 启动成功后在浏览器中访问 http://localhost:4873/
     pnpm run start:verdaccio

     # 发布组件库到本地私服中
     pnpm run pub:local
     ```

   - 发布正式npm

     ```shell
     # 通过changeset来进行多包管理和发版
     # 生成 chanegset 文件
     pnpm changeset

     # 更新版本号、生成change log
     pnpm version-pak

     # 发布版本到npm
     pnpm release:only
     ```

3.




## 组件库命令说明

组件库的命令入口均在根目录的 _package.json_ 中的 _scripts_ 中。由于采用了 monorepo 的方式，大多命令的实现都在各自的模块中。

所有命令如下：

```
- dev:dev
- dev:uat
- dev:prod
- build:dev
- build:uat
- build:prod
- preview:example
- clear
- build
- build:lib
- build:utils
- build:theme
- docs:dev
- docs:build
- docs:preview
- gen:component
- start:verdaccio
- pub:local
- changeset
- version-pak
- publish:only
- release
- release:beta
- updatePackageName
```

#### pnpm run dev:dev

本地开发 example，使用 dev 环境配置，访问地址为 http://localhost:3000/

#### pnpm run dev:uat

本地开发 example，使用 uat 环境配置，访问地址为 http://localhost:3000/

#### pnpm run dev:prod

本地开发 example，使用 prod 环境配置，访问地址为 http://localhost:3000/

#### pnpm run build:dev

打包 dev 环境 example，打包生成的文件位于项目根目录的 _dist_ 目录

#### pnpm run build:uat

打包 uat 环境 example，打包生成的文件位于项目根目录的 _dist_ 目录

#### pnpm run build:prod

打包 prod 环境 example，打包生成的文件位于项目根目录的 _dist_ 目录

#### pnpm run preview:example

预览打包后的 example，访问地址为：http://localhost:4173/

#### pnpm run build

打包组件库、工具库、样式库

#### pnpm run build:utils

打包工具库，打包生成的文件位于项目根目录的 _dist_ 目录

#### pnpm run build:theme-chalk

打包样式库，打包生成的文件位于项目根目录的 _dist_ 目录

#### pnpm run build:lib

打包组件库，打包生成的文件位于项目根目录的 _lib、esm、theme-chalk_ 目录

#### pnpm run docs:dev

本地开发组件库文档，访问地址为：http://localhost:3100/

#### pnpm run docs:build

组件库文档打包，打包生成的文件位于项目根目录下的 _docs/.vitepress/dist_ 目录

#### pnpm run docs:preview

预览打包后的组件库文档，访问地址为：http://localhost:4173/

#### pnpm run gen:component

快速创建新组件。依次输入组件名、组件描述（中文名称）、组件类型（tsx \ vue）即可自动生成组件并完成配置。

使用该命令可避免组件开发人员分散精力到各种配置、基础目录和文件的创建中，可以让其聚焦于组件本身的开发。

#### pnpm run start:verdaccio

启动 verdaccio。 本地开发时，使用 verdaccio 作为测试使用的本地 npm 私服。
使用该命令启动 verdaccio 私服，启动成功后在浏览器中访问 http://localhost:4873/

如果初次使用，需要创建用户，可以搜索 _verdaccio_，查看其具体使用。

#### pnpm run pub:local

发布组件库到本地私服。

#### pnpm run changeset

多包管理，生成changeset文件

#### pnpm run version-pak

消耗changeset文件，更新包版本、生成changelog

#### pnpm run publish:only

发布组件库到npm服务。

#### pnpm run release:beta

一键发布测试版本

#### pnpm run release

一键发布版本，但是不发布到npm,只是做好全部准备

#### pnpm run updatePackageName
如果你希望更改业务的scope名字，比如@xxx/components ==> @myName/components.

修改package下，所有子包的package.json的name值（配置内容在这：`build/globalConfig.ts`）
