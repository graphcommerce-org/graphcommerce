import { getAdvanced } from '../../utils'
import type { ColumnLineContentType } from './types'

export const columnLineAggregator: ColumnLineContentType['configAggregator'] = (node) => ({
  display: node.style.display,
  width: node.style.width,
  ...getAdvanced(node),
})
