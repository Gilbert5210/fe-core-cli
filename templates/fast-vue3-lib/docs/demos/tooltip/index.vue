<template>
  <example-demos :demos="demos" title="tooltip" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ExampleDemos from '../example-demo.vue'
const demos = import.meta.glob('./!(index)*.vue', { eager: true })

export default defineComponent({
  name: 'tooltipDemo',
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
