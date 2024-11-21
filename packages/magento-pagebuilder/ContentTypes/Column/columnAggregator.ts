import { getImageBackgroundProps } from '../../components/MediaBackground/getImageBackgroundProps'
import { getAdvanced, getVerticalAlignment, getMediaQuery } from '../../utils'
import type { ColumnContentType } from './types'

export const columnAggregator: ColumnContentType['configAggregator'] = (node) => ({
  minHeight: node.style.minHeight,
  width: node.style.width,
  backgroundColor: node.style.backgroundColor,
  ...getAdvanced(node),
  ...getImageBackgroundProps(node),
  ...getVerticalAlignment(node),
})
