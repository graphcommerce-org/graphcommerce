import type { ActionCardItemBase } from '@graphcommerce/ecommerce-ui'
import { ActionCardListForm, useWatch } from '@graphcommerce/ecommerce-ui'
import { useQuery } from '@graphcommerce/graphql'
import { StoreConfigDocument } from '@graphcommerce/magento-store'
import { ActionCard, ActionCardAccordion, Button } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react'
import type { SxProps, Theme } from '@mui/material'
import { useMemo } from 'react'
import { useProductFiltersPro } from './ProductFiltersPro'

export type ProductFiltersProLimitSectionProps = { sx?: SxProps<Theme> }

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function ProductFiltersProLimitSection(props: ProductFiltersProLimitSectionProps) {
  const { sx } = props
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
      sx={sx}
      defaultExpanded={!!activePageSize}
      summary={<Trans id='Per page' />}
      details={
        <ActionCardListForm
          sx={{ mb: 2 }}
          render={ActionCard}
          name='pageSize'
          control={control}
          layout='list'
          variant='default'
          size='responsive'
          items={options}
        />
      }
      right={
        activePageSize ? (
          <Button
            variant='inline'
            color='primary'
            onClick={(e) => {
              e.stopPropagation()
              form.setValue('pageSize', null)
              form.setValue('currentPage', 1)
            }}
          >
            <Trans id='Clear' />
          </Button>
        ) : undefined
      }
    />
  )
}
