import { UseFormReturn } from '@graphcommerce/ecommerce-ui'
import { cloneDeep } from '@graphcommerce/graphql'
import { ProductAttributeFilterInput } from '@graphcommerce/graphql-mesh'
import { useProductListLinkReplace } from '../../../hooks/useProductListLinkReplace'
import { ProductListParams } from '../../ProductListItems/filterTypes'
import { useFilterForm } from '../FilterFormContext'

export type FilterActionProps = {
  attribute_code?: string
}

type LocalFilterInputProps = FilterActionProps & {
  form: UseFormReturn<ProductAttributeFilterInput>
  params: ProductListParams
}

type IgnoreProps = { ignore: [{ [key: string]: any[] }] }

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

const showAll = (params) => {}

const submitForm = (props: Pick<LocalFilterInputProps, 'form'> & IgnoreProps) => {
  const { form, ignore } = props
  const { handleSubmit } = form

  handleSubmit(
    (data) => {
      console.log({ data })
      // ignore.filter((entry) =>
      //   console.log({ even: entry === data[Object.keys(entry)[0]], entry, data }),
      // )
      // return data
    },
    (data) => console.log('Invalid data', data),
  )
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
    showAll: () => showAll(params),
    sumbitForm: (ignore: IgnoreProps) => submitForm({ form, ...ignore }),
  }
}
