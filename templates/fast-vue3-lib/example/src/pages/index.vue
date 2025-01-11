<template>
  <div class="components-list">
    <router-link
      v-for="item in routers"
      :key="item.name"
      class="components-list__item ksg-common__ellipsis"
      :title="item.name"
      :to="item.path"
      >{{ item.name }} 组件</router-link
    >
  </div>
</template>
<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useRouter } from 'vue-router'
export default defineComponent({
  name: 'pages-home',
  setup() {
    let router = useRouter()
    const routers = computed(() => {
      console.log(router.options.routes)
      return router.options.routes.filter((it) => it.name !== 'index')
    })
    return {
      routers
    }
  }
})
</script>
<style scoped lang="less">
.components-list {
  display: flex;
  flex-wrap: wrap;
  padding-top: 60px;

  &__item {
    flex-basis: 25%;
    padding: 8px 0;
  }
}
</style>
