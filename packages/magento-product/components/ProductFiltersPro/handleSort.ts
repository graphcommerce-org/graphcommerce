import { UseFormReturn } from '@graphcommerce/ecommerce-ui'
import { SortEnum } from '@graphcommerce/graphql-mesh'
import { ProductFilterParams } from '../ProductListItems/filterTypes'

type Props = {
  form: Omit<UseFormReturn<ProductFilterParams>, 'formState' | 'watch'>
  sortDirection: SortEnum | null
}

export function handleSort({ sortDirection, form }: Props) {
  if (sortDirection === 'ASC') {
    form.setValue('dir', 'DESC')
  } else {
    form.setValue('dir', 'ASC')
  }
}
