import { Controller } from '@graphcommerce/ecommerce-ui'
import type { ProductAttributeFilterInput } from '@graphcommerce/graphql-mesh'
import { isFilterTypeRange } from '../ProductListItems/filterTypes'
import { PriceSlider } from './PriceSlider'
import { ProductFilterAccordion } from './ProductFilterAccordion'
import { useProductFiltersPro } from './ProductFiltersPro'
import { FilterProps } from './ProductFiltersProAggregations'

export function ProductFilterRangeSection(props: FilterProps) {
  const { aggregation } = props
  const { attribute_code, label, options } = aggregation

  const { form, params } = useProductFiltersPro()
  const { control } = form
  const attrCode = attribute_code as keyof ProductAttributeFilterInput
  const name = `filters.${attrCode}` as const

  const param = params.filters?.[attrCode]
  if (param && !isFilterTypeRange(param)) throw new Error('Invalid filter type')

  if (!options) return null

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => {
        if (value && !isFilterTypeRange(value)) throw new Error('Invalid filter type')

        return (
          <ProductFilterAccordion
            summary={label}
            details={<PriceSlider options={options} value={value} onChange={onChange} />}
          />
        )
      }}
    />
  )
}
