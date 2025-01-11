---
class: 'Layout-doc'
sidebarDepth: 2
---

# 组件开发流程

@xxx/components 是基于 [Ant Design Vue](https://antdv.com/components/overview-cn)二次封装的业务组件库，旨在帮助大家减少重复性的工作，项目已集成Ant Design Vue各组件，在自定义组件中 `import` 即可。下面是如何快速开发一个组件的过程:


## 一、实时预览组件

运行下面指令将会启动组件的预览模式，页面会出现各组件列表，点击对应组件名称可实时预览编写组件
```bash
pnpm dev
```

## 二、生成组件模版

运行下面指令将自动在 `packages/components` 下新建组件模版, `project` 代表需要创建的组件名称，注意小写（分词使用短横杠`form-list`）
```bash
pnpm gen:component ${componentName}
```

## 三、构建组件文档

当组件编写完成之后，需要写一些文档用于说明组件的简单使用方式或者参数事件等，在上一步创建的组件模版中有 `docs/components/xxx.md` 文档中编写。执行下面语句可以实时预览组件文档

```bash
pnpm docs:preview
```
另外还有一些其他文档指令：

1. 打包组件文档
```bash
pnpm docs:build
```
2. 运行组件文档
```bash
pnpm docs:dev
```

## 四、发布Beta版本

当组件开发完成，想要验证自己组件在项目中是否能用，这时需要我们发布一个beta版本，本地开发完组件运行下面命令自动会发布Beta版本

> 注意：发布beta版本的时候，需要关注下当前最新版本的版本号，且防止后别人重复

```shell
# 一键发布测试版本
pnpm release:beta

# 主要做了以下事情：
  # 1. 进入预发布模式 tag可以是：next、beta、alpha
  pnpm changeset pre enter beta

  # 2. （在这之前，已经做过全部的代码变更了），进行变更集的更新
  pnpm changeset

  # 3. 更新版本号
  pnpm version-pak

  # 4. 构建所有的包，如果单独发布某个包，就单独构建该包即可（pnpm build:utils）
  pnpm build

  # 5. 发布测试版本到 npm
  #  pnpm release:only

  # 6. 可以重复进行，直到完成全部的测试版本后，就可以退出预发布模式
  pnpm changeset pre exit
```

## 五、Commit message 的格式

每次提交，Commit message 都包括三个部分：Header，Body 和 Footer。

```markdown
<type>(<scope>): <subject>
// 空一行
<body>
// 空一行
<footer>
```

```shell
# 可以进入commit规范引导
git cz
```

关注项目文件中约束：`commitlint.config.js`

提交规范示例：

```shell
git commit -m 'feat(table): table组件支持toolbar插槽自定义内容'

git commit -m 'fix(table): table组件中，修复操作栏按钮删除颜色的问题'
```

## 六、发布正式组件

最后组件开发完之后，需要将组件发布，有以下两个步骤：

- 需要发布最新版本

  1.  执行下面语句, 本地测试组件是否正常，并且升级需要更新的组件库版本号
  > 必须通过这个命令来修改版本号，因为才可以自动生成最新的changelog

  ```shell
  pnpm release
  ```

  2. 将自己分支合并到master，MR 合入master分支会自动发版，禁止直接`本地发包`

- 不需要发布最新版本，那么只需要合并最新的代码到master即可，流水线上会自动发布最新版本

> 发版规范
> 1. 主版本号：做了不兼容旧版本的API修改，大版本修改，主版本号递增时，次版本号和修订号必须归零
> 2. 次版本号：向下兼容的功能性新增或弃用，feature 版本，每次次版本号递增时，修订号必须归零
> 3. 修订号：向下的版本问题修复，bug fix 版本

