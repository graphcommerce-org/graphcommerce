import { useStorefrontConfig } from '@graphcommerce/next-ui'

export function useAlgoliaSearchIndex(suffix: string) {
  return useStorefrontConfig().algoliaSearchIndexConfig.find((ai) =>
    ai.searchIndex.includes(suffix),
  )?.searchIndex
}
