import Tooltip from './src/tooltip'
import { withInstall } from '@{{npmScope}}/utils'

const KsgTooltip = withInstall(Tooltip)
export type { TooltipProps } from './src/types'
export { KsgTooltip }
export default KsgTooltip
