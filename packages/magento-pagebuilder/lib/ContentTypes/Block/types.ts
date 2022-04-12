import { ContentType, ContentTypeConfig } from '../../types'
import { AdvancedProps } from '../../utils'
import { HTMLContent } from '../../utils/parseChildrenHtml'

type BlockConfig = ContentTypeConfig<'column-group'>

export type ButtonProps = AdvancedProps & {
  richContent: HTMLContent
}

export type BlockContentType = ContentType<BlockConfig, ButtonProps>
