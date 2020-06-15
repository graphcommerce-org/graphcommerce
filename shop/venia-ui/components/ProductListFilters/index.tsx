import React from 'react'
import { ProductListParams } from '../ProductList'
import { ProductListLink } from '../ProductListLink'

type ProductFiltersProps = GQLProductListFiltersFragment & { params: ProductListParams }

export default function ProductListFilters(props: ProductFiltersProps) {
  const { aggregations, params } = props

  return (
    <div>
      {aggregations.map((aggregation) => {
        if (aggregation.attribute_code === 'category_id') return null
        return (
          <div key={aggregation.attribute_code}>
            {aggregation.label}
            <ul>
              {aggregation.options.map((option) => {
                const linkParams = {
                  ...params,
                  filters: {
                    ...params.filters,
                    [aggregation.attribute_code]: { eq: option.value },
                  },
                }
                return (
                  <ProductListLink key={option.value} {...linkParams}>
                    {option.label}
                  </ProductListLink>
                )
              })}
              <li />
            </ul>
          </div>
        )
      })}
    </div>
  )
}
