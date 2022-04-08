import { getAdvanced } from '../../utils'
import { ButtonsContentType } from './types'

export const configAggregator: ButtonsContentType['configAggregator'] = (node) => ({
  isSameWidth: node.getAttribute('data-same-width') === 'true',
  ...getAdvanced(node),
})
