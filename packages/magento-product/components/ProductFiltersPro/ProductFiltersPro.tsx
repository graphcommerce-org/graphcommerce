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
  beforeContent?: React.ReactNode
  afterContent?: React.ReactNode
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
  const { children, topleft, topbar, beforeContent, afterContent, params, sidebar, ...formProps } =
    props

  const defaultValues = useMemoObject(toFilterParams(params))
  const form = useForm<ProductFilterParams>({ defaultValues, ...formProps })

  const push = useProductListLinkReplace({ scroll: false })
  const submit = useEventCallback(
    form.handleSubmit(async (formValues) =>
      push({ ...toProductListParams(formValues), currentPage: 1 }),
    ),
  )

  // We only need to auto-submit when the layout is not sidebar and we're viewing on desktop
  const m = useMediaQuery<Theme>((t) => t.breakpoints.down('md'), { defaultMatches: false })
  const autoSubmitDisabled = m || layout !== 'sidebar'

  const classes = withState({ layout })

  const filterFormContext = useMemo(
    () => ({ form, params: defaultValues, submit }),
    [form, defaultValues, submit],
  )

  return (
    <FilterFormContext.Provider value={filterFormContext}>
      <form noValidate onSubmit={submit} id='products' />
      <FormAutoSubmit control={form.control} disabled={autoSubmitDisabled} submit={submit} />

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
                "beforeContent" auto
                "items"         auto
                "afterContent"  auto
              `,
              md: `
                "topleft beforeContent" auto
                "sidebar items"         min-content
                "sidebar afterContent"  1fr
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
        <Box
          sx={{ gridArea: 'topleft', display: { xs: 'none', md: 'block' }, alignSelf: 'center' }}
        >
          {topleft}
        </Box>
        {sidebar && layout === 'sidebar' && (
          <Box sx={{ gridArea: 'sidebar', display: { xs: 'none', md: 'block' } }}>{sidebar}</Box>
        )}
        <Box sx={{ gridArea: 'beforeContent', mt: { md: 0 } }}>{beforeContent}</Box>
        {children}

        {afterContent && <Box sx={{ gridArea: 'afterContent' }}>{afterContent}</Box>}
      </Container>
    </FilterFormContext.Provider>
  )
}
