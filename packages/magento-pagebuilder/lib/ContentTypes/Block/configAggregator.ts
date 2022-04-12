import { getAdvanced } from '../../utils'
import { parseChildrenHtml } from '../../utils/parseChildrenHtml'
import { BlockContentType } from './types'

export const configAggregator: BlockContentType['configAggregator'] = (node) => ({
  ...getAdvanced(node),
  richContent: parseChildrenHtml(node),
})
