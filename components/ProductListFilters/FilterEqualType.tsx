import React from 'react'
import Router from 'next/router'
import { createRoute, CategoryLink } from 'components/CategoryLink'
import { ListItem, ListItemText } from '@material-ui/core'
import { ProductListParams } from 'components/ProductList'
import ChipMenu, { ChipMenuProps } from '../ChipMenu'

type FilterEqualTypeProps = GQLProductListFiltersFragment['aggregations'][0] &
  Omit<ChipMenuProps, 'selected'> & {
    params: ProductListParams
  }

export default function FilterEqualType(props: FilterEqualTypeProps) {
  const { attribute_code, count, label, options, params, ...filterMenuProps } = props
  const currentFilter = params.filters[attribute_code] as GQLFilterEqualTypeInput
  const currentLabel = options.find((option) => currentFilter?.eq === option.value)?.label

  const removeFilter = () => {
    const linkParams = { ...params, filters: { ...params.filters } }
    delete linkParams.filters[attribute_code]
    delete linkParams.currentPage
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    Router.push('/[...url]', createRoute(linkParams))
  }

  return (
    <ChipMenu
      key={attribute_code}
      {...filterMenuProps}
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
              <CategoryLink {...chipProps} {...linkParams} color='inherit' underline='none' />
            )}
          >
            <ListItemText secondary>{option.label}</ListItemText>
          </ListItem>
        )
      })}
    </ChipMenu>
  )
}
