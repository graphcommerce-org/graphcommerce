import { UseFormReturn } from '@graphcommerce/ecommerce-ui'
import { cloneDeep } from '@graphcommerce/graphql'
import { ProductAttributeFilterInput } from '@graphcommerce/graphql-mesh'
import { useProductListLinkReplace } from '../../hooks/useProductListLinkReplace'
import { ProductFilterParams } from '../ProductListItems/filterTypes'
import { useProductFiltersPro } from './ProductFiltersPro'

export type FilterActionProps = {
  attribute_code: keyof ProductAttributeFilterInput
}

type LocalFilterInputProps = FilterActionProps & {
  form: UseFormReturn<ProductFilterParams>
  params: ProductFilterParams
}

const emptyFilters = (props: LocalFilterInputProps & { defaultValue: unknown }) => {
  const { params, attribute_code, form, defaultValue = '' } = props
  const linkParams = cloneDeep(params)

  // If the attribute_code is a filter key, replace filter value with default value
  const activeFilter = linkParams.filters[attribute_code]

  const filterkeys = Object.keys(activeFilter ?? {})
  const clearFilters = {}
  filterkeys.forEach((key, index) => {
    clearFilters[key] = Array.isArray(defaultValue) ? defaultValue[index] : defaultValue
  })

  if (linkParams && attribute_code) {
    form?.reset({
      ...linkParams,
      filters: { ...linkParams.filters, [attribute_code]: clearFilters },
    })
  }

  return linkParams
}

const removeAllFilters = (
  props: LocalFilterInputProps & { onReplace: (params: ProductFilterParams) => void },
) => {
  const { params, form, onReplace } = props
  const linkParams = cloneDeep(params)
  if (linkParams) {
    Object.keys(linkParams.filters).forEach((filter) => delete linkParams.filters[filter])
    delete linkParams.currentPage
    form?.reset({ ...linkParams, sort: undefined })
    onReplace(linkParams)
  }
}

export const useFilterActions = (props: FilterActionProps) => {
  const replaceRoute = useProductListLinkReplace({ scroll: false })
  const { form, params, submit } = useProductFiltersPro()
  return {
    emptyFilters: (defaultValue?: unknown) =>
      emptyFilters({ ...props, form, params, defaultValue }),
    clearAllFilters: () => removeAllFilters({ ...props, form, params, onReplace: replaceRoute }),
  }
}
