import { TabItem } from './TabItem'
import { tabItemAggregator } from './tabItemAggregator'
import { TabItemContentType } from './types'

export const tabItem: TabItemContentType = {
  configAggregator: tabItemAggregator,
  component: TabItem,
}
