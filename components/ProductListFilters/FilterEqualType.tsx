import React from 'react'
import Router from 'next/router'
import { createRoute, ProductListLink } from 'components/ProductListLink'
import { ListItem, ListItemText } from '@material-ui/core'
import { ProductListParams } from 'components/ProductList'
import FilterChip, { FilterChipProps } from './FilterChip'

type FilterEqualTypeProps = GQLProductListFiltersFragment['aggregations'][0] &
  Omit<FilterChipProps, 'selected'> & {
    params: ProductListParams
  }

export default function FilterEqualType(props: FilterEqualTypeProps) {
  const { attribute_code, count, label, options, params, ...filterChipProps } = props
  const currentFilter = params.filters[attribute_code] as GQLFilterEqualTypeInput
  const currentLabel = options.find((option) => currentFilter?.eq === option.value)?.label

  // eslint-disable-next-line no-case-declarations
  const removeFilter = () => {
    const linkParams = { ...params, filters: { ...params.filters } }
    delete linkParams.filters[attribute_code]
    delete linkParams.currentPage
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    Router.push('/[...url]', createRoute(linkParams))
  }

  return (
    <FilterChip
      key={attribute_code}
      {...filterChipProps}
      label={label}
      selected={!!currentLabel}
      selectedLabel={currentLabel}
      onDelete={currentLabel ? removeFilter : undefined}
    >
      {options.map((option) => {
        const linkParams = { ...params, filters: { ...params.filters } }
        delete linkParams.currentPage

        if (currentFilter?.eq === option.value) {
          delete linkParams.filters[attribute_code]
        } else {
          linkParams.filters[attribute_code] = { eq: option.value } as GQLFilterEqualTypeInput
        }

        return (
          <ListItem
            button
            key={option.value}
            dense
            selected={currentFilter?.eq === option.value}
            component={(chipProps) => (
              <ProductListLink {...chipProps} {...linkParams} color='inherit' underline='none' />
            )}
          >
            <ListItemText secondary>{option.label}</ListItemText>
          </ListItem>
        )
      })}
    </FilterChip>
  )
}
