import { graphqlConfig, setContext } from '@graphcommerce/graphql'
import type { MethodPlugin } from '@graphcommerce/next-config'

export const func = 'graphqlConfig'
export const exported = '@graphcommerce/graphql/config'

const magentoStoreGraphqlConfig: MethodPlugin<typeof graphqlConfig> = (prev, config) => {
  const storeLink = setContext((_, context) => {
    if (!context.headers) context.headers = {}
    context.headers.store = config.storefront.magentoStoreCode
    return context
  })

  return prev({
    ...config,
    links: [...(config.links ?? []), storeLink],
  })
}

export const plugin = magentoStoreGraphqlConfig
