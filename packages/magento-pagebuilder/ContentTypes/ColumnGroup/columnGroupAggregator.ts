import { getIsHidden } from '../../utils'
import type { ColumnGroupContentType } from './types'

export const columnGroupAggregator: ColumnGroupContentType['configAggregator'] = (node) => ({
  display: node.style.display,
})
