import {
  useForm,
  useFormAutoSubmit,
  UseFormProps,
  UseFormReturn,
} from '@graphcommerce/ecommerce-ui'
import { useMemoObject } from '@graphcommerce/next-ui'
import { useTheme, useMediaQuery } from '@mui/material'
import React, { BaseSyntheticEvent, createContext, useContext, useEffect, useMemo } from 'react'
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
> & { children: React.ReactNode; params: ProductListParams }

export function ProductFiltersPro(props: FilterFormProviderProps) {
  const { children, params, ...formProps } = props
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.down('md'))

  const filterParams = useMemoObject(toFilterParams(params))
  const form = useForm<ProductFilterParams>({
    values: filterParams,
    ...formProps,
  })

  const { handleSubmit } = form

  const push = useProductListLinkReplace({ scroll: false })
  const submit = handleSubmit(async (formValues) =>
    push({ ...toProductListParams(formValues), currentPage: 1 }),
  )

  useFormAutoSubmit({ form, submit, disabled: matches })

  return (
    <FilterFormContext.Provider
      value={useMemo(() => ({ form, params: filterParams, submit }), [form, filterParams, submit])}
    >
      <form noValidate onSubmit={submit} />
      {children}
    </FilterFormContext.Provider>
  )
}
