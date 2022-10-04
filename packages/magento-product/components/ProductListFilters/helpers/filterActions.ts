import { UseFormReset } from '@graphcommerce/ecommerce-ui'
import { cloneDeep, empty } from '@graphcommerce/graphql'
import { useProductListLinkReplace } from '../../../hooks/useProductListLinkReplace'
import { ProductListParams } from '../../ProductListItems/filterTypes'

type FunctionProps = {
  params: ProductListParams
  attribute_code: string
  reset: UseFormReset<any>
}

export const emptyFilters = (props: FunctionProps) => {
  const { params, attribute_code, reset } = props
  const linkParams = cloneDeep(params)
  delete linkParams.filters[attribute_code]
  delete linkParams.currentPage
  reset({ ...linkParams.filters })
  return linkParams
}

export const useFilterActions = (props: FunctionProps) => {
  const replaceRoute = useProductListLinkReplace({ scroll: false })

  return {
    resetFilters: () => replaceRoute({ ...emptyFilters(props) }),
    emptyFilters: () => emptyFilters(props),
  }
}
