import {
  ActionCard,
  ActionCardListForm,
  ChipOverlayOrPopper,
  ChipOverlayOrPopperProps,
} from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react'
import { useProductFiltersPro } from './ProductFiltersPro'
import { UseProductFiltersProSortProps, useProductFiltersProSort } from './useProductFiltersProSort'

export type ProductListActionSortProps = UseProductFiltersProSortProps &
  Omit<
    ChipOverlayOrPopperProps,
    'label' | 'selected' | 'selectedLabel' | 'onApply' | 'onReset' | 'onClose' | 'children'
  >

export function ProductFiltersProSortChip(props: ProductListActionSortProps) {
  const { sort_fields, total_count, chipProps, category, ...rest } = props
  const { submit, form } = useProductFiltersPro()
  const { options, showReset, selected, selectedLabel } = useProductFiltersProSort(props)

  // if (total_count === 0) return null

  return (
    <ChipOverlayOrPopper
      {...rest}
      overlayProps={{ sizeSm: 'minimal', sizeMd: 'minimal', ...rest.overlayProps }}
      label={<Trans id='Sort By' />}
      selected={selected}
      selectedLabel={selectedLabel}
      onApply={submit}
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
      onClose={submit}
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
