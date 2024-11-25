import type { Maybe, MeshContext, StoreConfig } from '@graphcommerce/graphql-mesh'

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

let configCache: Promise<StoreConfig>

export function getStoreConfig(context: MeshContext): Promise<StoreConfig> {
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  if (!configCache) {
    configCache = context.m2.Query.storeConfig({
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
  }
  return configCache
}
