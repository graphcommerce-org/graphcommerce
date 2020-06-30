import React from 'react'
import { ChipMenuProps } from 'components/ChipMenu'
import { ProductListParams, FilterTypeMap } from '../ProductList'
import { FilterRangeType } from './FilterRangeType'
import FilterEqualType from './FilterEqualType'

type ProductFiltersProps = GQLProductListFiltersFragment & {
  params: ProductListParams
  filterTypeMap: FilterTypeMap
} & Omit<ChipMenuProps, 'selected' | 'selectedLabel' | 'children' | 'label' | 'onDelete'>

export default function ProductListFilters(props: ProductFiltersProps) {
  const { aggregations, params, filterTypeMap, ...chipMenuProps } = props

  return (
    <>
      {aggregations.map((aggregation) => {
        if (aggregation.attribute_code === 'category_id') return null
        switch (filterTypeMap[aggregation.attribute_code]) {
          case 'FilterEqualTypeInput':
            return (
              <FilterEqualType
                key={aggregation.attribute_code}
                {...aggregation}
                params={params}
                {...chipMenuProps}
              />
            )
          case 'FilterRangeTypeInput':
            return (
              <FilterRangeType
                key={aggregation.attribute_code}
                {...aggregation}
                params={params}
                {...chipMenuProps}
              />
            )
        }
        return 'FilterMatchTypeInput not implemented'
      })}
    </>
  )
}
