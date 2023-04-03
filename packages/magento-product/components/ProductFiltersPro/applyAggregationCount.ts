import { filterNonNullableKeys } from '@graphcommerce/next-ui'
import { ProductListFiltersFragment } from '../ProductListFilters/ProductListFilters.gql'
import { ProductFilterParams } from '../ProductListItems/filterTypes'

/**
 * Apply aggregation count to aggregation options:
 *
 * - If the filter is applied and there is only one filter applied we can show the count
 * - If the filter is applied and there is more than one filter applied we don't show the count
 * - If the filter is not applied we show the count from the applied aggregation
 */
export function applyAggregationCount(
  aggregations: ProductListFiltersFragment['aggregations'],
  appliedAggregations: ProductListFiltersFragment['aggregations'],
  params: ProductFilterParams,
) {
  const filterCount = Object.keys(params.filters).filter((attribute_code) => {
    if (params.search !== null) return true
    return attribute_code !== 'category_id' && attribute_code !== 'category_uid'
  }).length

  return filterNonNullableKeys(aggregations).map((aggregation) => {
    const appliedAggregation = appliedAggregations?.find(
      (a) => a?.attribute_code === aggregation?.attribute_code,
    )
    const applied = Boolean(params.filters[aggregation.attribute_code])

    return {
      ...aggregation,
      options: filterNonNullableKeys(aggregation?.options)?.map((option) => {
        if (applied && filterCount === 1) return option
        if (applied && filterCount > 1) return { ...option, count: null }
        return {
          ...option,
          count: appliedAggregation?.options?.find((o) => o?.value === option?.value)?.count ?? 0,
        }
      }),
    }
  })
}
