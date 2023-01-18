import { FilterEqualType } from './FilterEqualType'
import { ProductFilterRangeChip } from './ProductFilterRangeChip'
import {
  ProductFiltersProAggregations,
  ProductFiltersProAggregationsProps,
} from './ProductFiltersProAggregations'

const defaultRenderer = {
  FilterEqualTypeInput: FilterEqualType,
  FilterRangeTypeInput: ProductFilterRangeChip,
  FilterMatchTypeInput: () => <>notimplemented</>,
}

export function ProductFiltersProFilterChips(props: ProductFiltersProAggregationsProps) {
  const { renderer } = props
  return <ProductFiltersProAggregations {...props} renderer={{ ...defaultRenderer, ...renderer }} />
}
