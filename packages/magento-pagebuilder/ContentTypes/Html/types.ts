import { ContentType, ContentTypeConfig, ContentTypeConfigChildren } from '../../types'
import { AdvancedProps } from '../../utils'

export type HtmlConfig = ContentTypeConfig<'html'>

export type HtmlProps = AdvancedProps & { children: ContentTypeConfigChildren }

export type HtmlContentType = ContentType<HtmlConfig, HtmlProps>
