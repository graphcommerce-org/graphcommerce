import { Block } from './Block'
import { blockAggregator } from './blockAggregator'
import { BlockContentType } from './types'

export const block: BlockContentType = {
  configAggregator: blockAggregator,
  component: Block,
}
