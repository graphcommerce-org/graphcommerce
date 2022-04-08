import {
  getAdvanced,
  getBackgroundImages,
  getVerticalAlignment,
  getMediaQueries,
} from '../../utils'
import { ColumnContentType } from './types'

export const configAggregator: ColumnContentType['configAggregator'] = (node) => ({
  minHeight: node.style.minHeight,
  width: node.style.width,
  backgroundColor: node.style.backgroundColor,
  ...getMediaQueries(node),
  ...getAdvanced(node),
  ...getBackgroundImages(node),
  ...getVerticalAlignment(node),
})
