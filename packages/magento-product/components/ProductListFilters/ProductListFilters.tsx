import { useForm, useFormPersist } from '@graphcommerce/ecommerce-ui'
import { cloneDeep } from '@graphcommerce/graphql'
import { FilterTypeInput, ProductAttributeFilterInput } from '@graphcommerce/graphql-mesh'
import { ChipMenuProps, Form } from '@graphcommerce/next-ui'
import { Chip } from '@mui/material'
import { useState } from 'react'
import { useProductListLinkReplace } from '../../hooks/useProductListLinkReplace'
import { useProductListParamsContext } from '../../hooks/useProductListParamsContext'
import { FilterTypes } from '../ProductListItems/filterTypes'
import { FilterCheckboxType } from './FilterCheckboxType'
import { FilterEqualType } from './FilterEqualType'
import { FilterRangeType } from './FilterRangeType'
import { ProductListFiltersFragment } from './ProductListFilters.gql'

export type ProductFiltersProps = ProductListFiltersFragment & {
  filterTypes: FilterTypes
} & Omit<
    ChipMenuProps,
    'selected' | 'selectedLabel' | 'children' | 'label' | 'onDelete' | 'openEl' | 'setOpenEl'
  >

export function ProductListFilters(props: ProductFiltersProps) {
  const { aggregations, filterTypes, ...chipMenuProps } = props
  const filterForm = useForm<ProductAttributeFilterInput>({ defaultValues: {} })
  const { handleSubmit } = filterForm
  const { params } = useProductListParamsContext()
  const replaceRoute = useProductListLinkReplace({ scroll: false })

  useFormPersist({ form: filterForm, name: 'ProductListFilterForm' })

  const submit = handleSubmit((e) => {
    console.log({ e })
    replaceRoute({ ...params, filters: e })
  })

  return (
    <form id='filter-form' noValidate onSubmit={submit} style={{ display: 'flex' }}>
      {aggregations?.map((aggregation) => {
        if (!aggregation?.attribute_code || aggregation?.attribute_code === 'category_id')
          return null

        switch (filterTypes[aggregation.attribute_code]) {
          case 'FilterEqualTypeInput':
            if (
              aggregation.options?.[0]?.label === '0' ||
              aggregation.options?.[1]?.label === '0' ||
              aggregation.options?.[0]?.label === '1' ||
              aggregation.options?.[1]?.label === '1'
            ) {
              return (
                <FilterCheckboxType
                  key={aggregation.attribute_code}
                  {...aggregation}
                  {...chipMenuProps}
                  filterForm={filterForm}
                />
              )
            }

            return (
              <FilterEqualType
                key={aggregation.attribute_code}
                {...aggregation}
                {...chipMenuProps}
                filterForm={filterForm}
              />
            )

          case 'FilterRangeTypeInput':
            return (
              <FilterRangeType
                key={aggregation.attribute_code}
                {...aggregation}
                {...chipMenuProps}
                filterForm={filterForm}
              />
            )

          default:
            return null // `FilterMatchTypeInput not ${aggregation.attribute_code}`
        }
      })}
    </form>
  )
}
