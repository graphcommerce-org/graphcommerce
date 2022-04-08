import { ContentType, ContentTypeConfig } from '../../types'
import { AdvancedProps, BackgroundImages, VerticalAlignment } from '../../utils'

type RowConfig = ContentTypeConfig<'row'> & {
  appearance: 'contained' | 'full-width' | 'full-bleed'
}

export type VideoProps = {
  videoSrc: string | null
  videoFallbackSrc: string | null
  videoLoop: boolean
  videoPlayOnlyVisible: boolean
  videoLazyLoading: boolean
  videoOverlayColor: string | null
}

type RowProps = AdvancedProps &
  VerticalAlignment &
  VideoProps &
  BackgroundImages & {
    enableParallax: boolean
    parallaxSpeed: number
    backgroundType: 'video' | string | null
  } & Pick<React.CSSProperties, 'backgroundColor' | 'minHeight'>

export type RowContentType = ContentType<RowConfig, RowProps>
