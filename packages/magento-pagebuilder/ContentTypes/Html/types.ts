import { ContentType, ContentTypeConfig } from '../../types'
import { AdvancedProps } from '../../utils'
import { HTMLContent } from '../../utils/parseChildrenHtml'

export type HtmlConfig = ContentTypeConfig<'html'>

export type HtmlProps = AdvancedProps & { content: HTMLContent }

export type HtmlContentType = ContentType<HtmlConfig, HtmlProps>
