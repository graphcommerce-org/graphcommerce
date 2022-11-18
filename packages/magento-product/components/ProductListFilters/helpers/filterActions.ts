import { UseFormReturn } from '@graphcommerce/ecommerce-ui'
import { cloneDeep } from '@graphcommerce/graphql'
import { FilterEqualTypeInput, ProductAttributeFilterInput } from '@graphcommerce/graphql-mesh'
import { useProductListLinkReplace } from '../../../hooks/useProductListLinkReplace'
import { ProductListParams } from '../../ProductListItems/filterTypes'
import { useFilterForm } from '../FilterFormContext'

export type FilterActionProps = {
  attribute_code?: keyof ProductAttributeFilterInput | string
}

type LocalFilterInputProps = FilterActionProps & {
  form: UseFormReturn<ProductAttributeFilterInput>
  params: ProductListParams
}

const emptyFilters = (props: LocalFilterInputProps) => {
  const { params, attribute_code, form } = props
  const linkParams = cloneDeep(params)
  if (linkParams && attribute_code) {
    delete linkParams.filters[attribute_code]
    delete linkParams.currentPage
    form?.reset({ ...linkParams.filters })
  }

  return linkParams
}

const removeAllFilters = (
  props: LocalFilterInputProps & { onReplace: (params: ProductListParams) => void },
) => {
  const { params, form, onReplace } = props
  const linkParams = cloneDeep(params)
  if (linkParams) {
    Object.keys(linkParams.filters).forEach((filter) => delete linkParams.filters[filter])
    delete linkParams.currentPage
    form?.reset(linkParams.filters)
    onReplace(linkParams)
  }
}

const allowReset = (props: Pick<LocalFilterInputProps, 'form' | 'attribute_code'>) => {
  const { attribute_code, form } = props
  if (!attribute_code) return false
  const { watch } = form
  const filterValues = watch(attribute_code as keyof ProductAttributeFilterInput)
  const castedFilterValue = filterValues as FilterEqualTypeInput
  console.log(castedFilterValue)
  return castedFilterValue?.in !== undefined ? (castedFilterValue.in?.length ?? 0) > 0 : false
}

export const useFilterActions = (props: FilterActionProps) => {
  const replaceRoute = useProductListLinkReplace({ scroll: false })
  const { form, params } = useFilterForm()
  return {
    resetFilters: () => {
      const result = emptyFilters({ ...props, form, params })
      if (result) replaceRoute(result)
    },
    emptyFilters: () => emptyFilters({ ...props, form, params }),
    clearAllFilters: () => removeAllFilters({ ...props, form, params, onReplace: replaceRoute }),
    allowReset: allowReset({ ...props, form }),
  }
}
