import {
  FormAutoSubmit,
  SubmitHandler,
  useForm,
  UseFormHandleSubmit,
  UseFormProps,
  UseFormReturn,
} from '@graphcommerce/ecommerce-ui'
import { useMatchMediaMotionValue, useMemoObject } from '@graphcommerce/next-ui'
import { Theme, useEventCallback, useMediaQuery, useTheme } from '@mui/material'
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

export function useProductFiltersPro(optional: true): FilterFormContextProps | null
export function useProductFiltersPro(optional?: false): FilterFormContextProps
export function useProductFiltersPro(optional: boolean = false) {
  const context = useContext(FilterFormContext)
  if (!optional && !context)
    throw Error('useProductFiltersPro should be used inside ProductFiltersPro')
  return context
}

export type FilterFormProviderProps = Omit<
  UseFormProps<ProductFilterParams>,
  'values' | 'defaultValues'
> & {
  children: React.ReactNode
  params: ProductListParams
  /**
   * Whether the filter should scroll to the products list and whether to submit the form on change.
   */
  autoSubmitMd?: boolean

  handleSubmit?: SubmitHandler<ProductFilterParams>
} & DataProps

function AutoSubmitSidebarDesktop() {
  const { form, submit } = useProductFiltersPro()

  // We only need to auto-submit when the layout is not sidebar and we're viewing on desktop
  const autoSubmitDisabled = useMediaQuery<Theme>((t) => t.breakpoints.down('md'), {
    defaultMatches: false,
  })

  return (
    <FormAutoSubmit
      control={form.control}
      disabled={autoSubmitDisabled}
      submit={submit}
      name={['filters', 'url', 'sort', 'pageSize', 'currentPage', 'dir']}
    />
  )
}

export function ProductFiltersPro(props: FilterFormProviderProps) {
  const {
    children,
    params,
    aggregations,
    appliedAggregations,
    filterTypes,
    autoSubmitMd = false,
    handleSubmit,
    ...formProps
  } = props

  const defaultValues = useMemoObject(toFilterParams(params))
  const form = useForm<ProductFilterParams>({ defaultValues, ...formProps })
  const ref = useRef<HTMLFormElement>(null)

  const router = useRouter()
  const theme = useTheme()
  const isDesktop = useMatchMediaMotionValue('up', 'md')
  const scrollMarginTop = useTransform(() => (isDesktop.get() ? 0 : theme.appShell.headerHeightSm))
  const scroll = useTransform(() => !autoSubmitMd || isDesktop.get())

  const submit = useEventCallback(
    form.handleSubmit(async (formValues) => {
      const path = productListLinkFromFilter({ ...formValues, currentPage: 1 })

      if (router.asPath === path) return false

      const opts = {
        scroll: scroll.get(),
        shallow: formValues.url.startsWith('search') || formValues.url === defaultValues.url,
      }

      await handleSubmit?.(formValues)

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
      {autoSubmitMd && <AutoSubmitSidebarDesktop />}
      {children}
    </FilterFormContext.Provider>
  )
}
