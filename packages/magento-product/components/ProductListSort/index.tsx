import { useQuery } from '@apollo/client'
import { cloneDeep } from '@apollo/client/utilities'
import { StoreConfigDocument } from '@graphcommerce/magento-store'
import { ChipMenu, ChipMenuProps } from '@graphcommerce/next-ui'
import { ListItem, ListItemText } from '@mui/material'
import React from 'react'
import { useProductListLinkReplace } from '../../hooks/useProductListLinkReplace'
import { useProductListParamsContext } from '../../hooks/useProductListParamsContext'
import ProductListLink from '../ProductListLink/ProductListLink'
import { ProductListSortFragment } from './ProductListSort.gql'

export type ProductListSortProps = ProductListSortFragment &
  Omit<ChipMenuProps, 'selected' | 'selectedLabel' | 'children' | 'label' | 'onDelete'>

export default function ProductListSort(props: ProductListSortProps) {
  const { sort_fields, total_count, ...filterMenuProps } = props
  const { params } = useProductListParamsContext()
  const replaceRoute = useProductListLinkReplace()
  const { data: storeConfigQuery } = useQuery(StoreConfigDocument)
  const defaultSort = storeConfigQuery?.storeConfig?.catalog_default_sort_by

  const [currentSort = defaultSort] = Object.keys(params.sort)
  const currentOption = sort_fields?.options?.find((option) => option?.value === currentSort)
  const selected = currentSort !== defaultSort
  const label = 'Sort By'

  const removeFilter = () => {
    const linkParams = cloneDeep(params)
    linkParams.sort = {}
    replaceRoute(linkParams)
  }

  if (!total_count) return null

  return (
    <ChipMenu
      variant='outlined'
      selected={selected}
      label={label}
      {...filterMenuProps}
      selectedLabel={selected ? currentOption?.label ?? '' : label}
      onDelete={selected ? removeFilter : undefined}
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
            component={React.memo(
              React.forwardRef<HTMLAnchorElement>((chipProps, ref) => (
                <ProductListLink
                  {...chipProps}
                  {...linkParams}
                  ref={ref}
                  color='inherit'
                  underline='none'
                  link={{ scroll: false, replace: true }}
                />
              )),
            )}
          >
            <ListItemText>{option?.label}</ListItemText>
          </ListItem>
        )
      })}
    </ChipMenu>
  )
}
