import type { graphqlConfig } from '@graphcommerce/graphql'
import type { MethodPlugin } from '@graphcommerce/next-config'
import { createStoreLink } from '../link/createStoreLink'

export const func = 'graphqlConfig'
export const exported = '@graphcommerce/graphql'

const magentoStoreGraphqlConfig: MethodPlugin<typeof graphqlConfig> = (prev, config) => {
  const results = prev(config)
  return { ...results, links: [...results.links, createStoreLink(config.storefront.locale)] }
}

export const plugin = magentoStoreGraphqlConfig
