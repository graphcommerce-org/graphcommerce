import { useForm, UseFormReturn } from '@graphcommerce/ecommerce-ui'
import { BaseSyntheticEvent, createContext, PropsWithChildren, useContext, useMemo } from 'react'
import { useProductListLinkReplace } from '../../hooks/useProductListLinkReplace'
import { ProductListParams } from '../ProductListItems/filterTypes'

export type FilterFormReturnType = Pick<ProductListParams, 'filters'> & { sort?: string }

type FilterFormContextProps = {
  form: UseFormReturn<FilterFormReturnType>
  params: ProductListParams
  submit: (e?: BaseSyntheticEvent<object, any, any> | undefined) => Promise<void>
}

const filterFormContext = createContext<FilterFormContextProps | null>(null)

export const useFilterForm = () => {
  const context = useContext(filterFormContext)
  if (!context) throw Error('useFilterForm should be used inside FilterFormProvider')
  return context
}

export function FilterFormProvider(props: PropsWithChildren<{ initialParams: ProductListParams }>) {
  const { children, initialParams: params } = props
  const form = useForm<FilterFormReturnType>({
    defaultValues: {
      ...params,
      sort: undefined,
    },
  })
  const { handleSubmit } = form
  const replaceRoute = useProductListLinkReplace({ scroll: false })

  const submit = handleSubmit(async (formValues) => {
    const { sort, filters } = formValues
    await replaceRoute({
      ...params,
      filters,
      sort: sort ? { [sort]: 'ASC' } : {},
    })
  })

  return (
    <filterFormContext.Provider
      value={useMemo(() => ({ form, params, submit }), [form, params, submit])}
    >
      <form id='filter-form' noValidate onSubmit={submit}>
        {children}
      </form>
    </filterFormContext.Provider>
  )
}
