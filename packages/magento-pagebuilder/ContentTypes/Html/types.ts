import { HTMLContent } from '../../parser/parseChildrenHtml'
import { ContentType, ContentTypeConfig } from '../../types'
import { AdvancedProps } from '../../utils'

export type HtmlConfig = ContentTypeConfig<'html'>

export type HtmlProps = AdvancedProps & { content: HTMLContent }

export type HtmlContentType = ContentType<HtmlConfig, HtmlProps>
