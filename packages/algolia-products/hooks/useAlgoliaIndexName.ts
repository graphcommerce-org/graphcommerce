import { algolia } from '@graphcommerce/next-config/config'
import { useStorefrontConfig } from '@graphcommerce/next-ui'

export function useAlgoliaIndexName() {
  return `${algolia.indexNamePrefix}${useStorefrontConfig().magentoStoreCode}_products`
}
