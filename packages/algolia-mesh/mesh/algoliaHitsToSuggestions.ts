import { Algoliahit } from '@graphcommerce/graphql-mesh'

export function algoliaHitsToSuggestions(hits: Algoliahit[]) {
  return hits.map((hit) => {
    return { search: hit.objectID }
  })
}
