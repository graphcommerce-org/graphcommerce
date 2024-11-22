import { getAdvanced } from '../../utils'
import type { TextContentType } from './types'

export const textAggregator: TextContentType['configAggregator'] = (node) => ({
  textContent: node.innerHTML,
  ...getAdvanced(node),
})
