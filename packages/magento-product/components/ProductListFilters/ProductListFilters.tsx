import { ChipMenuProps } from '@graphcommerce/next-ui'
import { Theme, useMediaQuery } from '@mui/material'
import { ProductListQuery } from '../ProductList/ProductList.gql'
import { FilterTypes } from '../ProductListItems/filterTypes'
import { FilterCheckboxType } from './FilterCheckboxType'
import { FilterEqualType } from './FilterEqualType'
import { useFilterForm } from './FilterFormContext'
import { FilterRangeType } from './FilterRangeType'
import { ProductListFiltersFragment } from './ProductListFilters.gql'

export type ProductFiltersProps = ProductListFiltersFragment & {
  filterTypes: FilterTypes
} & Omit<
    ChipMenuProps,
    'selected' | 'selectedLabel' | 'children' | 'label' | 'onDelete' | 'openEl' | 'setOpenEl'
  > &
  ProductListQuery

function FilterChip({
  aggregation,
  filterTypes,
  ...chipMenuProps
}: Omit<ProductFiltersProps, keyof ProductListFiltersFragment> & {
  aggregation: NonNullable<NonNullable<ProductListFiltersFragment['aggregations']>[0]>
}) {
  switch (filterTypes[aggregation.attribute_code]) {
    case 'FilterEqualTypeInput':
      if (
        aggregation.options?.[0]?.label === '0' ||
        aggregation.options?.[1]?.label === '0' ||
        aggregation.options?.[0]?.label === '1' ||
        aggregation.options?.[1]?.label === '1'
      ) {
        return (
          <FilterCheckboxType
            key={aggregation.attribute_code}
            {...aggregation}
            {...chipMenuProps}
          />
        )
      }

      return (
        <FilterEqualType key={aggregation.attribute_code} {...aggregation} {...chipMenuProps} />
      )

    case 'FilterRangeTypeInput':
      return (
        <FilterRangeType key={aggregation.attribute_code} {...aggregation} {...chipMenuProps} />
      )

    default:
      console.warn(
        `[@graphcommerce/magento-product/components/ProductListFilters]: filterType "${
          filterTypes[aggregation.attribute_code]
        }" is not supported`,
      )
      return null // `FilterMatchTypeInput not ${aggregation.attribute_code}`
  }
}

export function ProductListFilters(props: ProductFiltersProps) {
  const { aggregations } = props
  const { form } = useFilterForm()
  if (!form) return null

  return (
    <>
      {aggregations?.map((aggregation) =>
        aggregation ? (
          <FilterChip key={aggregation.attribute_code} aggregation={aggregation} {...props} />
        ) : null,
      )}
    </>
  )
}
