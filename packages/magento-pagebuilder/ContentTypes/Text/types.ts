import type { ContentType, ContentTypeConfig } from '../../types'
import type { AdvancedProps } from '../../utils'

type TextConfig = ContentTypeConfig<'text'>

export type TextProps = AdvancedProps & {
  textContent: string
}

export type TextContentType = ContentType<TextConfig, TextProps>
