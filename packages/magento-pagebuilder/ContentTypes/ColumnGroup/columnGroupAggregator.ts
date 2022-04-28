import { getIsHidden } from '../../utils'
import { ColumnGroupContentType } from './types'

export const columnGroupAggregator: ColumnGroupContentType['configAggregator'] = (node) => ({
  display: node.style.display,
})
