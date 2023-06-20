import { useWatch } from '@graphcommerce/ecommerce-ui'
import { useQuery } from '@graphcommerce/graphql'
import { StoreConfigDocument } from '@graphcommerce/magento-store'
import {
  ActionCard,
  ActionCardAccordion,
  ActionCardListForm,
  Button,
  filterNonNullableKeys,
} from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react'
import { useMemo } from 'react'
import { ProductListSortFragment } from '../ProductListSort/ProductListSort.gql'
import { useProductFiltersPro } from './ProductFiltersPro'

export type ProductFiltersProSortSectionProps = ProductListSortFragment

export function ProductFiltersProSortSection(props: ProductFiltersProSortSectionProps) {
  const { sort_fields } = props
  const { form, submit } = useProductFiltersPro()
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
    <ActionCardAccordion
      defaultExpanded={false}
      summary={<Trans id='Sort By' />}
      details={
        <ActionCardListForm
          control={control}
          name='sort'
          layout='list'
          variant='default'
          size='medium'
          render={ActionCard}
          items={options}
        />
      }
      right={
        activeSort ? (
          <Button
            color='primary'
            onClick={(e) => {
              e.stopPropagation()
              form.setValue('sort', null)
              form.setValue('dir', null)
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
