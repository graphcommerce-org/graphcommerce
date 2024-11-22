import type { ChipMenuProps } from '@graphcommerce/next-ui'
import type { FilterTypes } from '../ProductListItems/getFilterTypes'
import { FilterCheckboxType } from './FilterCheckboxType'
import { FilterEqualType } from './FilterEqualType'
import { FilterRangeType } from './FilterRangeType'
import type { ProductListFiltersFragment } from './ProductListFilters.gql'

export type ProductFiltersProps = ProductListFiltersFragment & {
  filterTypes: FilterTypes
} & Omit<ChipMenuProps, 'selected' | 'selectedLabel' | 'children' | 'label' | 'onDelete'>

export function ProductListFilters(props: ProductFiltersProps) {
  const { aggregations, filterTypes, ...chipMenuProps } = props

  return (
    <>
      {aggregations?.map((aggregation) => {
        if (
          !aggregation?.attribute_code ||
          aggregation?.attribute_code === 'category_id' ||
          aggregation?.attribute_code === 'category_uid'
        )
          return null

        switch (filterTypes[aggregation.attribute_code]) {
          case 'BOOLEAN':
            return (
              <FilterCheckboxType
                key={aggregation.attribute_code}
                {...aggregation}
                {...chipMenuProps}
              />
            )
          case 'SELECT':
          case 'MULTISELECT':
            return (
              <FilterEqualType
                key={aggregation.attribute_code}
                {...aggregation}
                {...chipMenuProps}
              />
            )
          case 'PRICE':
            return (
              <FilterRangeType
                key={aggregation.attribute_code}
                {...aggregation}
                {...chipMenuProps}
              />
            )
        }

        // console.log(
        //   'Filter not recognized',
        //   aggregation.attribute_code,
        //   aggregation.__typename,
        //   filterTypes[aggregation.attribute_code],
        // )
        return null // `FilterMatchTypeInput not ${aggregation.attribute_code}`
      })}
    </>
  )
}
