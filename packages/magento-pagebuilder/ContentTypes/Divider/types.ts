import type { ContentType, ContentTypeConfig } from '../../types'
import type { AdvancedProps } from '../../utils'

export type HeadingConfig = ContentTypeConfig<'divider'> & { appearance: 'default' }

export type HeadingProps = AdvancedProps & {
  thickness: React.CSSProperties['borderWidth']
  color: React.CSSProperties['borderColor']
  width: React.CSSProperties['width']
}

export type DividerContentType = ContentType<HeadingConfig, HeadingProps>
