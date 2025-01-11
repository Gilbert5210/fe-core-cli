/**
 * @author Gilbert
 * @Description: v-resize指令，监听窗口变化
 * @date 31.05.2023
 */
import { DirectiveBinding, Directive, App } from 'vue'

const domResizeFunc: Directive = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    // el为绑定的元素，binding为绑定给指令的对象
    let width = ''
    let height = ''

    function isResize() {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const style = document.defaultView.getComputedStyle(el)
      if (width !== style.width || height !== style.height) {
        binding.value(el) // 关键
      }
      width = style.width
      height = style.height
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    el.__vueSetInterval__ = setInterval(isResize, 300)
  },

  unmounted(el: HTMLElement) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    clearInterval(el.__vueSetInterval__)
  }
}

export function setupResizeDirective(app: App) {
  app.directive('dom-resize', domResizeFunc)
}
export { domResizeFunc }
