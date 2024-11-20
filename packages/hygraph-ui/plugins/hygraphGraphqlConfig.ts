import type { graphqlConfig as graphqlConfigType } from '@graphcommerce/graphql'
import { setContext } from '@graphcommerce/graphql'
import type { FunctionPlugin, PluginConfig } from '@graphcommerce/next-config'

export const config: PluginConfig = {
  type: 'function',
  module: '@graphcommerce/graphql',
}

declare module '@graphcommerce/graphql/config' {
  interface PreviewData {
    hygraphStage?: string
  }
}

export const graphqlConfig: FunctionPlugin<typeof graphqlConfigType> = (prev, config) => {
  const results = prev(config)

  const locales = config.storefront.hygraphLocales

  if (!locales) return prev(config)

  const hygraphLink = setContext((_, context) => {
    if (!context.headers) context.headers = {}
    context.headers['gcms-locales'] = locales.join(',')

    const stage = config.previewData?.hygraphStage ?? 'DRAFT'
    if (config.preview) {
      context.headers['gcms-stage'] = stage
    }

    return context
  })

  return { ...results, links: [...results.links, hygraphLink] }
}
