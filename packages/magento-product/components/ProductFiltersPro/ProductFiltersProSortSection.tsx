import { useWatch } from '@graphcommerce/ecommerce-ui'
import { ProductAttributeSortInput } from '@graphcommerce/graphql-mesh'
import {
  ActionCard,
  ActionCardAccordion,
  ActionCardListForm,
  Button,
  filterNonNullableKeys,
} from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react'
import { useEffect, useMemo } from 'react'
import { ProductListSortFragment } from '../ProductListSort/ProductListSort.gql'
import { useProductFiltersPro } from './ProductFiltersPro'
import { ProductFiltersProSortDirectionArrow } from './ProductFiltersProSortDirectionArrow'
import { handleSort } from './handleSort'

export type ProductFiltersProSortSectionProps = ProductListSortFragment & {
  defaultSortBy: keyof ProductAttributeSortInput
}

export function ProductFiltersProSortSection(props: ProductFiltersProSortSectionProps) {
  const { sort_fields, defaultSortBy } = props
  const { form } = useProductFiltersPro()
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
    <ActionCardAccordion
      defaultExpanded={!!activeSort}
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
