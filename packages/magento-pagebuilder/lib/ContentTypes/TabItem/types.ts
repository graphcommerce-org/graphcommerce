import { ContentType, ContentTypeConfig } from '../../types'
import { AdvancedProps, BackgroundImages, VerticalAlignment } from '../../utils'

export type TabItemConfig = ContentTypeConfig<'html'>

export type TabItemProps = AdvancedProps &
  BackgroundImages &
  VerticalAlignment &
  NonNullable<Pick<React.CSSProperties, 'backgroundColor' | 'minHeight'>> & {
    tabName: string | null
  }

export type TabItemContentType = ContentType<TabItemConfig, TabItemProps>
