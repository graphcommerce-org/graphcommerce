import { parseChildren } from '../../parser/parseChildren'
import { getAdvanced } from '../../utils'
import type { HtmlContentType } from './types'

export const htmlAggregator: HtmlContentType['configAggregator'] = (node) => ({
  content: parseChildren(node),
  ...getAdvanced(node),
})
