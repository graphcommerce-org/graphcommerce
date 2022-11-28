import { UseFormReturn } from '@graphcommerce/ecommerce-ui'
import { cloneDeep } from '@graphcommerce/graphql'
import {
  FilterEqualTypeInput,
  FilterRangeTypeInput,
  ProductAttributeFilterInput,
} from '@graphcommerce/graphql-mesh'
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

const emptyFilters = (props: LocalFilterInputProps & { defaultValue: unknown }) => {
  const { params, attribute_code, form, defaultValue = '' } = props
  const linkParams = cloneDeep(params)

  if (attribute_code) {
    const activeFilter = linkParams.filters[attribute_code] as
      | FilterEqualTypeInput
      | FilterRangeTypeInput
    const filterkeys = Object.keys(activeFilter ?? {})
    const clearFilters = {}
    filterkeys.forEach((key, index) => {
      clearFilters[key] = Array.isArray(defaultValue) ? defaultValue[index] : defaultValue
    })

    if (linkParams && attribute_code) {
      form?.reset({
        ...linkParams.filters,
        [attribute_code]: clearFilters,
      })
    }
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

export const useFilterActions = (props: FilterActionProps) => {
  const replaceRoute = useProductListLinkReplace({ scroll: false })
  const { form, params, submit } = useFilterForm()
  return {
    applyFilters: submit,
    emptyFilters: (defaultValue?: unknown) =>
      emptyFilters({ ...props, form, params, defaultValue }),
    clearAllFilters: () => removeAllFilters({ ...props, form, params, onReplace: replaceRoute }),
  }
}
