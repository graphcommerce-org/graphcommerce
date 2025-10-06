import type { MeshContext } from '@graphcommerce/graphql-mesh'
import type { GraphCommerceStorefrontConfig } from '@graphcommerce/next-config'

export function storefrontFromContext(
  context: MeshContext & { headers?: Record<string, string> },
): GraphCommerceStorefrontConfig | undefined {
  const storefrontAll = import.meta.graphCommerce.storefront
  const store = context.headers?.store
  return storefrontAll.find((s) => s.magentoStoreCode === store)
}
