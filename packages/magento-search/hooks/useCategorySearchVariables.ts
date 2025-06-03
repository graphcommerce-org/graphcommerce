import type { CategorySearchQueryVariables } from '../graphql/queries/CategorySearch.gql'

export type UseCategorySearchVariablesProps = {
  search?: string | null
}

export function useCategorySearchVariables(
  props: UseCategorySearchVariablesProps,
): CategorySearchQueryVariables {
  const { search } = props
  return { filters: { name: { match: search } }, pageSize: 5 }
}
