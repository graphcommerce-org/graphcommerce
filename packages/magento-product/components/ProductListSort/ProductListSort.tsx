import { useQuery, cloneDeep } from '@graphcommerce/graphql'
import { StoreConfigDocument } from '@graphcommerce/magento-store'
import type { ChipMenuProps } from '@graphcommerce/next-ui'
import { ChipMenu, extendableComponent } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react'
import type { SxProps, Theme } from '@mui/material'
import { ListItem, ListItemText } from '@mui/material'
import React from 'react'
import { useProductListLinkReplace } from '../../hooks/useProductListLinkReplace'
import { useProductListParamsContext } from '../../hooks/useProductListParamsContext'
import { ProductListLink } from '../ProductListLink/ProductListLink'
import type { ProductListSortFragment } from './ProductListSort.gql'

export type ProductListSortProps = ProductListSortFragment &
  Omit<ChipMenuProps, 'selected' | 'selectedLabel' | 'children' | 'label' | 'onDelete'> & {
    sx?: SxProps<Theme>
  }

const name = 'ProductListSort'
const parts = ['menu', 'item', 'link'] as const
const { classes } = extendableComponent(name, parts)

export function ProductListSort(props: ProductListSortProps) {
  const { sort_fields, total_count, sx = [], ...filterMenuProps } = props
  const { params } = useProductListParamsContext()
  const replaceRoute = useProductListLinkReplace()
  const { data: storeConfigQuery } = useQuery(StoreConfigDocument)
  const defaultSort = storeConfigQuery?.storeConfig?.catalog_default_sort_by

  const [currentSort = defaultSort] = Object.keys(params.sort)
  const currentOption = sort_fields?.options?.find((option) => option?.value === currentSort)
  const selected = currentSort !== defaultSort
  const label = <Trans id='Sort By' />

  const removeFilter = () => {
    const linkParams = cloneDeep(params)
    linkParams.sort = {}
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    replaceRoute(linkParams)
  }

  if (!total_count) return null

  return (
    <ChipMenu
      className={classes.menu}
      variant='outlined'
      selected={selected}
      label={label}
      {...filterMenuProps}
      selectedLabel={selected ? (currentOption?.label ?? '') : label}
      onDelete={selected ? removeFilter : undefined}
      sx={Array.isArray(sx) ? sx : [sx]}
    >
      {sort_fields?.options?.map((option) => {
        const linkParams = cloneDeep(params)
        linkParams.sort = {}
        if (option?.value !== defaultSort) linkParams.sort[option?.value ?? ''] = 'ASC'
        delete linkParams.currentPage

        return (
          <ListItem
            className={classes.item}
            button
            key={option?.value ?? ''}
            dense
            selected={option?.value === currentSort}
            component={React.memo(
              // eslint-disable-next-line react/no-unstable-nested-components
              React.forwardRef<HTMLAnchorElement>((chipProps, ref) => (
                <ProductListLink
                  {...chipProps}
                  {...linkParams}
                  className={classes.link}
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
