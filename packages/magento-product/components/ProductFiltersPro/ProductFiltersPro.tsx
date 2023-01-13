import { useForm, UseFormReturn } from '@graphcommerce/ecommerce-ui'
import React, { BaseSyntheticEvent, createContext, useContext, useMemo } from 'react'
import { useProductListLinkReplace } from '../../hooks/useProductListLinkReplace'
import { ProductListParams } from '../ProductListItems/filterTypes'

export type FilterFormValues = Pick<ProductListParams, 'filters'> & { sort?: string }

type FilterFormContextProps = {
  form: UseFormReturn<FilterFormValues>
  params: ProductListParams
  submit: (e?: BaseSyntheticEvent<object, any, any> | undefined) => Promise<void>
}

const FilterFormContext = createContext<FilterFormContextProps | null>(null)

export const useFilterForm = () => {
  const context = useContext(FilterFormContext)
  if (!context) throw Error('useFilterForm should be used inside ProductFiltersPro')
  return context
}

export type FilterFormProviderProps = {
  params: ProductListParams
  children: React.ReactNode
}

export function ProductFiltersPro(props: FilterFormProviderProps) {
  const { children, params } = props

  // sort wordt undefined gemaakt omdat het type van sort is anders.
  const form = useForm<FilterFormValues>({ defaultValues: { ...params, sort: undefined } })

  const { handleSubmit } = form
  const push = useProductListLinkReplace({ scroll: false })

  const submit = handleSubmit(async (formValues) => {
    const { sort, filters } = formValues
    await push({ ...params, filters, sort: sort ? { [sort]: 'ASC' } : {} })
  })

  return (
    <FilterFormContext.Provider
      value={useMemo(() => ({ form, params, submit }), [form, params, submit])}
    >
      <form id='filter-form' noValidate onSubmit={submit}>
        {children}
      </form>
    </FilterFormContext.Provider>
  )
}
