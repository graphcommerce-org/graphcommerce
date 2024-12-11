import type { MeshContext } from '@graphcommerce/graphql-mesh'
import { storefrontConfigDefault } from '@graphcommerce/next-ui'

function getStoreHeader(context: MeshContext) {
  return (context as MeshContext & { headers: Record<string, string | undefined> }).headers.store
}

export function getIndexName(context: MeshContext) {
  const storeCode = getStoreHeader(context) ?? storefrontConfigDefault().magentoStoreCode
  return `${import.meta.graphCommerce.algolia.indexNamePrefix}${storeCode}_categories`
}
