import { ColumnGroup } from './ColumnGroup'
import { columnGroupAggregator } from './columnGroupAggregator'
import { ColumnGroupContentType } from './types'

export const columnGroup: ColumnGroupContentType = {
  configAggregator: columnGroupAggregator,
  component: ColumnGroup,
}
