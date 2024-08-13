import { useStorefrontConfig } from '@graphcommerce/next-ui'

export function useAlgoliaIndexName() {
  return `${import.meta.graphCommerce.algolia.indexNamePrefix}${useStorefrontConfig().magentoStoreCode}_products`
}
