import { useWatch } from '@graphcommerce/ecommerce-ui'
import { useQuery } from '@graphcommerce/graphql'
import { StoreConfigDocument } from '@graphcommerce/magento-store'
import {
  ActionCard,
  ActionCardListForm,
  Button,
  filterNonNullableKeys,
  SectionHeader,
} from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react'
import { Box } from '@mui/material'
import { useMemo } from 'react'
import { ProductListSortFragment } from '../ProductListSort/ProductListSort.gql'
import { useProductFiltersPro } from './ProductFiltersPro'

export type ProductFiltersProSortSectionProps = ProductListSortFragment

export function ProductFiltersProSortSection(props: ProductFiltersProSortSectionProps) {
  const { sort_fields } = props
  const { form } = useProductFiltersPro()
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
    <Box sx={{ my: 0 }}>
      <SectionHeader
        labelLeft={<Trans id='Sort By' />}
        sx={{ mt: 0 }}
        labelRight={
          activeSort ? (
            <Button
              variant='inline'
              color='primary'
              onClick={() => {
                form.resetField('sort', { defaultValue: null })
                form.resetField('currentPage', { defaultValue: 1 })
              }}
            >
              <Trans id='Clear' />
            </Button>
          ) : undefined
        }
      />
      <ActionCardListForm
        control={control}
        name='sort'
        layout='list'
        variant='default'
        size='medium'
        render={ActionCard}
        items={options}
      />
    </Box>
  )
}
