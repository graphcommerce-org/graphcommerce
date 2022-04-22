import { parseChildrenHtml } from '../../parser/parseChildrenHtml'
import { getAdvanced } from '../../utils'
import { BlockContentType } from './types'

export const blockAggregator: BlockContentType['configAggregator'] = (node) => ({
  ...getAdvanced(node),
  richContent: parseChildrenHtml(node),
})
