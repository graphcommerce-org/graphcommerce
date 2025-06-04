import type { MeshContext } from '@graphcommerce/graphql-mesh'
import { getIndexName } from './getIndexName'

export function getSearchSuggestionsIndexName(context: MeshContext) {
  return `${getIndexName(context)}${import.meta.graphCommerce.algolia.suggestionsSuffix}`
}
