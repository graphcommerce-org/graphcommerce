import { ALGOLIA_USER_TOKEN_COOKIE_NAME } from '@graphcommerce/algolia-insights'
import {
  type getInContextInput as getInContextInputType,
  type useInContextInput as useInContextInputType,
} from '@graphcommerce/graphql'
import type { InContextInput } from '@graphcommerce/graphql-mesh'
import type { FunctionPlugin, PluginConfig } from '@graphcommerce/next-config'
import { cookie } from '@graphcommerce/next-ui'

export const config: PluginConfig = {
  type: 'function',
  module: '@graphcommerce/graphql',
}

export const getInContextInput: FunctionPlugin<typeof getInContextInputType> = (
  prev,
  client,
  ...args
) => {
  const algoliaUserToken = cookie(ALGOLIA_USER_TOKEN_COOKIE_NAME)
  const res = prev(client, ...args)
  if (!algoliaUserToken) return res
  return { ...res, algoliaUserToken } satisfies InContextInput
}

export const useInContextInput: FunctionPlugin<typeof useInContextInputType> = (prev, ...args) => {
  const algoliaUserToken = cookie(ALGOLIA_USER_TOKEN_COOKIE_NAME)
  const res = prev(...args)
  if (!algoliaUserToken) return res
  return { ...res, algoliaUserToken }
}
