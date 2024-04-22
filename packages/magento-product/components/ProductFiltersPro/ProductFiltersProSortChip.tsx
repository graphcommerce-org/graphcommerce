import {
  ActionCard,
  ActionCardListForm,
  ChipOverlayOrPopper,
  ChipOverlayOrPopperProps,
} from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react'
import { CategoryDefaultFragment } from '../ProductListItems/CategoryDefault.gql'
import { ProductListSortFragment } from '../ProductListSort/ProductListSort.gql'
import { useProductFiltersPro } from './ProductFiltersPro'
import { useProductFiltersProSort } from './useProductFiltersProSort'

export type ProductListActionSortProps = ProductListSortFragment &
  Omit<
    ChipOverlayOrPopperProps,
    'label' | 'selected' | 'selectedLabel' | 'onApply' | 'onReset' | 'onClose' | 'children'
  > & { category?: CategoryDefaultFragment }

export function ProductFiltersProSortChip(props: ProductListActionSortProps) {
  const { sort_fields, chipProps, category, ...rest } = props
  const { submit, form } = useProductFiltersPro()
  const { options, showReset, selected, selectedLabel } = useProductFiltersProSort(props)

  return (
    <ChipOverlayOrPopper
      {...rest}
      overlayProps={{ sizeSm: 'minimal', sizeMd: 'minimal', ...rest.overlayProps }}
      label={<Trans id='Sort By' />}
      selected={selected}
      selectedLabel={selectedLabel}
      onApply={submit}
      onClose={submit}
      onReset={
        showReset
          ? () => {
              form.setValue('sort', null)
              form.setValue('dir', null)
              form.setValue('currentPage', 1)
              return submit()
            }
          : undefined
      }
    >
      {() => (
        <ActionCardListForm
          control={form.control}
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
