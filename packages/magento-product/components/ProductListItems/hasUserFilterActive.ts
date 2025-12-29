import type { ProductListQueryVariables } from '../ProductList/ProductList.gql'
import type { ProductListParams } from './filterTypes'

/**
 * Checks if a user defined filter is active.
 *
 * 1. Engine never counts as an active filter, so strip that.
 * 2. For the category page the category_uid is not a filter, strip that.
 */
export function hasUserFilterActive(
  params: ProductListParams | ProductListQueryVariables | undefined,
) {
  if (!params?.filters) return false

  const skipKeys = ['engine']
  const filterKeys = Object.keys(params.filters)

  const isCategory = typeof params.search !== 'string' && params.filters.category_uid
  if (isCategory) skipKeys.push('category_uid')

  return filterKeys.filter((k) => !skipKeys.includes(k)).length > 0
}
