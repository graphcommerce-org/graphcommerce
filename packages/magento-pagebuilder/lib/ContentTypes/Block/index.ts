import { Block } from './Block'
import { configAggregator } from './configAggregator'
import { BlockContentType } from './types'

export const block: BlockContentType = {
  configAggregator,
  component: Block,
}
