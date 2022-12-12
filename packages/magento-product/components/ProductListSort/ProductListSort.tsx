import { useQuery } from '@graphcommerce/graphql'
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
import { SxProps, Theme, Typography } from '@mui/material'
import { useProductListParamsContext } from '../../hooks/useProductListParamsContext'
import { useFilterForm } from '../ProductListFilters/FilterFormContext'
import { useFilterActions } from '../ProductListFilters/helpers/filterActions'
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
    currentOption:
      | NonNullable<NonNullable<ProductListSortFragment['sort_fields']>['options']>[0]
      | undefined
  }>,
) {
  const { option, attribute_code, currentOption, params, onReset, ...cardProps } = props
  if (!option?.value) return null

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
  const { params } = useFilterForm()
  const {
    form: { control },
  } = useFilterForm()

  const { data: storeConfigQuery } = useQuery(StoreConfigDocument)
  const defaultSort = storeConfigQuery?.storeConfig?.catalog_default_sort_by
  const [currentSort = defaultSort] = Object.keys(params.sort)
  const { emptyFilters, applyFilters } = useFilterActions({ attribute_code: 'sort' })

  const currentOption = sort_fields?.options?.find((option) => option?.value === currentSort)
  const selected = currentSort !== defaultSort
  const label =
    currentOption?.label !== (undefined || 'Position') ? (
      currentOption?.label
    ) : (
      <Trans id='Sort By' />
    )

  if (!total_count) return null

  return (
    <ChipMenu
      className={classes.menu}
      variant='outlined'
      selected={selected}
      label={label}
      {...filterMenuProps}
      sx={sx}
      onReset={emptyFilters}
      onApply={applyFilters}
    >
      {sort_fields?.options ? (
        <ActionCardListForm
          name='sort'
          control={control}
          layout='list'
          variant='default'
          items={sort_fields.options.map((option) => ({
            option,
            params,
            value: option?.value ?? '',
            currentOption,
            attribute_code: option?.label ?? '',
          }))}
          render={FilterSortActionCard}
        />
      ) : null}
    </ChipMenu>
  )
}
