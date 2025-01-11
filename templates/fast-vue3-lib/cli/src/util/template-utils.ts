import { ComponentInfo } from '../domain/component-info'
import { GLOBAL_CONFIG } from '@{{npmScope}}/build/globalConfig'

/**
 * .vue 文件模板
 */
export const sfcTemplate = (lineNameWithPrefix: string, lowCamelName: string): string => {
  return `<template>
  <div>
    ${lineNameWithPrefix}
  </div>
</template>

<script lang="ts" setup name="${lineNameWithPrefix}">
import { defineProps } from 'vue'
import { ${lowCamelName}Props } from './types'

defineProps(${lowCamelName}Props)
</script>

<style scoped lang="less">
.${lineNameWithPrefix} {
}
</style>
`
}

/**
 * .tsx 文件模板
 */
export const tsxTemplate = (lineNameWithPrefix: string, lowCamelName: string): string => {
  return `import { defineComponent } from 'vue'
import { ${lowCamelName}Props } from './types'

const COMPONENT_NAME = '${lineNameWithPrefix}'

export default defineComponent({
  name: COMPONENT_NAME,
  props: ${lowCamelName}Props,
  setup (props, context) {
    console.log(props, context)
    return () => (
      <div class={COMPONENT_NAME}>
        <div>
          ${lineNameWithPrefix}
        </div>
      </div>
    )
  }
})
`
}

/**
 * types.ts 文件模板
 */
export const typesTemplate = (lowCamelName: string, upCamelName: string): string => {
  return `import { ExtractPropTypes } from 'vue'

export const ${lowCamelName}Props = {
} as const

export type ${upCamelName}Props = ExtractPropTypes<typeof ${lowCamelName}Props>
`
}

/**
 * 组件入口 index.ts 文件模板
 */
export const indexTemplate = (componentInfo: ComponentInfo): string => {
  const { upCamelName, lineName, type } = componentInfo
  const PrefixUpCamelName = `Ksg${upCamelName}`

  return `import ${upCamelName} from './src/${type === 'tsx' ? lineName : lineName + '.' + type}'
import { withInstall } from '${GLOBAL_CONFIG.NPM_SCOPE}/utils'

const ${PrefixUpCamelName} = withInstall(${upCamelName})
export type { ${upCamelName}Props } from './src/types'
export { ${PrefixUpCamelName} }
export default ${PrefixUpCamelName}
`
}

/**
 * less 文件模板
 */
export const lessTemplate = (lineName: string): string => {
  return `@import "../color";
@import "../variable";
@import "../common";

.@{ksg-prefix}-${lineName} {
}
`
}

export const mdTemplate = (componentInfo: ComponentInfo) => {
  return `
# ${componentInfo.upCamelName} ${componentInfo.zhName}

## 基本使用

<preview
  path="../../demos/${componentInfo.lineName}/${componentInfo.lineName}-1.vue"
  title="基本使用"
  description=" " />

## 组件 API

### Attributes 属性

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|  ----  | ----  | ----  | ----  | ----  |
|  |  |  |  | |

### Methods 方法

| 方法名 | 说明 | 参数 | 返回值 |
|  ----  | ----  | ----  | ----  |
|  |  |  |  |

### Events 事件

| 事件名 | 说明 | 参数 | 返回值 |
|  ----  | ----  | ----  | ----  |
|  |  |  |  |

### Slots 插槽

| 插槽名 | 说明 | 参数 |
|  ----  | ----  | ----  |
|  |  |  |
`
}

export const demoTemplate = (lineNameWithPrefix: string) => {
  return `<template>
  <${lineNameWithPrefix}></${lineNameWithPrefix}>
</template>

<script lang="ts" setup>
</script>

<style scoped lang="less">
</style>
`
}

// 创建组件demo入口index组件的函数
export const demoIndexTemplate = (lineName: string) => {
  return `<template>
  <example-demos :demos="demos" title="${lineName}" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ExampleDemos from '../example-demo.vue'
const demos = import.meta.glob('./!(index)*.vue', { eager: true })

export default defineComponent({
  name: '${lineName}Demo',
  components: {
    ExampleDemos
  },
  setup() {
    return {
      demos: Object.entries(demos).map((it) => it[1].default)
    }
  }
})
</script>
`
}
