import type { graphqlConfig as graphqlConfigType } from '@graphcommerce/graphql'
import { SetContextLink } from '@graphcommerce/graphql'
import type { FunctionPlugin, PluginConfig } from '@graphcommerce/next-config'

export const config: PluginConfig = {
  type: 'function',
  module: '@graphcommerce/graphql',
}

declare module '@graphcommerce/graphql/config' {
  interface PreviewData {
    hygraphStage: string | null
  }
}

export const graphqlConfig: FunctionPlugin<typeof graphqlConfigType> = (prev, conf) => {
  const results = prev(conf)

  const locales = conf.storefront.hygraphLocales

  const hygraphLink = new SetContextLink((prevContext) => {
    const headers: Record<string, string> = { ...prevContext.headers }
    if (locales) headers['gcms-locales'] = locales.join(',')

    const stage = conf.previewData?.hygraphStage ?? 'DRAFT'
    if (conf.preview) {
      headers['gcms-stage'] = stage
    }

    return { headers }
  })

  return { ...results, links: [...results.links, hygraphLink] }
}
