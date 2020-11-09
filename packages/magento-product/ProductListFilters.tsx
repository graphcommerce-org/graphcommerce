import { ChipMenuProps } from '@reachdigital/next-ui/ChipMenu'
import React from 'react'
import { ProductListFiltersFragment } from './ProductListFilters.gql'
import FilterCheckboxType from './ProductListFilters/FilterCheckboxType'
import FilterEqualType from './ProductListFilters/FilterEqualType'
import FilterRangeType from './ProductListFilters/FilterRangeType'
import { FilterTypes } from './ProductListItems/filterTypes'

type ProductFiltersProps = ProductListFiltersFragment & {
  filterTypes: FilterTypes
} & Omit<ChipMenuProps, 'selected' | 'selectedLabel' | 'children' | 'label' | 'onDelete'>

export default function ProductListFilters(props: ProductFiltersProps) {
  const { aggregations, filterTypes, ...chipMenuProps } = props

  return (
    <>
      {aggregations?.map((aggregation) => {
        if (!aggregation?.attribute_code || aggregation?.attribute_code === 'category_id')
          return null
        switch (filterTypes[aggregation.attribute_code]) {
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
