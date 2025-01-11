# @{{npmScope}}/utils
@{{npmScope}}/utils 通用的工具函数进行封装，减少业务代码上重复造轮子的问题

## 使用

### 安装
使用 npm 或 yarn 安装
```bash
yarn add @{{npmScope}}/utils
```

```typescript
import { objMapFormatToTableValueEnum } from '@{{npmScope}}/utils/common';

enum ReleaseRegionVal {
	china = 1,   // 国内
	oversea // 海外
}

const ReleaseRegionText = {
	[ReleaseRegionVal.china]: '国内',
	[ReleaseRegionVal.oversea]: '海外',
}

const dataEnum = objMapFormatToTableValueEnum(ReleaseRegionText)
```

还有ts类型体操，也做了二次封装和沉淀，便于业务更加丝滑的写代码
```typescript
import { PartialPro } from '@{{npmScope}}/utils/proTs'

type ProjectItem = {
  name: string;
  desc: string;
  id: number;
}

/**
 * 设置ID为非必填信息
 * ProjectItem = {
 name: string;
 desc: string;
 id?: number;
 }
 */
type OmitIdProjectItem = PartialPro<ProjectItem, 'id'>

```


### 注释规则

```typescript
/**
 * 首行功能名称
 * @param 参数说明
 * @typeParam 类型参数
 * @return(s) 返回说明
 * @event 事件说明
 * @hidden @ignore 跳过
 * @interval 内部代码，如果配置了 excludeInternal 该段将被忽略
 * @category 反射分组
 */

// 其他
/**
 * @prop 属性
 * @example 使用例子
 */

// 代码块,使用markdown语法
/**
 * `` ` typescript
 * class Man { ... }
 * `` `
 */
```

### 注释例子

```typescript
/**
 * 文本节点
 * @param tag 节点内容
 * @return 返回文本节点字符
 * @example
 * `` ` typescript
 * 1. textTag(null)
 * => ''
 *
 * 2. textTag(undefined)
 * => ''
 *
 * 3. textTag({ name: 'coco' })
 * => `
 *    {
 *      name: 'coco'
 *    }
 *  `
 *
 * 4. textTag('container')
 * => 'container'
 *
 * 5. textTag(() => {...})
 * => '() => {...}'
 * `` `
*/
const textTag = (tag: string) => {
  return tag || ''
}

```
> 后续会结合 vitepress 统一在docs文档展示工具函数

## typedoc配置
| 参数                  | 类型      | 说明                                                                             |
|---------------------|---------|--------------------------------------------------------------------------------|
| out                 | string  | 输出目录                                                                           |
| module              | string  | 模块引入方式，可以是 commonjs, amd, system, umd                                          |
| target              | string  | ES3(默认), ES5, ES6                                                              |
| name                | string  | 项目标题                                                                           |
| theme               | string  | 皮肤可以是 `default` or `minimal` or 一个路径，[更多资料](http://typedoc.org/guides/themes/) |
| readme              | string  | readme文件，markdown文件的相对地址                                                       |
| includeDeclarations | boolean | 是否包含 `.d.ts` 文件，如果你的项目是javascript写的，可以使用声明文件的方式来支持TypeScript并生成文档              |
| excludeExternals    | boolean | 是否排除外部引入的模块                                                                    |
| excludePrivate      | boolean | 是否排除 `private` 修饰的相关字段方法                                                       |
| excludeProtected    | boolean | 是否排除 `protected` 修饰的相关字段方法                                                     |
| hideGenerator       | boolean | 隐藏页底的全局链接                                                                      |
| version             | boolean | 显示 typedoc 版本                                                                  |
| help                | boolean | 显示帮助信息                                                                         |
| gaID                | string  | 如果有 `Google Analytics` 的跟踪ID，可以设置                                              |
| exclude             | string  | 排除文件                                                                           |
| includes            | string  | 包含文件，应该是一个文件夹的名字，会将下面所有的md文件包含进来（需要使用 `[[include:document.md]]` 引入）            |
| media               | string  | 包含媒体，应该是一个文件夹的名字，会包含文件夹下的图片等各种媒体文件（需要使用 `![logo](media://logo.png)` 引入）        |
