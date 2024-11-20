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

export const graphqlConfig: FunctionPlugin<typeof graphqlConfigType> = (prev, conf) => {
  const results = prev(conf)

  const locales = conf.storefront.hygraphLocales

  if (!locales) return prev(conf)

  const hygraphLink = setContext((_, context) => {
    if (!context.headers) context.headers = {}
    context.headers['gcms-locales'] = locales.join(',')

    const stage = conf.previewData?.hygraphStage ?? 'DRAFT'
    if (conf.preview) {
      context.headers['gcms-stage'] = stage
    }

    return context
  })

  return { ...results, links: [...results.links, hygraphLink] }
}
