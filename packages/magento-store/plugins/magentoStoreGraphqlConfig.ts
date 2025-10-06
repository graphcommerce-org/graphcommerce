import { setContext, type graphqlConfig as graphqlConfigType } from '@graphcommerce/graphql'
import type { FunctionPlugin, PluginConfig } from '@graphcommerce/next-config'
import { cookie } from '@graphcommerce/next-ui'

export const config: PluginConfig = {
  type: 'function',
  module: '@graphcommerce/graphql',
}

export const graphqlConfig: FunctionPlugin<typeof graphqlConfigType> = (prev, conf) => {
  const results = prev(conf)

  return {
    ...results,
    links: [
      ...results.links,
      setContext((_, context) => {
        if (!context.headers) context.headers = {}
        if (!context.headers.store) {
          context.headers.store = conf.storefront.magentoStoreCode
        }

        const contentCurrency = cookie('Magento-Content-Currency')
        if (contentCurrency && typeof context.headers['content-currency'] === 'undefined')
          context.headers['content-currency'] = contentCurrency

        if (conf.preview) {
          // To disable caching from the backend, we provide a bogus cache ID.
          context.headers['x-magento-cache-id'] =
            `random-cache-id${Math.random().toString(36).slice(2)}`
        }
        return context
      }),
    ],
  }
}
