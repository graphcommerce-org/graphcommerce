import { UseFormReturn } from '@graphcommerce/ecommerce-ui'
import { ProductAttributeSortInput, SortEnum } from '@graphcommerce/graphql-mesh'
import { ProductFilterParams } from '../ProductListItems/filterTypes'

type Props = {
  activeSort: keyof ProductAttributeSortInput | null
  defaultSortBy: keyof ProductAttributeSortInput
  form: Omit<UseFormReturn<ProductFilterParams>, 'formState' | 'watch'>
  sortDirection: SortEnum | null
}

export function handleSort({ sortDirection, form, activeSort, defaultSortBy }: Props) {
  if (sortDirection === 'ASC') {
    form.setValue('dir', 'DESC')
  } else {
    form.setValue('dir', 'ASC')
  }
  if (activeSort === null) {
    form.setValue('sort', defaultSortBy)
    form.setValue('dir', 'ASC')
  }
}
