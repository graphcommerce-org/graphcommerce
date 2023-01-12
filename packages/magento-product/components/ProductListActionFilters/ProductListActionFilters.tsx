import { filterNonNullableKeys } from '@graphcommerce/next-ui'
import { PanelProps } from '@graphcommerce/next-ui/ChipPanel/types'
import { ProductListQuery } from '../ProductList/ProductList.gql'
import { FilterTypes } from '../ProductListItems/filterTypes'
import { FilterCheckboxType } from './FilterCheckboxType'
import { FilterEqualType } from './FilterEqualType'
import { FilterRangeType } from './FilterRangeType'
import { ProductListActionFiltersFragment } from './ProductListActionFilters.gql'

export type ProductActionFiltersProps = ProductListActionFiltersFragment & {
  filterTypes: FilterTypes
} & Omit<PanelProps, 'active' | 'label'> &
  ProductListQuery

function FilterChip({
  aggregation,
  filterTypes,
  ...etc
}: Omit<ProductActionFiltersProps, keyof ProductListActionFiltersFragment> & {
  aggregation: NonNullable<NonNullable<ProductListActionFiltersFragment['aggregations']>[0]>
}) {
  switch (filterTypes[aggregation.attribute_code]) {
    case 'FilterEqualTypeInput':
      if (
        aggregation.options?.[0]?.label === '0' ||
        aggregation.options?.[1]?.label === '0' ||
        aggregation.options?.[0]?.label === '1' ||
        aggregation.options?.[1]?.label === '1'
      ) {
        return <FilterCheckboxType key={aggregation.attribute_code} {...aggregation} {...etc} />
      }

      return <FilterEqualType key={aggregation.attribute_code} {...aggregation} {...etc} />

    case 'FilterRangeTypeInput':
      return <FilterRangeType key={aggregation.attribute_code} {...aggregation} {...etc} />

    default:
      console.warn(
        `[@graphcommerce/magento-product/components/ProductListFilters]: filterType "${
          filterTypes[aggregation.attribute_code]
        }" is not supported`,
      )
      return null // `FilterMatchTypeInput not ${aggregation.attribute_code}`
  }
}

export function ProductListActionFilters(props: ProductActionFiltersProps) {
  const { aggregations } = props
  return (
    <>
      {filterNonNullableKeys(aggregations)
        .filter((aggregation) => aggregation.attribute_code !== 'category_id')
        .map((aggregation) => (
          <FilterChip key={aggregation.attribute_code} aggregation={aggregation} {...props} />
        ))}
    </>
  )
}
