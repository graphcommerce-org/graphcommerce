import { useWatch } from '@graphcommerce/ecommerce-ui'
import { useQuery } from '@graphcommerce/graphql'
import { StoreConfigDocument } from '@graphcommerce/magento-store'
import {
  ActionCard,
  ActionCardItemBase,
  ActionCardListForm,
  ChipOverlayOrPopper,
  ChipOverlayOrPopperProps,
} from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react'
import { useMemo } from 'react'
import { useProductFiltersPro } from './ProductFiltersPro'

export type ProductFiltersProLimitChipProps = Omit<
  ChipOverlayOrPopperProps,
  'label' | 'selected' | 'selectedLabel' | 'onApply' | 'onReset' | 'onClose' | 'children'
>

export function ProductFiltersProLimitChip(props: ProductFiltersProLimitChipProps) {
  const { chipProps, ...rest } = props
  const { params, form, submit } = useProductFiltersPro()
  const { control } = form
  const activePageSize = useWatch({ control, name: 'pageSize' })

  const { data: storeConfigQuery } = useQuery(StoreConfigDocument)
  const defaultPerPage = Number(storeConfigQuery?.storeConfig?.grid_per_page)

  const options: ActionCardItemBase[] = useMemo(
    () =>
      (storeConfigQuery?.storeConfig?.grid_per_page_values?.split(',').map(Number) ?? []).map(
        (count) => ({
          value: count === defaultPerPage ? null : count,
          title: <Trans id='{count} Per page' values={{ count }} />,
        }),
      ),
    [defaultPerPage, storeConfigQuery?.storeConfig?.grid_per_page_values],
  )

  if (options.length <= 1) return null

  return (
    <ChipOverlayOrPopper
      {...rest}
      overlayProps={{ sizeSm: 'minimal', sizeMd: 'minimal', ...rest.overlayProps }}
      label={<Trans id='Per page' />}
      selected={Boolean(params.pageSize)}
      selectedLabel={<Trans id='{count} Per page' values={{ count: params.pageSize }} />}
      onApply={submit}
      onReset={
        activePageSize
          ? () => {
              form.resetField('pageSize', { defaultValue: null })
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
          name='pageSize'
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
