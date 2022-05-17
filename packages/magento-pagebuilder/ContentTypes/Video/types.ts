import { ContentType, ContentTypeConfig } from '../../types'
import { AdvancedProps } from '../../utils'

export type VideoConfig = ContentTypeConfig<'html'>

export type VideoProps = AdvancedProps & {
  url: string | null
  autoplay: boolean
  muted: boolean
  maxWidth: string
}

export type VideoContentType = ContentType<VideoConfig, VideoProps>
