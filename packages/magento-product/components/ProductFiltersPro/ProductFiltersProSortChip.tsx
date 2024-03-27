import { useWatch } from '@graphcommerce/ecommerce-ui'
import { ProductAttributeSortInput } from '@graphcommerce/graphql-mesh'
import {
  ActionCard,
  ActionCardListForm,
  ChipOverlayOrPopper,
  ChipOverlayOrPopperProps,
  filterNonNullableKeys,
} from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react'
import { useEffect, useMemo } from 'react'
import { ProductListSortFragment } from '../ProductListSort/ProductListSort.gql'
import { useProductFiltersPro } from './ProductFiltersPro'
import { ProductFiltersProSortDirectionArrow } from './ProductFiltersProSortDirectionArrow'
import { handleSort } from './handleSort'

export type ProductListActionSortProps = ProductListSortFragment &
  Omit<
    ChipOverlayOrPopperProps,
    'label' | 'selected' | 'selectedLabel' | 'onApply' | 'onReset' | 'onClose' | 'children'
  > & {
    defaultSortBy: keyof ProductAttributeSortInput
  }

export function ProductFiltersProSortChip(props: ProductListActionSortProps) {
  const { sort_fields, chipProps, defaultSortBy, ...rest } = props
  const { params, form, submit } = useProductFiltersPro()
  const { control } = form
  const activeSort = useWatch({ control, name: 'sort' })
  const sortDirection = useWatch({ control, name: 'dir' })

  const options = useMemo(
    () =>
      filterNonNullableKeys(sort_fields?.options, ['value', 'label']).map((option) => ({
        ...option,
        value: option.value,
        title: option.label,
        ...(activeSort === option.value
          ? {
              onClick: () => handleSort({ form, sortDirection }),
              price: <ProductFiltersProSortDirectionArrow sortDirection={sortDirection} />,
            }
          : null),
      })),
    [activeSort, form, sortDirection, sort_fields?.options],
  )

  useEffect(() => {
    if (activeSort === null) form.setValue('sort', defaultSortBy)
    if (sortDirection === null) form.setValue('dir', 'ASC')
  }, [activeSort, defaultSortBy, form, sortDirection])

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
              form.setValue('sort', null)
              form.setValue('dir', null)
              form.setValue('currentPage', 1)
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
