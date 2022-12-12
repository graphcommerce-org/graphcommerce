import { useForm, useFormPersist, UseFormReturn } from '@graphcommerce/ecommerce-ui'
import { ProductAttributeFilterInput } from '@graphcommerce/graphql-mesh'
import { BaseSyntheticEvent, createContext, PropsWithChildren, useContext, useMemo } from 'react'
import { useProductListLinkReplace } from '../../hooks/useProductListLinkReplace'
import { ProductListParams } from '../ProductListItems/filterTypes'

type FilterFormContextProps = {
  form: UseFormReturn<ProductAttributeFilterInput>
  params: ProductListParams
  submit: (e?: BaseSyntheticEvent<object, any, any> | undefined) => Promise<void>
}

const filterFormContext = createContext<FilterFormContextProps>({
  form: {} as UseFormReturn<ProductAttributeFilterInput>,
  params: {} as ProductListParams,
  submit: () => new Promise(() => {}),
})

export const useFilterForm = () => useContext(filterFormContext)

export function FilterFormProvider(props: PropsWithChildren<{ initialParams: ProductListParams }>) {
  const { children, initialParams: params } = props
  const form = useForm<ProductAttributeFilterInput & { sort?: string }>({
    defaultValues: params.filters,
  })
  const { handleSubmit, reset } = form
  const replaceRoute = useProductListLinkReplace({ scroll: false })

  const submit = handleSubmit(async (formValues) => {
    const { sort, ...filters } = formValues
    await replaceRoute({
      ...params,
      filters,
      sort: sort && typeof sort !== 'object' ? { [sort]: 'ASC' } : {},
    })
    // reset()
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
