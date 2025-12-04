import type { MeshContext } from '@graphcommerce/graphql-mesh'
import type { GraphCommerceStorefrontConfig } from '@graphcommerce/next-config'
import { storefront } from '@graphcommerce/next-config/config'

export function storefrontFromContext(
  context: MeshContext & { headers?: Record<string, string> },
): GraphCommerceStorefrontConfig | undefined {
  const store = context.headers?.store
  return storefront.find((s) => s.magentoStoreCode === store)
}
