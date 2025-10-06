import type { Maybe, MeshContext, StoreConfig } from '@graphcommerce/graphql-mesh'
import { getIndexName } from './getIndexName'

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

  const configCache = await context.m2.Query.storeConfig({
    context,
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
