import {
  FormAutoSubmit,
  useForm,
  useFormAutoSubmit,
  UseFormProps,
  UseFormReturn,
} from '@graphcommerce/ecommerce-ui'
import type { ProductFiltersLayout } from '@graphcommerce/next-config'
import { extendableComponent, StickyBelowHeader, useMemoObject } from '@graphcommerce/next-ui'
import { useMediaQuery, Container, Box, Theme, useEventCallback } from '@mui/material'
import React, { BaseSyntheticEvent, createContext, useContext, useMemo } from 'react'
import { useProductListLinkReplace } from '../../hooks/useProductListLinkReplace'
import {
  ProductFilterParams,
  ProductListParams,
  toFilterParams,
  toProductListParams,
} from '../ProductListItems/filterTypes'
import { ProductListFiltersFragment } from '../ProductListFilters/ProductListFilters.gql'

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

  const push = useProductListLinkReplace({ scroll: false })
  const submit = useEventCallback(
    form.handleSubmit(async (formValues) =>
      push({ ...toProductListParams(formValues), currentPage: 1 }),
    ),
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
