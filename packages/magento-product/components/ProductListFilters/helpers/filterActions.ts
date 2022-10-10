import { UseFormReturn } from '@graphcommerce/ecommerce-ui'
import { cloneDeep } from '@graphcommerce/graphql'
import { ProductAttributeFilterInput } from '@graphcommerce/graphql-mesh'
import { useProductListLinkReplace } from '../../../hooks/useProductListLinkReplace'
import { ProductListParams } from '../../ProductListItems/filterTypes'

type FunctionProps = {
  params: ProductListParams
  attribute_code: string
  form: UseFormReturn<ProductAttributeFilterInput>
}

export const emptyFilters = (props: FunctionProps) => {
  const { params, attribute_code, form } = props
  const linkParams = cloneDeep(params)
  delete linkParams.filters[attribute_code]
  delete linkParams.currentPage
  form.reset({ ...linkParams.filters })
  return linkParams
}

export const removeAllFilters = (
  props: FunctionProps & { onReplace: (params: ProductListParams) => void },
) => {
  const { params, form, onReplace } = props
  const linkParams = cloneDeep(params)
  Object.keys(linkParams.filters).forEach((filter) => delete linkParams.filters[filter])
  delete linkParams.currentPage
  form.reset(linkParams.filters)
  onReplace(linkParams)
}

export const useFilterActions = (props: FunctionProps) => {
  const replaceRoute = useProductListLinkReplace({ scroll: false })
  return {
    resetFilters: () => replaceRoute(emptyFilters(props)),
    emptyFilters: () => emptyFilters(props),
    clearAllFilters: () => removeAllFilters({ ...props, onReplace: replaceRoute }),
  }
}
