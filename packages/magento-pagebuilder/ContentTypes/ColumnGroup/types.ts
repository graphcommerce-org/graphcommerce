import { ContentType, ContentTypeConfig } from '../../types'
import { AdvancedProps } from '../../utils'

type ColumnGroupConfig = ContentTypeConfig<'column-group'>

export type ColumnGroupProps = AdvancedProps & Pick<React.CSSProperties, 'display'>

export type ColumnGroupContentType = ContentType<ColumnGroupConfig, ColumnGroupProps>
