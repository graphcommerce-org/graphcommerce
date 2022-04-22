import { Column } from './Column'
import { columnAggregator } from './columnAggregator'
import { ColumnContentType } from './types'

export const column: ColumnContentType = {
  configAggregator: columnAggregator,
  component: Column,
}
