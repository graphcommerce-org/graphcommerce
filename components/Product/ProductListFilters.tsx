import { ChipMenuProps } from 'components/ChipMenu'
import React from 'react'
import FilterCheckboxType from './ProductListFilters/FilterCheckboxType'
import FilterEqualType from './ProductListFilters/FilterEqualType'
import FilterRangeType from './ProductListFilters/FilterRangeType'
import { FilterTypeMap } from './ProductListItems/filterTypes'

type ProductFiltersProps = GQLProductListFiltersFragment & {
  filterTypeMap: FilterTypeMap
} & Omit<ChipMenuProps, 'selected' | 'selectedLabel' | 'children' | 'label' | 'onDelete'>

export default function ProductListFilters(props: ProductFiltersProps) {
  const { aggregations, filterTypeMap, ...chipMenuProps } = props

  return (
    <>
      {aggregations?.map((aggregation) => {
        if (!aggregation?.attribute_code || aggregation?.attribute_code === 'category_id')
          return null
        switch (filterTypeMap[aggregation.attribute_code]) {
          case 'FilterEqualTypeInput':
            if (aggregation.options?.[0]?.label === '1') {
              return (
                <FilterCheckboxType
                  key={aggregation.attribute_code}
                  {...aggregation}
                  {...chipMenuProps}
                />
              )
            }

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
