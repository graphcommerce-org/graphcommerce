import React from 'react'
import { MenuItem } from '@material-ui/core'
import ChipMenu, { ChipMenuProps } from 'components/ChipMenu'
import Router from 'next/router'
import { CategoryLink, createRoute } from '../CategoryLink'
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
    const linkParams = { ...params, filters: { ...params.filters }, sort: {} }
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
        const linkParams = { ...params, sort: { ...params.sort } }
        linkParams.sort = {}
        if (option.value !== defaultSort) linkParams.sort[option.value] = true
        delete linkParams.currentPage

        if (option.value === currentSort) {
          return <MenuItem selected>{option.label}</MenuItem>
        }

        return (
          <CategoryLink key={option.value} color='inherit' {...linkParams} underline='none'>
            <MenuItem>{option.label}</MenuItem>
          </CategoryLink>
        )
      })}
    </ChipMenu>
  )
}
