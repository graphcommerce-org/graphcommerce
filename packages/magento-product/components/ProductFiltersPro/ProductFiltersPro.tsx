import {
  useForm,
  useFormAutoSubmit,
  UseFormProps,
  UseFormReturn,
} from '@graphcommerce/ecommerce-ui'
import type { ProductFiltersLayout } from '@graphcommerce/next-config'
import { extendableComponent, StickyBelowHeader, useMemoObject } from '@graphcommerce/next-ui'
import { useMediaQuery, Container, Box, Theme } from '@mui/material'
import React, { BaseSyntheticEvent, createContext, useContext, useMemo } from 'react'
import { useProductListLinkReplace } from '../../hooks/useProductListLinkReplace'
import {
  ProductFilterParams,
  ProductListParams,
  toFilterParams,
  toProductListParams,
} from '../ProductListItems/filterTypes'

type FilterFormContextProps = {
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

  topleft?: React.ReactNode
  topbar: React.ReactNode
  sidebar?: React.ReactNode
  count?: React.ReactNode
}

const layout = (
  import.meta.graphCommerce.productFiltersLayout ?? 'DEFAULT'
).toLowerCase() as Lowercase<ProductFiltersLayout>

type OwnerProps = {
  layout: typeof layout
}

const name = 'ProductFiltersPro' as const
const parts = ['root', 'content'] as const
const { withState } = extendableComponent<OwnerProps, typeof name, typeof parts>(name, parts)

export function ProductFiltersPro(props: FilterFormProviderProps) {
  const { children, topleft, topbar, count, params, sidebar, ...formProps } = props

  const filterParams = useMemoObject(toFilterParams(params))
  const form = useForm<ProductFilterParams>({ values: filterParams, ...formProps })

  const { handleSubmit } = form

  const push = useProductListLinkReplace({ scroll: false })
  const submit = handleSubmit(async (formValues) =>
    push({ ...toProductListParams(formValues), currentPage: 1 }),
  )

  // We only need to auto-submit when the layout is not sidebar and we're viewing on desktop
  const isMobile = useMediaQuery<Theme>((theme) => theme.breakpoints.down('md'), {
    defaultMatches: false,
  })
  useFormAutoSubmit({ form, submit, disabled: isMobile || layout !== 'sidebar' })

  const classes = withState({ layout })

  return (
    <FilterFormContext.Provider
      value={useMemo(() => ({ form, params: filterParams, submit }), [form, filterParams, submit])}
    >
      <form noValidate onSubmit={submit} />

      <StickyBelowHeader sx={{ display: { md: layout === 'sidebar' ? 'none' : undefined } }}>
        {topbar}
      </StickyBelowHeader>
      <Container
        maxWidth={false}
        className={classes.content}
        sx={(theme) => ({
          '&.layoutSidebar': {
            display: 'grid',
            gridTemplate: {
              xs: `
                "count"      auto
                "items"      1fr
                "pagination" auto
              `,
              md: `
                "topleft   count"      auto
                "sidebar items"      1fr
                "sidebar pagination" auto
                /300px   auto
              `,
            },
            columnGap: { md: theme.spacings.md, xl: theme.spacings.xxl },

            '& .ProductListItemsBase-root': {
              gridArea: 'items',
              gridTemplateColumns: {
                xs: 'repeat(2, 1fr)',
                lg: 'repeat(3, 1fr)',
                xl: 'repeat(4, 1fr)',
              },
            },
          },
        })}
      >
        <Box sx={{ gridArea: 'topleft', alignSelf: 'center' }}>{topleft}</Box>
        {sidebar && layout === 'sidebar' && (
          <Box sx={{ gridArea: 'sidebar', display: { xs: 'none', md: 'block' } }}>{sidebar}</Box>
        )}
        <Box sx={{ gridArea: 'count', mt: { md: 0 } }}>{count}</Box>
        {children}
      </Container>
    </FilterFormContext.Provider>
  )
}
