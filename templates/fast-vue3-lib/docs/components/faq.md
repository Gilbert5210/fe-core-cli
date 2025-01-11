# 常见问题

### 1. 如何本地调试组件库代码？

#### 目的：

经常会存在业务项目中特定场景下才出现的问题，在组件库上的demo去构造场景比较麻烦，更希望可以本地直接连接到组件库的源码，针对改问题直接调试源代码；提升解决排查问题和解决问题的效率；同时可以直接在组件库的源码修改后，直接在项目中可以验证

#### 操作流程：

1. 拉取组件库源码

```shell
# 获取组件库的源码，放置在项目的根目录同个层级
git clone git@git.corp.xxx.com:ksg-frontend/ksg-ui.git

# 切换到项目中对应的版本（直接拿最新的版本可能存在差异）

# 拉取最新的依赖
pnpm install
```

2. 开启sourceMap的配置

```json
// 修改 packages/components/vite.config.ts
build: {
  sourcemap: true
}

// 修改主入口 packages/components/package.json
{
  "main": "index.ts",
}
```

3. 对组件库的component组件进行打包

```shell
pnpm build:lib
```

4. 把组件库进行本地关联

```shell
# 到组件的根目录
cd packages/components

yarn link
```

> 可以看到成功的标识
>
> ```markdown
> $ yarn link
> yarn link v1.22.19
> success Registered "@ksg/components".
> info You can now run `yarn link "@ksg/components"` in the projects where you want to use this package and it will be used instead.
> ✨  Done in 0.05s.
> ```

5. 再到你自己的项目中，准备好全部前置操作之后，软链依赖包到本地

```shell
# 记住清除本地的 node_moudles/.vite 的依赖预构建的目录
yarn link @ksg/components
```

6. 重新run项目即可在控制台直接断点组件库的源码, 但是这时候还不能够直接在源码中改完就可以在项目中生效



###### 希望修改组件源代码就可以实时响应的话去调试

1. 保证你的组件库源码根目录和项目的根目录在同一个目录下

   ```markdown
   ├── root
   │   ├── ksg-ui
   │   └── your-project
   ```

2. 在你的项目中关闭自动引入，开启手动全量引入注册

   注释掉自动引入的函数  ===>  plugins/autoRegisterComponents.ts

   ```typescript
   // import { KsgUIResolver } from '@ksg/utils/lib/resolver'
   // KsgUIResolver({})
   ```

   手动注入全量的组件 ===> src/main.ts

   ```typescript
   import KsgUI from '@ksg/components/index'
   app.use(KsgUI)
   ```

   增加别名：vite.config.ts

   ```json
   {
     resolve: {
       alias: {
         "@ksg-ui": path.resolve(__dirname, "../ksg-ui/packages/components"),
       },
   }
   ```



3. 修改组件库包的package.json文件

   ```json
   // 修改主入口 packages/components/package.json
   {
     "main": "index.ts",
     "module": "index.ts",
   }
   ```



4. 重新运行项目，就可以实现在项目中实时更新组件代码了


### 本地代码使用resolve的时候报错的问题
