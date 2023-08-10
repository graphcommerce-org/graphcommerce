import { storefrontConfig } from '@graphcommerce/next-ui'
import { useRouter } from 'next/router'

export function useAlgoliaSearchIndexConfig(suffix: string) {
  const { locale } = useRouter()
  return storefrontConfig(locale)?.algoliaSearchIndexConfig.find((ai) =>
    ai.searchIndex.includes(suffix),
  )
}
