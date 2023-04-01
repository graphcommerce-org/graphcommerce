import { filterNonNullableKeys } from '@graphcommerce/next-ui'
import { ProductListQuery } from '../ProductList/ProductList.gql'
import { ProductFiltersQuery } from '../ProductListFilters'
import { ProductListParams } from '../ProductListItems/filterTypes'

export function applyAggregationCount(
  filters: ProductFiltersQuery['filters'],
  products: ProductListQuery['products'],
  params: ProductListParams,
) {
  const filtersApplied = Object.keys(params.filters)

  const newFilters: ProductFiltersQuery = {
    ...filters,
    filters: {
      ...filters,
      aggregations: filterNonNullableKeys(filters?.aggregations).map((filterAgg) => {
        const filter = products?.aggregations?.find(
          (a) => a?.attribute_code === filterAgg?.attribute_code,
        )

        return {
          ...filterAgg,
          count: filter?.count ?? 0,
          options: filterNonNullableKeys(filterAgg?.options)?.map((option) => {
            const isFilterApplied = Boolean(params.filters[filterAgg.attribute_code])
            if (isFilterApplied && filtersApplied.length === 2) return option
            if (isFilterApplied && filtersApplied.length > 2) return { ...option, count: null }
            return {
              ...option,
              count: filter?.options?.find((o) => o?.value === option?.value)?.count ?? 0,
            }
          }),
        }
      }),
    },
  }
  return newFilters
}
