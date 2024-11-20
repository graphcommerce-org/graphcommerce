import { getAdvanced } from '../../utils'
import type { ButtonsContentType } from './types'

export const buttonsAggregator: ButtonsContentType['configAggregator'] = (node) => ({
  isSameWidth: node.getAttribute('data-same-width') === 'true',
  ...getAdvanced(node),
})
