import type { ProductFiltersProAggregationsProps } from './ProductFiltersProAggregations'
import {
  ProductFiltersProAggregations,
  productFiltersProChipRenderer,
} from './ProductFiltersProAggregations'

/**
 * @deprecated Not used anymore, use `<ProductFiltersProAggregations
 *   renderer={productFiltersProChipRenderer}/>`
 * @public
 */
export function ProductFiltersProFilterChips(props: ProductFiltersProAggregationsProps) {
  const { renderer } = props
  return (
    <ProductFiltersProAggregations
      {...props}
      renderer={{ ...productFiltersProChipRenderer, ...renderer }}
    />
  )
}
