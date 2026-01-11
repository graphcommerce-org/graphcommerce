import type {
  DeepPartial,
  UseFormProps,
  UseFormReturn,
  WatchObserver,
} from '@graphcommerce/ecommerce-ui'
import { FormAutoSubmit, useForm } from '@graphcommerce/ecommerce-ui'
import { useMatchMediaMotionValue, useMemoObject } from '@graphcommerce/next-ui'
import type { Theme } from '@mui/material'
// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import { useEventCallback, useMediaQuery, useTheme } from '@mui/material'
import { m, useTransform } from 'framer-motion'
import { usePathname, useRouter } from 'next/navigation'
import type { BaseSyntheticEvent, MutableRefObject } from 'react'
import React, { createContext, useContext, useEffect, useMemo, useRef } from 'react'
import { productListLinkFromFilter } from '../../hooks/useProductListLink'
import type { ProductListFiltersFragment } from '../ProductListFilters/ProductListFilters.gql'
import type { ProductFilterParams, ProductListParams } from '../ProductListItems/filterTypes'
import { toFilterParams } from '../ProductListItems/filterTypes'

type Subscription = { unsubscribe: () => void }

type DataProps = {
  filterTypes: Record<string, string | undefined>
  appliedAggregations?: ProductListFiltersFragment['aggregations']
} & ProductListFiltersFragment

export type ProductFiltersProContext = DataProps & {
  /**
   * Watch and formState are known to cause performance issues.
   *
   * - `watch` -> `useWatch`
   * - `formState` -> `useFormState`
   */
  form: Omit<UseFormReturn<ProductFilterParams>, 'formState' | 'watch'> & {
    watch: (
      callback: WatchObserver<ProductFilterParams>,
      defaultValues?: DeepPartial<ProductFilterParams>,
    ) => Subscription
  }
  /**
   * Parameters of the currently displayed items.
   *
   * To get active form values use `useWatch`.
   */
  params: ProductFilterParams
  submit: (e?: BaseSyntheticEvent<object, any, any> | undefined) => Promise<void>
}

const FilterFormContext = createContext<ProductFiltersProContext | null>(null)

export const globalFormContextRef: MutableRefObject<ProductFiltersProContext | null> = {
  current: null,
}

export function useProductFiltersPro(optional: true): ProductFiltersProContext | null
export function useProductFiltersPro(optional?: false): ProductFiltersProContext
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
  /** Whether the filter should scroll to the products list and whether to submit the form on change. */
  autoSubmitMd?: boolean

  handleSubmit?: (
    formValues: ProductFilterParams,
    next: (shallow?: boolean, replace?: boolean) => Promise<void>,
  ) => Promise<void> | void
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
      leading
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
  const pathname = usePathname()
  const theme = useTheme()
  const isDesktop = useMatchMediaMotionValue('up', 'md')
  const scrollMarginTop = useTransform(() => (isDesktop.get() ? 0 : theme.appShell.headerHeightSm))
  const scroll = useTransform(() => !autoSubmitMd || isDesktop.get())

  const submit = useEventCallback(
    form.handleSubmit(async (formValues) => {
      const generatedPath = productListLinkFromFilter({ ...formValues, currentPage: 1 })

      // Extract the store/locale prefix from the current pathname (e.g., '/en' from '/en/c/women')
      // In App Router with [store] segment, we need to manually prepend the store
      const pathSegments = pathname.split('/')
      const storePrefix = pathSegments[1] ? `/${pathSegments[1]}` : ''

      // Prepend store prefix to the generated path
      const path = `${storePrefix}${generatedPath}`

      if (pathname === path) return false

      const isSearch = pathname.includes('/search')
      const isFilter = pathname.includes('/q/')

      const next = async (shallow = false, replace: boolean = isSearch || isFilter) => {
        const opts = { scroll: scroll.get() }
        await (replace ? router.replace(path, opts) : router.push(path, opts))
      }

      if (handleSubmit) return handleSubmit(formValues, next)
      return next()
    }),
  )

  const filterFormContext = useMemo(() => {
    const ctx: ProductFiltersProContext = {
      form,
      params: defaultValues,
      submit,
      appliedAggregations,
      filterTypes,
      aggregations: aggregations ?? appliedAggregations,
    }
    globalFormContextRef.current = ctx
    return ctx
  }, [form, defaultValues, submit, appliedAggregations, filterTypes, aggregations])

  // When the component unmounts, we want to clear the global filter form
  useEffect(
    () => () => {
      globalFormContextRef.current = null
    },
    [],
  )

  return (
    <FilterFormContext.Provider value={filterFormContext}>
      <m.form ref={ref} noValidate onSubmit={submit} id='products' style={{ scrollMarginTop }} />
      {children}
      {autoSubmitMd && <AutoSubmitSidebarDesktop />}
    </FilterFormContext.Provider>
  )
}
