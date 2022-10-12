import { useQuery, cloneDeep } from '@graphcommerce/graphql'
import { StoreConfigDocument } from '@graphcommerce/magento-store'
import { ChipMenu, ChipMenuProps, extendableComponent } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react'
import { ListItem, ListItemText, SxProps, Theme } from '@mui/material'
import React, { useState } from 'react'
import { useProductListLinkReplace } from '../../hooks/useProductListLinkReplace'
import { useProductListParamsContext } from '../../hooks/useProductListParamsContext'
import { ProductListLink } from '../ProductListLink/ProductListLink'
import { ProductListSortFragment } from './ProductListSort.gql'

export type ProductListSortProps = ProductListSortFragment &
  Omit<
    ChipMenuProps,
    'selected' | 'selectedLabel' | 'children' | 'label' | 'onDelete' | 'openEl' | 'setOpenEl'
  > & {
    sx?: SxProps<Theme>
  }

const name = 'ProductListSort' as const
const parts = ['menu', 'item', 'link'] as const
const { classes } = extendableComponent(name, parts)

export function ProductListSort(props: ProductListSortProps) {
  const { sort_fields, total_count, sx = [], ...filterMenuProps } = props
  const { params } = useProductListParamsContext()
  const replaceRoute = useProductListLinkReplace()
  const { data: storeConfigQuery } = useQuery(StoreConfigDocument)
  const defaultSort = storeConfigQuery?.storeConfig?.catalog_default_sort_by
  const [openEl, setOpenEl] = useState<HTMLElement | null>(null)
  const [currentSort = defaultSort] = Object.keys(params.sort)
  const currentOption = sort_fields?.options?.find((option) => option?.value === currentSort)
  const selected = currentSort !== defaultSort
  const label = <Trans id='Sort By' />

  const removeFilter = () => {
    const linkParams = cloneDeep(params)
    linkParams.sort = {}
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
      filterCount={currentOption ? 1 : 0}
      onDelete={selected ? removeFilter : undefined}
      sx={Array.isArray(sx) ? sx : [sx]}
      openEl={openEl}
      setOpenEl={setOpenEl}
    >
      {sort_fields?.options?.map((option) => {
        const linkParams = cloneDeep(params)
        linkParams.sort = {}
        if (option?.value !== defaultSort) linkParams.sort[option?.value ?? ''] = 'ASC'
        delete linkParams.currentPage

        return (
          <ListItem
            className={classes.item}
            button={undefined}
            key={option?.value ?? ''}
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
