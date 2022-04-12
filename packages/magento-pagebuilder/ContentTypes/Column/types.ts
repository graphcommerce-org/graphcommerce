import { ImageBackgroundProps } from '../../components/MediaBackground/getImageBackgroundProps'
import { ContentType, ContentTypeConfig } from '../../types'
import { AdvancedProps, VerticalAlignment } from '../../utils'

type ColumnConfig = ContentTypeConfig<'button-item'> & {
  appearance: 'align-top' | 'align-center' | 'align-bottom' | 'full-height'
}

export type ColumnProps = AdvancedProps &
  VerticalAlignment &
  ImageBackgroundProps &
  NonNullable<Pick<React.CSSProperties, 'backgroundColor' | 'minHeight' | 'width'>>

export type ColumnContentType = ContentType<ColumnConfig, ColumnProps>
