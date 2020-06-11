import React from 'react'

export type ProductSortProps = GQLProductSortFragment & { sort?: GQLProductAttributeSortInput }

export default function ProductSort({ sort_fields, sort }: ProductSortProps) {
  return (
    <div>
      Sort by
      {sort_fields.options.map((option) => (
        <div key={option.value}>{option.label}</div>
      ))}
    </div>
  )
}
