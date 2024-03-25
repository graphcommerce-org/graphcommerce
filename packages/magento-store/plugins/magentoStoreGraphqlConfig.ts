import type { graphqlConfig as graphqlConfigType } from '@graphcommerce/graphql'
import type { FunctionPlugin, PluginConfig } from '@graphcommerce/next-config'
import { createStoreLink } from '../link/createStoreLink'

export const config: PluginConfig = {
  type: 'function',
  module: '@graphcommerce/graphql',
}

export const graphqlConfig: FunctionPlugin<typeof graphqlConfigType> = (prev, conf) => {
  const results = prev(conf)
  return { ...results, links: [...results.links, createStoreLink(conf.storefront.locale)] }
}
