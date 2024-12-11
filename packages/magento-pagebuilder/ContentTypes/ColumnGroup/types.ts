import type { ContentType, ContentTypeConfig } from '../../types'

type ColumnGroupConfig = ContentTypeConfig<'column-group'>

export type ButtonItemProps = Pick<React.CSSProperties, 'display'>

export type ColumnGroupContentType = ContentType<ColumnGroupConfig, ButtonItemProps>
