import { filterNonNullableKeys } from '@graphcommerce/next-ui'
import { ProductListFiltersFragment } from '../ProductListFilters/ProductListFilters.gql'
import { ProductFilterParams } from '../ProductListItems/filterTypes'

export function excludeCategory(
  aggregations: ProductListFiltersFragment['aggregations'],
  params: ProductFilterParams,
) {
  return filterNonNullableKeys(aggregations).filter(({ attribute_code }) => {
    if (params.search !== null) return true
    return attribute_code !== 'category_id' && attribute_code !== 'category_uid'
  })
}

export function activeAggregations(
  aggregations: ProductListFiltersFragment['aggregations'],
  params: ProductFilterParams,
) {
  return excludeCategory(aggregations, params).filter(
    ({ attribute_code }) =>
      params.filters[attribute_code]?.from ||
      params.filters[attribute_code]?.to ||
      params.filters[attribute_code]?.in,
  )
}
