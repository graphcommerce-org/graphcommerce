import type { StoreConfigQuery } from '@graphcommerce/magento-store'
import type { CategorySearchQueryVariables } from '../graphql/queries/CategorySearch.gql'

export type CategoriesApplySearchVariablesProps = {
  search?: string | null
}

export function categoriesApplySearchDefaults(
  props: CategoriesApplySearchVariablesProps,
  conf: StoreConfigQuery,
): CategorySearchQueryVariables {
  const { search } = props
  return { filters: { name: { match: search } }, pageSize: 5 }
}
