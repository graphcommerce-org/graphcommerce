import {
  ProductFiltersProAggregations,
  ProductFiltersProAggregationsProps,
  productFiltersProChipRenderer,
} from './ProductFiltersProAggregations'

/**
 * @deprecated Not used anymore, use `<ProductFiltersProAggregations renderer={productFiltersProChipRenderer}/>`
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
