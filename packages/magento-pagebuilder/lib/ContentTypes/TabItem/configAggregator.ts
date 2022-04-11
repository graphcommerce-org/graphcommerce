import {
  getAdvanced,
  getBackgroundImages,
  getVerticalAlignment,
  getMediaQueries,
} from '../../utils'
import { TabItemContentType } from './types'

export const configAggregator: TabItemContentType['configAggregator'] = (node) => ({
  tabName: node.getAttribute('data-tab-name'),
  minHeight: node.style.minHeight,
  ...getVerticalAlignment(node),
  backgroundColor: node.style.backgroundColor,
  ...getBackgroundImages(node),
  ...getAdvanced(node),
  ...getMediaQueries(node),
})
