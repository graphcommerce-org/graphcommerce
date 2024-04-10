import { useForm, UseFormProps, UseFormReturn } from '@graphcommerce/ecommerce-ui'
import { useMatchMedia, useMemoObject } from '@graphcommerce/next-ui'
import { useEventCallback, useTheme } from '@mui/material'
import React, {
  BaseSyntheticEvent,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { useProductListLinkReplace } from '../../hooks/useProductListLinkReplace'
import { ProductListFiltersFragment } from '../ProductListFilters/ProductListFilters.gql'
import {
  ProductFilterParams,
  ProductListParams,
  toFilterParams,
  toProductListParams,
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

  const matchMedia = useMatchMedia()
  const theme = useTheme()
  const [formScrollMarginTopOffset, setFormScrollMarginTopOffset] = useState<string>('0px')

  useEffect(() => {
    if (matchMedia.down('md')) setFormScrollMarginTopOffset(theme.appShell.headerHeightSm)
  }, [matchMedia, theme.appShell.headerHeightSm])

  const push = useProductListLinkReplace()

  const submit = useEventCallback(
    form.handleSubmit(async (formValues) => {
      const scroll = !(
        import.meta.graphCommerce.productFiltersLayout === 'SIDEBAR' && matchMedia.up('md')
      )
      return push({ ...toProductListParams(formValues), currentPage: 1 }, { scroll })
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
      <form
        noValidate
        onSubmit={submit}
        id='products'
        style={{
          scrollMarginTop: formScrollMarginTopOffset,
        }}
      />
      {children}
    </FilterFormContext.Provider>
  )
}
