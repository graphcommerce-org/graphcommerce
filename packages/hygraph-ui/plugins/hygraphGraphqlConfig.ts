import { graphqlConfig, setContext } from '@graphcommerce/graphql'
import type { FunctionPlugin } from '@graphcommerce/next-config'

export const func = 'graphqlConfig'
export const exported = '@graphcommerce/graphql'

declare module '@graphcommerce/graphql/config' {
  interface PreviewData {
    hygraphStage?: string
  }
}

const hygraphGraphqlConfig: FunctionPlugin<typeof graphqlConfig> = (prev, config) => {
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

export const plugin = hygraphGraphqlConfig
