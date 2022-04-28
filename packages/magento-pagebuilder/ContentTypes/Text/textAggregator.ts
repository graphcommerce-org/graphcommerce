import { getAdvanced } from '../../utils'
import { TextContentType } from './types'

export const textAggregator: TextContentType['configAggregator'] = (node) => ({
  textContent: node.innerHTML,
  ...getAdvanced(node),
})
