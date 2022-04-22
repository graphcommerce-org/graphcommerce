import { HTMLContent } from '../../parser/parseChildrenHtml'
import { ContentType, ContentTypeConfig } from '../../types'
import { AdvancedProps } from '../../utils'

type BlockConfig = ContentTypeConfig<'column-group'>

export type ButtonProps = AdvancedProps & {
  richContent: HTMLContent
}

export type BlockContentType = ContentType<BlockConfig, ButtonProps>
