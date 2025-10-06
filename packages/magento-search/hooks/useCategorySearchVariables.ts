import { useQuery } from '@graphcommerce/graphql'
import { StoreConfigDocument } from '@graphcommerce/magento-store'
import type { CategorySearchQueryVariables } from '../graphql/queries/CategorySearch.gql'
import {
  categoriesApplySearchDefaults,
  type CategoriesApplySearchVariablesProps,
} from '../utils/categoriesApplySearchDefaults'

export function useCategorySearchVariables(
  props: CategoriesApplySearchVariablesProps,
): CategorySearchQueryVariables {
  const config = useQuery(StoreConfigDocument).data
  return config ? categoriesApplySearchDefaults(props, config) : {}
}
