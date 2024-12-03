import { parseChildren } from '../../parser/parseChildren'
import { getAdvanced } from '../../utils'
import type { BlockContentType } from './types'

export const blockAggregator: BlockContentType['configAggregator'] = (node) => ({
  ...getAdvanced(node),
  content: parseChildren(node),
})
