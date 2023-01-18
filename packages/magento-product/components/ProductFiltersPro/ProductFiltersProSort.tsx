import { useFormState } from '@graphcommerce/ecommerce-ui'
import { useQuery } from '@graphcommerce/graphql'
import { StoreConfigDocument } from '@graphcommerce/magento-store'
import {
  ActionCard,
  ActionCardListForm,
  ChipPanel,
  extendableComponent,
  filterNonNullableKeys,
} from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react'
import { Box, SxProps, Theme, Typography } from '@mui/material'
import { useMemo } from 'react'
import { ProductListSortFragment } from '../ProductListSort/ProductListSort.gql'
import { useFilterForm } from './ProductFiltersPro'

export type ProductListActionSortProps = ProductListSortFragment & {
  sx?: SxProps<Theme>
}

const name = 'ProductListSort' as const
const parts = ['menu', 'item', 'link'] as const
const { classes } = extendableComponent(name, parts)

export function ProductFiltersProSortChip(props: ProductListActionSortProps) {
  const { sort_fields, total_count, sx = [], ...chipMenu } = props
  const { params, form, submit } = useFilterForm()
  const { watch } = form
  const { control } = form

  const activeSort = watch('sort')

  const { data: storeConfigQuery } = useQuery(StoreConfigDocument)
  const defaultSort = storeConfigQuery?.storeConfig?.catalog_default_sort_by

  const options = useMemo(
    () =>
      filterNonNullableKeys(sort_fields?.options, ['value', 'label']).map((option) => ({
        ...option,
        value: option.value === defaultSort ? null : option.value,
        title: <Box className={classes.link}>{option.label}</Box>,
      })),
    [defaultSort, sort_fields?.options],
  )

  const currentOption = options.find((option) => option?.value === params.sort)

  if (!total_count) return null

  return (
    <ChipPanel
      {...chipMenu}
      selectedLabel={currentOption?.label}
      chipProps={{
        label: <Trans id='Sort By' />,
        className: classes.menu,
        variant: 'outlined',
        sx,
      }}
      panelProps={{
        onApply: submit,
        onReset: activeSort
          ? () => {
              form.resetField('sort', { defaultValue: null })
              form.resetField('currentPage', { defaultValue: 1 })
              return submit()
            }
          : undefined,
        onClose: submit,
        closeOnAction: true,
      }}
      selected={Boolean(params.sort)}
    >
      <ActionCardListForm
        control={control}
        name='sort'
        layout='list'
        variant='default'
        size='medium'
        render={ActionCard}
        items={options}
      />
    </ChipPanel>
  )
}
