import type { ContentType, ContentTypeConfig, ContentTypeConfigChildren } from '../../types'
import type { AdvancedProps } from '../../utils'

type BlockConfig = ContentTypeConfig<'column-group'>

export type ButtonProps = AdvancedProps & {
  content: ContentTypeConfigChildren
}

export type BlockContentType = ContentType<BlockConfig, ButtonProps>
