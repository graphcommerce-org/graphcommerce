import { Divider } from './Divider'
import { dividerAggregator } from './dividerAggregator'
import { DividerContentType } from './types'

export const divider: DividerContentType = {
  configAggregator: dividerAggregator,
  component: Divider,
}
