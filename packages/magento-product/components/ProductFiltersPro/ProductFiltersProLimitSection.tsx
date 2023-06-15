import { useWatch } from '@graphcommerce/ecommerce-ui'
import { useQuery } from '@graphcommerce/graphql'
import { StoreConfigDocument } from '@graphcommerce/magento-store'
import {
  ActionCard,
  ActionCardAccordion,
  ActionCardItemBase,
  ActionCardListForm,
  Button,
} from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react'
import { useMemo } from 'react'
import { useProductFiltersPro } from './ProductFiltersPro'

export type ProductFiltersProLimitSectionProps = object

export function ProductFiltersProLimitSection(props: ProductFiltersProLimitSectionProps) {
  const { form } = useProductFiltersPro()
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
    <ActionCardAccordion
      summary={<Trans id='Per page' />}
      details={
        <ActionCardListForm
          sx={{ mb: 2 }}
          render={ActionCard}
          name='currentPage'
          control={control}
          multiple
          layout='list'
          variant='default'
          size='medium'
          items={options}
        />
      }
      right={
        activePageSize ? (
          <Button
            variant='inline'
            color='primary'
            onClick={() => {
              form.resetField('pageSize', { defaultValue: null })
              form.resetField('currentPage', { defaultValue: 1 })
            }}
          >
            <Trans id='Clear' />
          </Button>
        ) : undefined
      }
    />
  )
}
