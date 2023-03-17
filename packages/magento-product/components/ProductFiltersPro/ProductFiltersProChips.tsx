import { ProductFilterEqualChip } from './ProductFilterEqualChip'
import { ProductFilterRangeChip } from './ProductFilterRangeChip'
import {
  ProductFiltersProAggregations,
  ProductFiltersProAggregationsProps,
} from './ProductFiltersProAggregations'

const defaultRenderer = {
  FilterEqualTypeInput: ProductFilterEqualChip,
  FilterRangeTypeInput: ProductFilterRangeChip,
}

export function ProductFiltersProFilterChips(props: ProductFiltersProAggregationsProps) {
  const { renderer } = props
  return <ProductFiltersProAggregations {...props} renderer={{ ...defaultRenderer, ...renderer }} />
}
