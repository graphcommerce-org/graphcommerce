import { ALGOLIA_USER_TOKEN_COOKIE_NAME } from '@graphcommerce/algolia-insights'
import {
  type getPrivateQueryContext as getPrivateQueryContextType,
  type usePrivateQueryContext as usePrivateQueryContextType,
} from '@graphcommerce/graphql'
import type { PrivateContext } from '@graphcommerce/graphql-mesh'
import type { FunctionPlugin, PluginConfig } from '@graphcommerce/next-config'
import { cookie } from '@graphcommerce/next-ui'

export const config: PluginConfig = {
  type: 'function',
  module: '@graphcommerce/graphql',
}

export const getPrivateQueryContext: FunctionPlugin<typeof getPrivateQueryContextType> = (
  prev,
  client,
  ...args
) => {
  const algoliaUserToken = cookie(ALGOLIA_USER_TOKEN_COOKIE_NAME)
  const res = prev(client, ...args)
  if (!algoliaUserToken) return res
  return { ...res, algoliaUserToken } satisfies PrivateContext
}

export const usePrivateQueryContext: FunctionPlugin<typeof usePrivateQueryContextType> = (
  prev,
  ...args
) => {
  const algoliaUserToken = cookie(ALGOLIA_USER_TOKEN_COOKIE_NAME)
  const res = prev(...args)
  if (!algoliaUserToken) return res
  return { ...res, algoliaUserToken }
}
