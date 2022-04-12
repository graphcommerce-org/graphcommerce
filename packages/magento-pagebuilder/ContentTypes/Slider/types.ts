import { ContentType, ContentTypeConfig } from '../../types'
import { AdvancedProps } from '../../utils'

export type SliderConfig = ContentTypeConfig<'html'>

export type SliderProps = AdvancedProps & {
  minHeight: string
  autoplay: boolean
  fade: boolean
  infinite: boolean
  showArrows: boolean
  showDots: boolean
  autoplaySpeed?: number
}

export type SliderContentType = ContentType<SliderConfig, SliderProps>
