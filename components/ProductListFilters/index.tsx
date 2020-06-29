import React from 'react'
import { makeStyles, ListItem, ListItemText, Slider } from '@material-ui/core'
import Router from 'next/router'

import clsx from 'clsx'
import { ProductListLink, createRoute } from 'components/ProductListLink'
import { ProductListParams, FilterTypeMap } from '../ProductList'
import FilterChip from './FilterChip'
import { FilterRangeTypeInput } from './FilterRangeTypeInput'

type ProductFiltersProps = GQLProductListFiltersFragment & {
  params: ProductListParams
  filterTypeMap: FilterTypeMap
} & JSX.IntrinsicElements['div']

const useProductListFiltersStyles = makeStyles(() => ({
  root: {
    display: 'flex',
  },
  chip: {
    marginRight: 6,
  },
}))

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
            currentLabel = aggregation.options.find(
              (option) => (currentFilter as GQLFilterEqualTypeInput).eq === option.value,
            )?.label

            // eslint-disable-next-line no-case-declarations
            const removeFilter = () => {
              const linkParams = { ...params, filters: { ...params.filters } }
              delete linkParams.filters[aggregation.attribute_code]
              delete linkParams.currentPage
              // eslint-disable-next-line @typescript-eslint/no-floating-promises
              Router.push('/[...url]', createRoute(linkParams))
            }

            return (
              <FilterChip
                key={aggregation.attribute_code}
                className={classes.chip}
                label={currentLabel ?? aggregation.label}
                selected={!!currentLabel}
                onDelete={currentLabel ? removeFilter : undefined}
              >
                {aggregation.options.map((option) => {
                  const linkParams = { ...params, filters: { ...params.filters } }
                  delete linkParams.currentPage

                  if ((currentFilter as GQLFilterEqualTypeInput).eq === option.value) {
                    delete linkParams.filters[aggregation.attribute_code]
                  } else {
                    linkParams.filters[aggregation.attribute_code] = {
                      eq: option.value,
                    } as GQLFilterEqualTypeInput
                  }

                  const isSelected = (currentFilter as GQLFilterEqualTypeInput).eq === option.value

                  return (
                    <ListItem
                      button
                      key={option.value}
                      dense
                      selected={isSelected}
                      component={(chipProps) => (
                        <ProductListLink
                          {...chipProps}
                          {...linkParams}
                          color='inherit'
                          underline='none'
                        />
                      )}
                    >
                      <ListItemText secondary>{option.label}</ListItemText>
                    </ListItem>
                  )
                })}
              </FilterChip>
            )
          case 'FilterRangeTypeInput':
            return (
              <FilterChip
                key={aggregation.attribute_code}
                {...aggregation}
                className={classes.chip}
                label={currentLabel ?? aggregation.label}
                selected={!!currentLabel}
              >
                <FilterRangeTypeInput {...aggregation} />
              </FilterChip>
            )

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
