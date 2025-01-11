<template>
  <div class="component-demo-nav">
    <router-link class="home" to="/">home</router-link>
    <p class="name">{{ title }}本地演示组件</p>
  </div>
  <div class="component-example editable">
    <section v-for="(demo, index) in demos" :key="index" class="component-example-section">
      <div class="component-example-header">
        <div class="component-example-title" v-text="demo.title"></div>
        <div class="component-example-describe" v-text="demo.desc"></div>
      </div>
      <div class="component-example-content">
        <component :is="demo" />
      </div>
    </section>
  </div>
</template>

<script lang="ts">
/**
 * @author Gilbert
 * @Description: 每个组件的汇总入口通用组件
 * @date 01.06.2023
 */

import { defineComponent } from 'vue'
export default defineComponent({
  name: 'exampleDemos',
  props: {
    title: {
      type: String,
      default: ''
    },
    demos: {
      type: Array,
      default: () => []
    }
  }
})
</script>
<style lang="less" scoped>
.component-example {
  &-section {
    border: 1px solid #cfcfcf;
    padding: 16px;

    & + .component-example-section {
      margin-top: 16px;
    }
  }

  &-header {
    display: flex;
    align-items: center;
    margin-bottom: 8px;
  }

  &-title {
    font-size: 18px;
    font-weight: bolder;
  }

  &-describe {
    color: #00000073;
    padding-left: 16px;
  }
}
</style>
