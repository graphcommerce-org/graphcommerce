import {
  type getInContextInput as getInContextInputType,
  type useInContextInput as useInContextInputType,
} from '@graphcommerce/graphql'
import { InContextInput } from '@graphcommerce/graphql-mesh'
import type { FunctionPlugin, PluginConfig } from '@graphcommerce/next-config'
import { cookie } from '@graphcommerce/next-ui'
import { ALGOLIA_USER_TOKEN_COOKIE_NAME } from '../hooks/useSendAlgoliaEvent'

export const config: PluginConfig = {
  type: 'function',
  module: '@graphcommerce/graphql',
  ifConfig: 'algolia.personalizationEnabled',
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
