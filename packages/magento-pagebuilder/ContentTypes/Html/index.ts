import { Html } from './Html'
import { htmlAggregator } from './htmlAggregator'
import { HtmlContentType } from './types'

export const html: HtmlContentType = { configAggregator: htmlAggregator, component: Html }
