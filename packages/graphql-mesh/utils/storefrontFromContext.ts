import type { GraphCommerceStorefrontConfig } from '@graphcommerce/next-config'
import type { MeshContext } from '@graphql-mesh/runtime'

export function storefrontFromContext(
  context: MeshContext & { headers?: Record<string, string> },
): GraphCommerceStorefrontConfig | undefined {
  const storefrontAll = import.meta.graphCommerce.storefront
  const store = context.headers?.store
  return storefrontAll.find((s) => s.magentoStoreCode === store)
}
