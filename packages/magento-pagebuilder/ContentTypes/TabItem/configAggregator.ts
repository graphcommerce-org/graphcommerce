import { getImageBackgroundProps } from '../../components/MediaBackground/getImageBackgroundProps'
import { getAdvanced, getVerticalAlignment, getMediaQueries } from '../../utils'
import { TabItemContentType } from './types'

export const configAggregator: TabItemContentType['configAggregator'] = (node) => ({
  tabName: node.getAttribute('data-tab-name'),
  minHeight: node.style.minHeight,
  ...getVerticalAlignment(node),
  backgroundColor: node.style.backgroundColor,
  ...getImageBackgroundProps(node),
  ...getAdvanced(node),
  ...getMediaQueries(node),
})
