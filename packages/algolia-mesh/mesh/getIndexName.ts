import { MeshContext } from '@graphcommerce/graphql-mesh'
import { storefrontConfigDefault } from '@graphcommerce/next-ui'

function getStoreHeader(context: MeshContext) {
  return (context as MeshContext & { headers: Record<string, string | undefined> }).headers.store
}

export function getIndexName(context: MeshContext) {
  const storeCode = getStoreHeader(context) ?? storefrontConfigDefault().magentoStoreCode
  return `${import.meta.graphCommerce.algoliaIndexNamePrefix}${storeCode}_products`
}

export function getSuggestionsIndexName(context: MeshContext) {
  const index = getIndexName(context)
  return `${index}_query_suggestions`
}
