import type { ContentType, ContentTypeConfig, ContentTypeConfigChildren } from '../../types'
import type { AdvancedProps } from '../../utils'

export type HtmlConfig = ContentTypeConfig<'html'>

export type HtmlProps = AdvancedProps & { content: ContentTypeConfigChildren }

export type HtmlContentType = ContentType<HtmlConfig, HtmlProps>
