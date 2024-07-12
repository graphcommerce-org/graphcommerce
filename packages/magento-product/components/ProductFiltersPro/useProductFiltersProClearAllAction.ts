import { useCallback } from 'react'
import { ProductFilterParams } from '../ProductListItems/filterTypes'
import { useProductFiltersPro } from './ProductFiltersPro'

export function useProductFiltersProClearAllAction() {
  const { form, submit } = useProductFiltersPro()
  const { reset, getValues } = form

  return useCallback(() => {
    const currentValues = getValues()
    const cleanedFilters: ProductFilterParams['filters'] = Object.fromEntries(
      Object.keys(currentValues.filters).map((key) => [key, null]),
    )

    reset(
      {
        ...currentValues,
        pageSize: null,
        currentPage: 1,
        dir: null,
        sort: null,
        filters: {
          ...cleanedFilters,
          category_uid: getValues('filters.category_uid'),
        },
      },
      { keepSubmitCount: true, keepIsValid: true },
    )
    return submit()
  }, [getValues, reset, submit])
}
