/**
 * @author Gilbert
 * @Description: Configure and register global directives
 * @date 31.05.2023
 */
import type { App } from 'vue'

import { setupResizeDirective, domResizeFunc } from './resize'

export const install = (app: App) => {
  setupResizeDirective(app)
}

export default { install }

export { setupResizeDirective, domResizeFunc }
