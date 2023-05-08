import { storefrontConfig } from '@graphcommerce/next-ui'
import { i18n } from '@lingui/core'

export function useAlgoliaSearchIndexConfig(suffix: string) {
  return storefrontConfig(i18n.locale)?.algoliaSearchIndexConfig.find((ai) =>
    ai.searchIndex.includes(suffix),
  )
}
