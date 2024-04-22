import { useForm, UseFormProps, UseFormReturn } from '@graphcommerce/ecommerce-ui'
import { useMemoObject } from '@graphcommerce/next-ui'
import { useEventCallback } from '@mui/material'
import { useRouter } from 'next/router'
import React, { BaseSyntheticEvent, createContext, useContext, useMemo } from 'react'
import { productListLinkFromFilter } from '../../hooks/useProductListLink'
import { ProductListFiltersFragment } from '../ProductListFilters/ProductListFilters.gql'
import {
  ProductFilterParams,
  ProductListParams,
  toFilterParams,
} from '../ProductListItems/filterTypes'

type DataProps = {
  filterTypes: Record<string, string | undefined>
  appliedAggregations?: ProductListFiltersFragment['aggregations']
} & ProductListFiltersFragment

type FilterFormContextProps = DataProps & {
  /**
   * Watch and formState are known to cause performance issues.
   *
   * - `watch` -> `useWatch`
   * - `formState` -> `useFormState`
   */
  form: Omit<UseFormReturn<ProductFilterParams>, 'formState' | 'watch'>
  params: ProductFilterParams
  submit: (e?: BaseSyntheticEvent<object, any, any> | undefined) => Promise<void>
}

const FilterFormContext = createContext<FilterFormContextProps | null>(null)

export const useProductFiltersPro = () => {
  const context = useContext(FilterFormContext)
  if (!context) throw Error('useProductFiltersPro should be used inside ProductFiltersPro')
  return context
}

export type FilterFormProviderProps = Omit<
  UseFormProps<ProductFilterParams>,
  'values' | 'defaultValues'
> & {
  children: React.ReactNode
  params: ProductListParams
} & DataProps

export function ProductFiltersPro(props: FilterFormProviderProps) {
  const { children, params, aggregations, appliedAggregations, filterTypes, ...formProps } = props

  const defaultValues = useMemoObject(toFilterParams(params))
  const form = useForm<ProductFilterParams>({ defaultValues, ...formProps })

  const router = useRouter()

  const submit = useEventCallback(
    form.handleSubmit(async (formValues) => {
      const queryUrl = router.query.url ?? []
      const comingFromURLWithoutFilters = !queryUrl.includes('q')
      const path = productListLinkFromFilter({ ...formValues, currentPage: 1 })

      if (router.asPath === path) return false
      if (comingFromURLWithoutFilters) return router.push(path, path)
      return router.replace(path, path)
    }),
  )

  const filterFormContext: FilterFormContextProps = useMemo(
    () => ({
      form,
      params: defaultValues,
      submit,
      appliedAggregations,
      filterTypes,
      aggregations,
    }),
    [form, defaultValues, submit, appliedAggregations, filterTypes, aggregations],
  )

  return (
    <FilterFormContext.Provider value={filterFormContext}>
      <form noValidate onSubmit={submit} id='products' />
      {children}
    </FilterFormContext.Provider>
  )
}
