import React from 'react'
import { FilterInputTypesQuery } from 'shop/venia-ui/RootComponents/CategoryPage/getFilterInputTypes'

type ProductFiltersProps = GQLProductFiltersFragment &
  Pick<GQLCategoryProductsQueryVariables, 'filters'> & {
    filterTypes: FilterInputTypesQuery
  }

export default function ProductListFilters(props: ProductFiltersProps) {
  const { aggregations, filters, filterTypes } = props
  return <div />
}
