import { ContentType, ContentTypeConfig } from '../../types'
import { AdvancedProps } from '../../utils'

type TextConfig = ContentTypeConfig<'text'>

export type TextProps = AdvancedProps & {
  content: string
}

export type TextContentType = ContentType<TextConfig, TextProps>
