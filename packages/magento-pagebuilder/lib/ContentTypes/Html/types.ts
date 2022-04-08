import { ContentTypeObject } from '../../parseStorageHtml'
import { ContentType, ContentTypeConfig } from '../../types'
import { AdvancedProps } from '../../utils'

export type HtmlConfig = ContentTypeConfig<'html'>

export type HTMLContent = Array<string | null | ContentTypeObject>

export type HtmlProps = AdvancedProps & { content: HTMLContent }

export type HtmlContentType = ContentType<HtmlConfig, HtmlProps>
