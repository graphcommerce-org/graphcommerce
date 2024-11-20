import type { MediaBackgroundProps } from '../../components/MediaBackground/getMediaBackgroundProps'
import type { ContentType, ContentTypeConfig } from '../../types'
import type { AdvancedProps, VerticalAlignment } from '../../utils'

type RowConfig = ContentTypeConfig<'row'> & {
  appearance: 'contained' | 'full-width' | 'full-bleed'
}

type RowProps = AdvancedProps &
  VerticalAlignment &
  MediaBackgroundProps & {
    enableParallax: boolean
    parallaxSpeed: number
    backgroundType: 'video' | string | null
  } & Pick<React.CSSProperties, 'backgroundColor' | 'minHeight'>

export type RowContentType = ContentType<RowConfig, RowProps>
