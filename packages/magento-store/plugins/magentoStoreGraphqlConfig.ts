import { SetContextLink, type graphqlConfig as graphqlConfigType } from '@graphcommerce/graphql'
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
      new SetContextLink((prevContext) => {
        const headers: Record<string, string> = { ...prevContext.headers }

        if (!headers.store) {
          headers.store = conf.storefront.magentoStoreCode
        }

        const contentCurrency = cookie('Magento-Content-Currency')
        if (contentCurrency && typeof headers['content-currency'] === 'undefined')
          headers['content-currency'] = contentCurrency

        if (conf.preview) {
          // To disable caching from the backend, we provide a bogus cache ID.
          headers['x-magento-cache-id'] = `random-cache-id${Math.random().toString(36).slice(2)}`
        }
        return { headers }
      }),
    ],
  }
}
