import { useWatch } from '@graphcommerce/ecommerce-ui'
import { useQuery } from '@graphcommerce/graphql'
import { StoreConfigDocument } from '@graphcommerce/magento-store'
import { filterNonNullableKeys } from '@graphcommerce/next-ui'
import { i18n } from '@lingui/core'
import { useMemo } from 'react'
import { CategoryDefaultFragment } from '../ProductListItems/CategoryDefault.gql'
import { ProductFilterParams } from '../ProductListItems/filterTypes'
import { ProductListSortFragment } from '../ProductListSort'
import { useProductFiltersPro } from './ProductFiltersPro'
import type { ProductListActionSortProps } from './ProductFiltersProSortChip'
import { ProductFiltersProSortDirectionArrow } from './ProductFiltersProSortDirectionArrow'

const exclude = ['relevance', 'position']

export type UseProductFiltersProSortProps = ProductListSortFragment & {
  category?: CategoryDefaultFragment
}

export function useProductFiltersProSort(props: ProductListActionSortProps) {
  const { sort_fields, category } = props

  const { params, form } = useProductFiltersPro()
  const { control, setValue } = form

  const sortFields = useMemo(
    () =>
      filterNonNullableKeys(sort_fields?.options).map((o) =>
        !category?.uid && o.value === 'position'
          ? { value: 'relevance', label: i18n._(/* i18n*/ 'Relevance') }
          : o,
      ),
    [category?.uid, sort_fields?.options],
  )
  const availableSortBy = category?.available_sort_by ?? sortFields.map((o) => o.value)

  const conf = useQuery(StoreConfigDocument).data?.storeConfig
  const defaultSortBy = (
    category ? category.default_sort_by ?? conf?.catalog_default_sort_by ?? 'position' : 'relevance'
  ) as ProductFilterParams['sort']

  const formSort = useWatch({ control, name: 'sort' })
  const formDirection = useWatch({ control, name: 'dir' })
  const showReset = Boolean(formSort !== defaultSortBy || formDirection === 'DESC')
  const selected = Boolean(params.sort && (params.sort !== defaultSortBy || params.dir === 'DESC'))

  const options = useMemo(
    () =>
      sortFields
        .filter((o) => availableSortBy.includes(o.value))
        .map((option) => {
          const value = option.value === defaultSortBy ? null : option.value
          const showSort = formSort === value && !exclude.includes(option.value)

          return {
            ...option,
            value,
            title: option.label,
            ...(showSort && {
              onClick: () => setValue('dir', formDirection === 'DESC' ? null : 'DESC'),
              price: <ProductFiltersProSortDirectionArrow sortDirection={formDirection} />,
            }),
          }
        }),
    [sortFields, availableSortBy, defaultSortBy, formSort, formDirection, setValue],
  )

  return {
    options,
    selected,
    showReset,
    selectedLabel: options.find((option) => option.value === params.sort)?.label,
  }
}
