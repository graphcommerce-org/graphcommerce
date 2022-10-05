import { UseFormReset, UseFormReturn } from '@graphcommerce/ecommerce-ui'
import { cloneDeep, empty } from '@graphcommerce/graphql'
import { ProductAttributeFilterInput } from '@graphcommerce/graphql-mesh'
import { useProductListLinkReplace } from '../../../hooks/useProductListLinkReplace'
import { ProductListParams } from '../../ProductListItems/filterTypes'

type FunctionProps = {
  params: ProductListParams
  attribute_code: string
  form: UseFormReturn<ProductAttributeFilterInput, any>
}

export const emptyFilters = (props: FunctionProps) => {
  const { params, attribute_code, form } = props
  const linkParams = cloneDeep(params)
  console.log({ ...linkParams.filters })

  delete linkParams.filters[attribute_code]
  delete linkParams.currentPage
  console.log({ ...linkParams.filters })
  form.reset({ ...linkParams.filters })
  return linkParams
}

export const useFilterActions = (props: FunctionProps) => {
  const replaceRoute = useProductListLinkReplace({ scroll: false })
  return {
    resetFilters: () => replaceRoute({ ...emptyFilters(props) }),
    emptyFilters: () => emptyFilters(props),
  }
}
