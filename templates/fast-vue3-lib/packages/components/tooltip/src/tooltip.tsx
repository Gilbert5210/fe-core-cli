import { defineComponent, ref } from 'vue'
import { tooltipProps } from './types'
import { Tooltip } from 'ant-design-vue'
import { COMPONENT_NAME } from './config'

export default defineComponent({
  name: COMPONENT_NAME,

  props: tooltipProps,

  setup(props, { slots, attrs }) {
    const showTooltip = ref(false)
    const textContainerRef = ref(null)

    const checkTextOverflow = () => {
      // 默认不展示
      let isShow = false
      const container = textContainerRef.value || {
        firstElementChild: {
          clientWidth: 0
        },
        clientWidth: 0
      }

      // 存在实例 & 可视区域存在的时候
      if (container && container.clientWidth) {
        isShow = container?.firstElementChild?.clientWidth >= container.clientWidth
      }

      return isShow
    }

    const toggleTooltip = (flag: boolean) => {
      if (!props.unOverHide) {
        showTooltip.value = flag
        return
      }
      if (flag) {
        showTooltip.value = checkTextOverflow()
        return
      }

      showTooltip.value = flag
    }

    const tooltipSlots = {
      default: () => {
        return (
          <span
            class={{
              'ksg-common__ellipsis': props.ellipsis,
              [`${COMPONENT_NAME}-ellipsis`]: props.ellipsis
            }}
          >
            {props.title}
          </span>
        )
      },
      title: props.titleTips?.length
        ? () => {
            return props.titleTips?.map((content) => {
              return <div>{content}</div>
            })
          }
        : undefined,
      ...slots
    }

    return () => (
      <div ref={textContainerRef} class={COMPONENT_NAME}>
        <Tooltip
          destroyTooltipOnHide
          {...attrs}
          title={props.titleTips?.length ? undefined : props.title || undefined}
          visible={showTooltip.value}
          onVisibleChange={toggleTooltip}
          v-slots={tooltipSlots}
        />
      </div>
    )
  }
})
