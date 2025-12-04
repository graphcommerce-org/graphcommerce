import type { MeshContext } from '@graphcommerce/graphql-mesh'
import { algolia } from '@graphcommerce/next-config/config'
import { storefrontConfigDefault } from '@graphcommerce/next-ui'

function getStoreHeader(context: MeshContext) {
  return (context as MeshContext & { headers: Record<string, string | undefined> }).headers.store
}

export function getIndexName(context: MeshContext) {
  const storeCode = getStoreHeader(context) ?? storefrontConfigDefault().magentoStoreCode
  return `${algolia.indexNamePrefix}${storeCode}_products`
}
