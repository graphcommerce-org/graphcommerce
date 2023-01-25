import { useWatch } from '@graphcommerce/ecommerce-ui'
import { useQuery } from '@graphcommerce/graphql'
import { StoreConfigDocument } from '@graphcommerce/magento-store'
import {
  ActionCard,
  ActionCardListForm,
  ChipOverlayOrPopper,
  ChipOverlayOrPopperProps,
  filterNonNullableKeys,
} from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react'
import { useMemo } from 'react'
import { ProductListSortFragment } from '../ProductListSort/ProductListSort.gql'
import { useProductFiltersPro } from './ProductFiltersPro'

export type ProductListActionSortProps = ProductListSortFragment &
  Omit<
    ChipOverlayOrPopperProps,
    'label' | 'selected' | 'selectedLabel' | 'onApply' | 'onReset' | 'onClose' | 'children'
  >

export function ProductFiltersProSortChip(props: ProductListActionSortProps) {
  const { sort_fields, chipProps, ...rest } = props
  const { params, form, submit } = useProductFiltersPro()
  const { control } = form
  const activeSort = useWatch({ control, name: 'sort' })

  const { data: storeConfigQuery } = useQuery(StoreConfigDocument)
  const defaultSort = storeConfigQuery?.storeConfig?.catalog_default_sort_by

  const options = useMemo(
    () =>
      filterNonNullableKeys(sort_fields?.options, ['value', 'label']).map((option) => ({
        ...option,
        value: option.value === defaultSort ? null : option.value,
        title: option.label,
      })),
    [defaultSort, sort_fields?.options],
  )

  return (
    <ChipOverlayOrPopper
      {...rest}
      overlayProps={{ sizeSm: 'minimal', sizeMd: 'minimal', ...rest.overlayProps }}
      label={<Trans id='Sort By' />}
      selected={Boolean(params.sort)}
      selectedLabel={options.find((option) => option.value === params.sort)?.label}
      onApply={submit}
      onReset={
        activeSort
          ? () => {
              form.resetField('sort', { defaultValue: null })
              form.resetField('currentPage', { defaultValue: 1 })
              return submit()
            }
          : undefined
      }
      onClose={submit}
    >
      {() => (
        <ActionCardListForm
          control={control}
          name='sort'
          layout='list'
          variant='default'
          size='medium'
          render={ActionCard}
          items={options}
        />
      )}
    </ChipOverlayOrPopper>
  )
}
