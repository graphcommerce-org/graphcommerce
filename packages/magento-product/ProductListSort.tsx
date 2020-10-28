import { useQuery } from '@apollo/client'
import { cloneDeep } from '@apollo/client/utilities'
import { ListItem, ListItemText } from '@material-ui/core'
import CategoryLink, { useCategoryPushRoute } from '@reachdigital/magento-category/CategoryLink'
import { useProductListParamsContext } from '@reachdigital/magento-category/CategoryPageContext'
import { StoreConfigDocument } from '@reachdigital/magento-store/StoreConfig.gql'
import ChipMenu, { ChipMenuProps } from '@reachdigital/next-ui/ChipMenu'
import React from 'react'
import { ProductListSortFragment } from './ProductListSort.gql'

export type ProductListSortProps = ProductListSortFragment &
  Omit<ChipMenuProps, 'selected' | 'selectedLabel' | 'children' | 'label' | 'onDelete'>

export default function ProductListSort({ sort_fields, ...filterMenuProps }: ProductListSortProps) {
  const { params } = useProductListParamsContext()
  const pushRoute = useCategoryPushRoute()
  const { data: storeConfigQuery } = useQuery(StoreConfigDocument)
  const defaultSort = storeConfigQuery?.storeConfig?.catalog_default_sort_by

  const [currentSort = defaultSort] = Object.keys(params.sort)
  const currentOption = sort_fields?.options?.find((option) => option?.value === currentSort)

  const removeFilter = () => {
    const linkParams = cloneDeep(params)
    linkParams.sort = {}
    pushRoute(linkParams)
  }

  return (
    <ChipMenu
      variant='outlined'
      selected={currentSort !== defaultSort}
      label='Sort by'
      {...filterMenuProps}
      selectedLabel={currentOption?.label ?? ''}
      onDelete={currentSort !== defaultSort ? removeFilter : undefined}
    >
      {sort_fields?.options?.map((option) => {
        const linkParams = cloneDeep(params)
        linkParams.sort = {}
        if (option?.value !== defaultSort) linkParams.sort[option?.value ?? ''] = 'ASC'
        delete linkParams.currentPage

        return (
          <ListItem
            button
            key={option?.value ?? ''}
            dense
            selected={option?.value === currentSort}
            component={(chipProps) => (
              <CategoryLink {...chipProps} {...linkParams} color='inherit' underline='none' />
            )}
          >
            <ListItemText secondary>{option?.label}</ListItemText>
          </ListItem>
        )
      })}
    </ChipMenu>
  )
}
