import type { Maybe, MeshContext, StoreConfig } from '@graphcommerce/graphql-mesh'
import { storefrontConfigDefault } from '@graphcommerce/next-ui'
import { getIndexName } from './getIndexName'

function getStoreHeader(context: MeshContext) {
  return (context as MeshContext & { headers: Record<string, string | undefined> }).headers?.store
}

export type GetStoreConfigReturn =
  | Maybe<
      Pick<
        StoreConfig,
        | 'root_category_uid'
        | 'default_display_currency_code'
        | 'base_link_url'
        | 'product_url_suffix'
      >
    >
  | undefined

export async function getStoreConfig(context: MeshContext): Promise<StoreConfig> {
  const cacheKey = `algolia_getStoreConfig_${getIndexName(context)}`
  const configCached = context.cache.get(cacheKey)
  if (configCached) return configCached as StoreConfig

  // Ensure we have a store header set for the storeConfig query
  const storeCode = getStoreHeader(context) ?? storefrontConfigDefault().magentoStoreCode
  const contextWithHeaders = context as MeshContext & { headers?: Record<string, string> }
  const storeContext = { ...context, headers: { ...contextWithHeaders.headers, store: storeCode } }

  const configCache = await context.m2.Query.storeConfig({
    context: storeContext,
    selectionSet: /* GraphQL */ `
      {
        root_category_uid
        default_display_currency_code
        base_link_url
        product_url_suffix
      }
    `,
  })

  if (!configCache) throw new Error('Store config not found')
  await context.cache.set(cacheKey, configCache)
  return configCache
}
