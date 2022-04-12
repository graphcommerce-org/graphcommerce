import { getAdvanced } from '../../utils'
import { TextContentType } from './types'

export const configAggregator: TextContentType['configAggregator'] = (node) => ({
  content: node.innerHTML,
  ...getAdvanced(node),
})
