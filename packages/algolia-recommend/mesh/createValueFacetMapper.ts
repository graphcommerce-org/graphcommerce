import type {
  AlgoliarecommendationsHit,
  AlgoliatrendingFacetHit,
  TrendingFacet,
} from '@graphcommerce/graphql-mesh'

export function createFacetValueMapper() {
  const isAlgoliaRecommendHit = (hit: AlgoliarecommendationsHit): hit is AlgoliatrendingFacetHit =>
    !!hit && '__typename' in hit && hit.__typename === 'AlgoliatrendingFacetHit'

  return (hit: AlgoliarecommendationsHit): TrendingFacet | null =>
    isAlgoliaRecommendHit(hit) ? hit : null
}
