import { useStorefrontConfig } from '@graphcommerce/next-ui'

export function useAlgoliaIndexName() {
  return `${import.meta.graphCommerce.algoliaIndexNamePrefix}${useStorefrontConfig().magentoStoreCode}_products`
}
