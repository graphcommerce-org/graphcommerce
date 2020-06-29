import React from 'react'
import { makeStyles, ListItem, ListItemText } from '@material-ui/core'
import Router from 'next/router'

import clsx from 'clsx'
import { ProductListLink, createRoute } from 'components/ProductListLink'
import { ProductListParams, FilterTypeMap } from '../ProductList'
import FilterChip from './FilterChip'
import { FilterRangeType } from './FilterRangeType'
import FilterEqualType from './FilterEqualType'

type ProductFiltersProps = GQLProductListFiltersFragment & {
  params: ProductListParams
  filterTypeMap: FilterTypeMap
} & JSX.IntrinsicElements['div']

const useProductListFiltersStyles = makeStyles(
  () => ({
    root: {
      display: 'flex',
    },
    chip: {
      marginRight: 6,
    },
  }),
  { name: 'ProductListFilters' },
)

export default function ProductListFilters(props: ProductFiltersProps) {
  const { aggregations, params, filterTypeMap, ...divProps } = props
  const classes = useProductListFiltersStyles(props)

  return (
    <div {...divProps} className={clsx(classes.root, divProps.className)}>
      {aggregations.map((aggregation) => {
        if (aggregation.attribute_code === 'category_id') return null

        const currentFilter = params.filters[aggregation.attribute_code] ?? {}

        let currentLabel: string | undefined

        switch (filterTypeMap[aggregation.attribute_code]) {
          case 'FilterEqualTypeInput':
            return <FilterEqualType {...aggregation} params={params} className={classes.chip} />
          case 'FilterRangeTypeInput':
            return <FilterRangeType {...aggregation} params={params} className={classes.chip} />

          case 'FilterMatchTypeInput':
            return (
              <FilterChip
                key={aggregation.attribute_code}
                {...aggregation}
                className={classes.chip}
                label={currentLabel ?? aggregation.label}
                selected={!!currentLabel}
              >
                Not implemented
              </FilterChip>
            )
        }
      })}
    </div>
  )
}
