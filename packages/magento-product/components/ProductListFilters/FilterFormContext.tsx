import { useForm, useFormPersist, UseFormReturn } from '@graphcommerce/ecommerce-ui'
import { ProductAttributeFilterInput } from '@graphcommerce/graphql-mesh'
import { createContext, PropsWithChildren, useContext, useMemo } from 'react'
import { useProductListLinkReplace } from '../../hooks/useProductListLinkReplace'
import { useProductListParamsContext } from '../../hooks/useProductListParamsContext'
import { ProductListParams } from '../ProductListItems/filterTypes'
import { useFilterActions } from './helpers/filterActions'

type FilterFormContextProps = {
  form: UseFormReturn<ProductAttributeFilterInput>
  params: ProductListParams
}

const filterFormContext = createContext<FilterFormContextProps>({
  form: {} as UseFormReturn<ProductAttributeFilterInput>,
  params: {} as ProductListParams,
})

export const useFilterForm = () => useContext(filterFormContext)

export function FilterFormProvider(props: PropsWithChildren) {
  const { children } = props
  const form = useForm<ProductAttributeFilterInput>({ defaultValues: {} })
  const { params } = useProductListParamsContext()
  const { handleSubmit } = form
  const replaceRoute = useProductListLinkReplace({ scroll: false })

  useFormPersist({ form, name: 'ProductListFilterForm' })

  const submit = handleSubmit((e) => {
    replaceRoute({ ...params, filters: e })
  })

  return (
    <filterFormContext.Provider value={useMemo(() => ({ form, params }), [form, params])}>
      <form id='filter-form' noValidate onSubmit={submit} style={{ display: 'flex' }}>
        {children}
      </form>
    </filterFormContext.Provider>
  )
}
