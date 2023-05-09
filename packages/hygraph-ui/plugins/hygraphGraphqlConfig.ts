import { graphqlConfig, setContext } from '@graphcommerce/graphql'
import type { MethodPlugin } from '@graphcommerce/next-config'

export const func = 'graphqlConfig'
export const exported = '@graphcommerce/graphql/config'

const hygraphGraphqlConfig: MethodPlugin<typeof graphqlConfig> = (prev, config) => {
  const locales = config.storefront.hygraphLocales
  if (!locales) return prev(config)

  const hygraphLink = setContext((_, context) => {
    if (!context.headers) context.headers = {}
    context.headers['gcms-locales'] = locales.join(',')
    return context
  })

  return prev({ ...config, links: [...(config.links ?? []), hygraphLink] })
}

export const plugin = hygraphGraphqlConfig
