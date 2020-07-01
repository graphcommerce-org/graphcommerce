import React from 'react'
import { MenuItem, ListItem, ListItemText } from '@material-ui/core'
import ChipMenu, { ChipMenuProps } from 'components/ChipMenu'
import Router from 'next/router'
import cloneDeep from 'clone-deep'
import CategoryLink, { createRoute } from '../CategoryLink'
import { ProductListParams } from '../ProductList'

export type ProductListSortProps = GQLProductListSortFragment & {
  params: ProductListParams
  defaultSort: string
} & Omit<ChipMenuProps, 'selected' | 'selectedLabel' | 'children' | 'label' | 'onDelete'>

export default function ProductListSort({
  sort_fields,
  defaultSort,
  params,
  ...filterMenuProps
}: ProductListSortProps) {
  const [currentSort = defaultSort] = Object.keys(params.sort)
  const currentOption = sort_fields.options.find((option) => option.value === currentSort)

  const removeFilter = () => {
    const linkParams = cloneDeep(params)
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    Router.push('/[...url]', createRoute(linkParams))
  }

  return (
    <ChipMenu
      selected={currentSort !== defaultSort}
      label='Sort by'
      {...filterMenuProps}
      selectedLabel={currentOption?.label}
      onDelete={currentSort !== defaultSort ? removeFilter : undefined}
    >
      {sort_fields.options.map((option) => {
        const linkParams = cloneDeep(params)
        linkParams.sort = {}
        if (option.value !== defaultSort) linkParams.sort[option.value] = true
        delete linkParams.currentPage

        return (
          <ListItem
            button
            key={option.value}
            dense
            selected={option.value === currentSort}
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
