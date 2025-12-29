import type { MeshContext } from '@graphcommerce/graphql-mesh'
import { algolia } from '@graphcommerce/next-config/config'
import { getIndexName } from './getIndexName'

export function getSearchSuggestionsIndexName(context: MeshContext) {
  return `${getIndexName(context)}${algolia.suggestionsSuffix}`
}
