import { type graphqlConfig as graphqlConfigType, setContext } from '@graphcommerce/graphql'
import type { FunctionPlugin, PluginConfig } from '@graphcommerce/next-config'

export const config: PluginConfig = {
  type: 'function',
  module: '@graphcommerce/graphql',
}

declare module '@graphcommerce/graphql/config' {
  interface PreviewData {
    magentoPreviewVersion?: string
  }
}

export const graphqlConfig: FunctionPlugin<typeof graphqlConfigType> = (prev, conf) => {
  const results = prev(conf)

  const previewVersion = conf.previewData?.magentoPreviewVersion

  return {
    ...results,
    links: [
      ...results.links,
      setContext((_, context) => {
        if (!context.headers) context.headers = {}
        context.headers.store = conf.storefront.magentoStoreCode
        if (conf.preview) {
          // To disable caching from the backend, we provide a bogus cache ID.
          context.headers['x-magento-cache-id'] =
            `random-cache-id${Math.random().toString(36).slice(2)}`
          if (previewVersion) {
            context.headers['preview-version'] = previewVersion
          }
        }
        return context
      }),
    ],
  }
}
