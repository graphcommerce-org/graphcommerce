import { parseChildrenHtml } from '../../parser/parseChildrenHtml'
import { getAdvanced } from '../../utils'
import { HtmlContentType } from './types'

export const htmlAggregator: HtmlContentType['configAggregator'] = (node) => ({
  content: parseChildrenHtml(node),
  ...getAdvanced(node),
})
