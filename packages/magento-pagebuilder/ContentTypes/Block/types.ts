import { HTMLContent } from '../../parser/parseChildren'
import { ContentType, ContentTypeConfig, ContentTypeConfigChildren } from '../../types'
import { AdvancedProps } from '../../utils'

type BlockConfig = ContentTypeConfig<'column-group'>

export type ButtonProps = AdvancedProps & {
  children: ContentTypeConfigChildren
}

export type BlockContentType = ContentType<BlockConfig, ButtonProps>
