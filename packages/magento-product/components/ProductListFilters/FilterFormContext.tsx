import { useForm, UseFormReturn } from '@graphcommerce/ecommerce-ui'
import { ProductAttributeFilterInput } from '@graphcommerce/graphql-mesh'
import { createContext, PropsWithChildren, useContext, useMemo } from 'react'
import { useProductListParamsContext } from '../../hooks/useProductListParamsContext'
import { ProductListParams } from '../ProductListItems/filterTypes'

type FilterFormContextProps = {
  form: UseFormReturn<ProductAttributeFilterInput>
  params: ProductListParams
}

const filterFormContext = createContext<FilterFormContextProps>({
  form: {} as UseFormReturn<ProductAttributeFilterInput>,
  params: {} as ProductListParams,
})

export function FilterFormProvider(props: PropsWithChildren) {
  const { children } = props
  const form = useForm<ProductAttributeFilterInput>({ defaultValues: {} })
  const { params } = useProductListParamsContext()

  return (
    <filterFormContext.Provider value={useMemo(() => ({ form, params }), [form, params])}>
      {children}
    </filterFormContext.Provider>
  )
}

export const useFilterForm = () => useContext(filterFormContext)
