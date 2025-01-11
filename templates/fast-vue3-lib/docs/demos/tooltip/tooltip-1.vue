<template>
  <div class="tooltip-demo">
    <{{ componentPrefix }}-tooltip title="你得接受的飓风" unOverHide />

    <br />
    <{{ componentPrefix }}-tooltip
    title="你得接受的飓风你得接受的飓风你得接受的飓风你得接受的飓风你得接受的飓风jdhsghhghgh" /> <{{
      componentPrefix
    }}-tooltip :ellipsis="false"
    title="你得接受的飓风你得接受的飓风你得接受的飓风你得接受的飓风你得接受的飓风你得接受的飓风你得接受的飓风" /> <{{
      componentPrefix
    }}-tooltip :titleTips="titleList" title="你说屁话" />
  </div>
</template>

<script lang="ts" setup>
const titleList = [
  'titleListtitleListtitleList',
  '你得接受的飓风你得接受的飓风你得接受的飓风你得接受的飓风你得接受的飓风你得接受的飓风你得接受的飓风'
]
</script>

<style scoped lang="less">
.tooltip-demo {
  width: 30%;
}
</style>
