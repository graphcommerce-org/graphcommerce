import { getImageBackgroundProps } from '../../components/MediaBackground/getImageBackgroundProps'
import { getAdvanced, getVerticalAlignment, getMediaQueries } from '../../utils'
import { ColumnContentType } from './types'

export const configAggregator: ColumnContentType['configAggregator'] = (node) => ({
  minHeight: node.style.minHeight,
  width: node.style.width,
  backgroundColor: node.style.backgroundColor,
  ...getMediaQueries(node),
  ...getAdvanced(node),
  ...getImageBackgroundProps(node),
  ...getVerticalAlignment(node),
})
