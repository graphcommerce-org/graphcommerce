import { ContentType, ContentTypeConfig } from '../../types'
import { AdvancedProps, BackgroundImages, VerticalAlignment } from '../../utils'

type ColumnConfig = ContentTypeConfig<'button-item'> & {
  appearance: 'align-top' | 'align-center' | 'align-bottom' | 'full-height'
}

export type ColumnProps = AdvancedProps &
  VerticalAlignment &
  BackgroundImages &
  NonNullable<Pick<React.CSSProperties, 'backgroundColor' | 'minHeight' | 'width'>>

export type ColumnContentType = ContentType<ColumnConfig, ColumnProps>
