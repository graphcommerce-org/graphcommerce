import { getIsHidden } from '../../utils'
import { ColumnGroupContentType } from './types'

export const configAggregator: ColumnGroupContentType['configAggregator'] = (node) => ({
  display: node.style.display,
})
