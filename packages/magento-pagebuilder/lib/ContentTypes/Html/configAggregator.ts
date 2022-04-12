import { getAdvanced } from '../../utils'
import { parseChildrenHtml } from '../../utils/parseChildrenHtml'
import { HtmlContentType } from './types'

export const configAggregator: HtmlContentType['configAggregator'] = (node) => ({
  content: parseChildrenHtml(node),
  ...getAdvanced(node),
})
