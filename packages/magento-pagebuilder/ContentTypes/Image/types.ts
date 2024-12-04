import type { ContentType, ContentTypeConfig } from '../../types'
import type { AdvancedProps } from '../../utils'

export type ImageConfig = ContentTypeConfig<'divider'> & { appearance: 'full-width' }

export type ImageProps = AdvancedProps & {
  desktopImage: {
    src?: string | null
    dimensions?: { width: number; height: number } | null
  } | null
  mobileImage: {
    src?: string | null
    dimensions?: { width: number; height: number } | null
  } | null
  altText: string | null
  title: string | null
}

export type ImageContentType = ContentType<ImageConfig, ImageProps>
