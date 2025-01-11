<template>
  <div class="site">
    <h1>组件库测试站点</h1>
    <p>测试站点主要用于开发过程中测试组件，即在开发过程中由业务驱动组件开发。</p>
    <router-view class="site-content" />
  </div>
</template>

<script lang="ts" setup>
</script>

<style lang="less">
#app {
  height: 100%;
  width: 100%;
  background: #f5f5f5;
}
.site {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 20px;

  &-content {
    //flex: 1;
    //min-height: 0;
    overflow-y: auto;
  }
}
</style>
