import { UseFormReturn } from '@graphcommerce/ecommerce-ui'
import { cloneDeep } from '@graphcommerce/graphql'
import {
  FilterEqualTypeInput,
  FilterRangeTypeInput,
  ProductAttributeFilterInput,
  ProductAttributeSortInput,
} from '@graphcommerce/graphql-mesh'
import { useProductListLinkReplace } from '../../../hooks/useProductListLinkReplace'
import { ProductListParams } from '../../ProductListItems/filterTypes'
import { FilterFormReturnType, useFilterForm } from '../FilterFormContext'

export type FilterActionProps = {
  attribute_code?: keyof ProductAttributeFilterInput | 'sort' | string
}

type LocalFilterInputProps = FilterActionProps & {
  form: UseFormReturn<FilterFormReturnType>
  params: ProductListParams
}

const emptyFilters = (props: LocalFilterInputProps & { defaultValue: unknown }) => {
  const { params, attribute_code, form, defaultValue = '' } = props
  const linkParams = cloneDeep(params)

  // If the attribute_code is a filter key, replace filter value with default value
  if (attribute_code && Object.keys(params.filters).find((f) => f === attribute_code)) {
    const activeFilter: FilterEqualTypeInput | FilterRangeTypeInput | ProductAttributeSortInput =
      linkParams.filters[attribute_code]
    const filterkeys = Object.keys(activeFilter ?? {})
    const clearFilters = {}
    filterkeys.forEach((key, index) => {
      clearFilters[key] = Array.isArray(defaultValue) ? defaultValue[index] : defaultValue
    })

    if (linkParams && attribute_code) {
      form?.reset({
        ...linkParams,
        filters: { ...linkParams.filters, [attribute_code]: clearFilters },
        sort: Object.keys(linkParams.sort)[0],
      })
    }
  }

  // If the attribute_code is a sort key, replace sort value with default value
  if (attribute_code === 'sort' && typeof defaultValue === 'string') {
    form?.reset({
      ...linkParams,
      sort: defaultValue,
    })
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
    form?.reset({ ...linkParams, sort: undefined })
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
