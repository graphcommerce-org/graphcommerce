import { ButtonLinkProps } from '../../components/ButtonLink/getButtonLinkProps'
import { MediaBackgroundProps } from '../../components/MediaBackground/getMediaBackgroundProps'
import { ContentType, ContentTypeConfig } from '../../types'
import { AdvancedProps } from '../../utils'

type BannerConfig = ContentTypeConfig<'column-group'> & {
  appearance: 'collage-right' | 'collage-left' | 'collage-center' | 'poster'
}

export type ShowButton = 'always' | 'never' | 'hover'
export type ShowOverlay = 'always' | 'never' | 'hover'

export type BannerProps = AdvancedProps &
  ButtonLinkProps &
  MediaBackgroundProps &
  Pick<React.CSSProperties, 'minHeight' | 'backgroundColor'> & {
    content?: string
    showButton?: ShowButton
    showOverlay?: ShowOverlay
    overlayColor?: string
  }

export type BannerContentType = ContentType<BannerConfig, BannerProps>
