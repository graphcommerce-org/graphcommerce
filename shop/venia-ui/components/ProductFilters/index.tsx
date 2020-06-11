import React from 'react'

type ProductFiltersProps = GQLProductFiltersFragment & {
  filters: GQLProductAttributeFilterInput
  filterTypes: GQLFilterInputTypesQuery
}

export default function ProductFilters(props: ProductFiltersProps) {
  const { aggregations, filters, filterTypes } = props
  return <div />
}
