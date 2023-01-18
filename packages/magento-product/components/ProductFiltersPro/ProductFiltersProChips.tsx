import { FilterEqualType } from './FilterEqualType'
import { FilterRangeType } from './FilterRangeType'
import {
  ProductFiltersProAggregations,
  ProductFiltersProAggregationsProps,
} from './ProductFiltersProAggregations'

const defaultRenderer = {
  FilterEqualTypeInput: FilterEqualType,
  FilterRangeTypeInput: FilterRangeType,
  FilterMatchTypeInput: () => <>notimplemented</>,
}

export function ProductFiltersProFilterChips(props: ProductFiltersProAggregationsProps) {
  const { renderer } = props

  return <ProductFiltersProAggregations {...props} renderer={{ ...defaultRenderer, ...renderer }} />
}
