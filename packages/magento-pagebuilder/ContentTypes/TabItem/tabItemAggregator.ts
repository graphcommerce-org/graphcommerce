import { getImageBackgroundProps } from '../../components/MediaBackground/getImageBackgroundProps'
import { getAdvanced, getVerticalAlignment, getMediaQueries, stripEmpty } from '../../utils'
import { TabItemContentType } from './types'

export const tabItemAggregator: TabItemContentType['configAggregator'] = (node) =>
  stripEmpty({
    tabName: node.getAttribute('data-tab-name'),
    minHeight: node.style.minHeight,
    ...getVerticalAlignment(node),
    backgroundColor: node.style.backgroundColor,
    ...getImageBackgroundProps(node),
    ...getAdvanced(node),
    ...getMediaQueries(node),
  })
