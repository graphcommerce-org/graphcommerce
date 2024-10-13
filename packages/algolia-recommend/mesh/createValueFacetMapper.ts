import type {
  AlgoliarecommendationsHit,
  AlgoliatrendingFacetHit,
  TrendingFacetValue,
} from '@graphcommerce/graphql-mesh'

export function createFacetValueMapper() {
  const isAlgoliaRecommendHit = (hit: AlgoliarecommendationsHit): hit is AlgoliatrendingFacetHit =>
    !!hit && '__typename' in hit && hit.__typename === 'AlgoliatrendingFacetHit'

  return (hit: AlgoliarecommendationsHit): TrendingFacetValue | null =>
    isAlgoliaRecommendHit(hit) ? hit : null
}
