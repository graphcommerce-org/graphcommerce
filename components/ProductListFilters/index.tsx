import React from 'react'
import { ChipMenuProps } from 'components/ChipMenu'
import { FilterTypeMap } from '../ProductListItems/filterTypes'
import { FilterRangeType } from './FilterRangeType'
import FilterEqualType from './FilterEqualType'

type ProductFiltersProps = GQLProductListFiltersFragment & {
  filterTypeMap: FilterTypeMap
} & Omit<ChipMenuProps, 'selected' | 'selectedLabel' | 'children' | 'label' | 'onDelete'>

export default function ProductListFilters(props: ProductFiltersProps) {
  const { aggregations, filterTypeMap, ...chipMenuProps } = props

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
                {...chipMenuProps}
              />
            )
          case 'FilterRangeTypeInput':
            return (
              <FilterRangeType
                key={aggregation.attribute_code}
                {...aggregation}
                {...chipMenuProps}
              />
            )
        }
        return 'FilterMatchTypeInput not implemented'
      })}
    </>
  )
}
