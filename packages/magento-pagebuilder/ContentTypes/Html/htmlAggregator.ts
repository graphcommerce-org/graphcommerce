import { parseChildren } from '../../parser/parseChildren'
import { getAdvanced } from '../../utils'
import { HtmlContentType } from './types'

export const htmlAggregator: HtmlContentType['configAggregator'] = (node) => ({
  children: parseChildren(node),
  ...getAdvanced(node),
})
