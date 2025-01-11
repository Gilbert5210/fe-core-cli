import { ExtractPropTypes } from 'vue'

export const tooltipProps = {
  // 是否开启超出省略， 主要控制样式
  ellipsis: {
    type: Boolean,
    default: true
  },

  // 不超出宽度时，不需要使用tooltip
  unOverHide: {
    type: Boolean,
    default: false
  },

  title: {
    type: [String, Number, Boolean],
    default: ''
  },

  titleTips: {
    type: Array as PropType<string[]>
  }
}

export type TooltipProps = ExtractPropTypes<typeof tooltipProps>
