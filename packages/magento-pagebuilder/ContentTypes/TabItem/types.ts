import type { ImageBackgroundProps } from '../../components/MediaBackground/getImageBackgroundProps'
import type { ContentType, ContentTypeConfig } from '../../types'
import type { AdvancedProps, VerticalAlignment } from '../../utils'

export type TabItemConfig = ContentTypeConfig<'html'>

export type TabItemProps = AdvancedProps &
  ImageBackgroundProps &
  VerticalAlignment &
  NonNullable<Pick<React.CSSProperties, 'backgroundColor' | 'minHeight'>> & {
    tabName: string | null
  }

export type TabItemContentType = ContentType<TabItemConfig, TabItemProps>
