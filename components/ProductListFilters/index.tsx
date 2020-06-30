import React from 'react'
import { ProductListParams, FilterTypeMap } from '../ProductList'
import FilterChip from './FilterChip'
import { FilterRangeType } from './FilterRangeType'
import FilterEqualType from './FilterEqualType'

type ProductFiltersProps = GQLProductListFiltersFragment & {
  params: ProductListParams
  filterTypeMap: FilterTypeMap
}

export default function ProductListFilters(props: ProductFiltersProps) {
  const { aggregations, params, filterTypeMap } = props

  return (
    <>
      {aggregations.map((aggregation) => {
        if (aggregation.attribute_code === 'category_id') return null
        switch (filterTypeMap[aggregation.attribute_code]) {
          case 'FilterEqualTypeInput':
            return (
              <FilterEqualType key={aggregation.attribute_code} {...aggregation} params={params} />
            )
          case 'FilterRangeTypeInput':
            return (
              <FilterRangeType key={aggregation.attribute_code} {...aggregation} params={params} />
            )
        }
        return 'FilterMatchTypeInput not implemented'
      })}
    </>
  )
}
