import { useForm, UseFormProps, UseFormReturn } from '@graphcommerce/ecommerce-ui'
import { useMatchMedia, useMemoObject } from '@graphcommerce/next-ui'
import { useEventCallback, useTheme } from '@mui/material'
import { useRouter } from 'next/router'
import React, { BaseSyntheticEvent, createContext, useContext, useMemo, useRef } from 'react'
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
  const ref = useRef<HTMLFormElement>(null)

  const router = useRouter()
  const theme = useTheme()
  const matchMedia = useMatchMedia()

  const submit = useEventCallback(
    form.handleSubmit(async (formValues) => {
      const queryUrl = router.query.url ?? []
      const comingFromURLWithoutFilters = !queryUrl.includes('q')
      const path = productListLinkFromFilter({ ...formValues, currentPage: 1 })

      const isMd = matchMedia.up('md')
      const scroll = !(import.meta.graphCommerce.productFiltersLayout === 'SIDEBAR' && isMd)

      if (!isMd && ref.current) ref.current.style.scrollMarginTop = theme.appShell.headerHeightSm
      else ref.current?.style.removeProperty('scroll-margin-top')

      if (router.asPath === path) return false
      if (comingFromURLWithoutFilters) return router.push(path, path, { scroll })
      return router.replace(path, path, { scroll })
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
      <form ref={ref} noValidate onSubmit={submit} id='products' />
      {children}
    </FilterFormContext.Provider>
  )
}
