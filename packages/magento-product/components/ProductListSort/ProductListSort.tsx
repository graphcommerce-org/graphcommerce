import { useQuery, cloneDeep } from '@graphcommerce/graphql'
import { StoreConfigDocument } from '@graphcommerce/magento-store'
import {
  ActionCard,
  ActionCardItemRenderProps,
  ActionCardListForm,
  ChipMenu,
  ChipMenuProps,
  extendableComponent,
} from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react'
import { SxProps, Theme, Typography, useMediaQuery } from '@mui/material'
import { useState } from 'react'
import { useProductListLinkReplace } from '../../hooks/useProductListLinkReplace'
import { useProductListParamsContext } from '../../hooks/useProductListParamsContext'
import { useFilterForm } from '../ProductListFilters/FilterFormContext'
import { ProductListParams } from '../ProductListItems/filterTypes'
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
const { classes, withState } = extendableComponent(name, parts)

function FilterSortActionCard(
  props: ActionCardItemRenderProps<{
    option: NonNullable<NonNullable<ProductListSortFragment['sort_fields']>['options']>[0]
    attribute_code: string
    params: ProductListParams
    currentOption: NonNullable<NonNullable<ProductListSortFragment['sort_fields']>['options']>[0]
  }>,
) {
  const { option, attribute_code, currentOption, params, onReset, ...cardProps } = props
  if (!option?.value) return null
  const labelId = `filter-equal-${attribute_code}-${option?.value}`
  const filters = cloneDeep(params.filters)
  const isColor = !!attribute_code?.toLowerCase().includes('color')
  const isActive = Boolean(isColor && currentOption?.value?.includes(option?.value) && isColor)

  const cls = withState({ isActive })

  return (
    <ActionCard
      {...cardProps}
      size='small'
      title={
        <Typography className={cls.link} sx={{ py: 1 }}>
          {option.label}
        </Typography>
      }
    />
  )
}

export function ProductListSort(props: ProductListSortProps) {
  const { sort_fields, total_count, sx = [], ...filterMenuProps } = props
  const { params } = useProductListParamsContext()
  const {
    form: { control },
  } = useFilterForm()

  const { data: storeConfigQuery } = useQuery(StoreConfigDocument)
  const defaultSort = storeConfigQuery?.storeConfig?.catalog_default_sort_by
  const [openEl, setOpenEl] = useState<HTMLElement | null>(null)
  const [currentSort = defaultSort] = Object.keys(params.sort)
  const currentOption = sort_fields?.options?.find((option) => option?.value === currentSort)
  const selected = currentSort !== defaultSort
  const filterMode = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'))
    ? 'overlay'
    : 'popper'
  const label =
    currentOption?.label !== (undefined || 'Position') ? (
      currentOption?.label
    ) : (
      <Trans id='Sort By' />
    )

  const handleClose = () => {
    setOpenEl(null)
  }

  if (!total_count) return null

  return (
    <ChipMenu
      className={classes.menu}
      variant='outlined'
      selected={selected}
      label={label}
      {...filterMenuProps}
      onClose={handleClose}
      sx={Array.isArray(sx) ? sx : [sx]}
      openEl={openEl}
      setOpenEl={setOpenEl}
      onClick={(e) => setOpenEl(e.currentTarget)}
      mode={filterMode}
    >
      <ActionCardListForm
        name='sort'
        control={control}
        layout='list'
        variant='default'
        items={
          sort_fields?.options?.map((option) => ({
            option,
            label,
            params,
            value: option?.value ?? '',
            currentOption,
          })) ?? []
        }
        render={FilterSortActionCard}
      />
    </ChipMenu>
  )
}
