import { filterNonNullableKeys } from '@graphcommerce/next-ui'
import { ProductListFiltersFragment } from '../ProductListFilters/ProductListFilters.gql'
import { ProductFilterParams } from '../ProductListItems/filterTypes'

export function applyAggregationCount(
  aggregations: ProductListFiltersFragment['aggregations'],
  appliedAggregations: ProductListFiltersFragment['aggregations'],
  params: ProductFilterParams,
): ProductListFiltersFragment['aggregations'] {
  const filterCount = Object.keys(params.filters).filter((attribute_code) => {
    if (params.search !== null) return true
    return attribute_code !== 'category_id' && attribute_code !== 'category_uid'
  }).length

  return filterNonNullableKeys(aggregations).map((aggregation) => {
    const appliedAggregation = filterNonNullableKeys(appliedAggregations, ['options']).find(
      (a) => a?.attribute_code === aggregation?.attribute_code,
    )
    const isApplied = Boolean(params.filters[aggregation.attribute_code])

    return {
      ...aggregation,
      options: filterNonNullableKeys(aggregation?.options)?.map((option) => {
        if (isApplied && filterCount === 2) return option
        if (isApplied && filterCount > 2) return { ...option, count: null }
        return {
          ...option,
          count: appliedAggregation?.options?.find((o) => o?.value === option?.value)?.count ?? 0,
        }
      }),
    }
  })
}
