import { useQuery } from '@graphcommerce/graphql'
import { CategorySearchDocument } from '../graphql/queries/CategorySearch.gql'
import {
  useCategorySearchVariables,
  type UseCategorySearchVariablesProps,
} from './useCategorySearchVariables'

export function useCategorySearch(props: UseCategorySearchVariablesProps) {
  const { search } = props
  const variables = useCategorySearchVariables(props)
  const skip = !search || search.length < 3

  const categories = useQuery(CategorySearchDocument, { variables, skip })

  const categoryItems = (
    categories.data?.categories?.items ??
    categories.previousData?.categories?.items ??
    []
  )
    .filter((v) => !!v)
    .filter((c) => (typeof c?.include_in_menu === 'boolean' ? c?.include_in_menu : true))

  if (categories.error || categoryItems.length === 0 || skip) return null

  return categoryItems
}
