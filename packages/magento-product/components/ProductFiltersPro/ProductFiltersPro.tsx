import { useForm, UseFormProps, UseFormReturn } from '@graphcommerce/ecommerce-ui'
import { useMatchMediaMotionValue, useMemoObject } from '@graphcommerce/next-ui'
import { useEventCallback, useTheme } from '@mui/material'
import { m, useTransform } from 'framer-motion'
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

const isSidebar = import.meta.graphCommerce.productFiltersLayout === 'SIDEBAR'

export function ProductFiltersPro(props: FilterFormProviderProps) {
  const { children, params, aggregations, appliedAggregations, filterTypes, ...formProps } = props

  const defaultValues = useMemoObject(toFilterParams(params))
  const form = useForm<ProductFilterParams>({ defaultValues, ...formProps })
  const ref = useRef<HTMLFormElement>(null)

  const router = useRouter()
  const theme = useTheme()
  const isDesktop = useMatchMediaMotionValue('up', 'md')
  const scrollMarginTop = useTransform(() => (isDesktop.get() ? 0 : theme.appShell.headerHeightSm))
  const scroll = useTransform(() => !isSidebar || isDesktop.get())

  const submit = useEventCallback(
    form.handleSubmit(async (formValues) => {
      const path = productListLinkFromFilter({ ...formValues, currentPage: 1 })
      if (router.asPath === path) return false

      const opts = { scroll: scroll.get() }
      return (router.query.url ?? []).includes('q')
        ? router.replace(path, path, opts)
        : router.push(path, path, opts)
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
      <m.form ref={ref} noValidate onSubmit={submit} id='products' style={{ scrollMarginTop }} />
      {children}
    </FilterFormContext.Provider>
  )
}
