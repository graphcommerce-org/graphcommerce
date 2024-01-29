import { ContentType, ContentTypeConfig } from '../../types'
import { AdvancedProps } from '../../utils'

type ColumnLineConfig = ContentTypeConfig<'column-group'>

export type ColumnLineProps = AdvancedProps & Pick<React.CSSProperties, 'display' | 'width'>

export type ColumnLineContentType = ContentType<ColumnLineConfig, ColumnLineProps>
