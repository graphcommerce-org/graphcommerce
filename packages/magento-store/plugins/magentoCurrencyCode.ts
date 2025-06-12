import {
  type getPrivateQueryContext as getPrivateQueryContextType,
  type usePrivateQueryContext as usePrivateQueryContextType,
} from '@graphcommerce/graphql'
import type { PrivateContext } from '@graphcommerce/graphql-mesh'
import type { FunctionPlugin, PluginConfig } from '@graphcommerce/next-config'
import { cookie, useCookie } from '@graphcommerce/next-ui'

export const config: PluginConfig = {
  type: 'function',
  module: '@graphcommerce/graphql',
}

export const getPrivateQueryContext: FunctionPlugin<typeof getPrivateQueryContextType> = (
  prev,
  client,
  ...args
) => {
  const currencyCode = cookie('Magento-Content-Currency')

  const res = prev(client, ...args)
  if (!currencyCode) return res
  return { ...res, currencyCode } satisfies PrivateContext
}

export const usePrivateQueryContext: FunctionPlugin<typeof usePrivateQueryContextType> = (
  prev,
  ...args
) => {
  const [currencyCode] = useCookie('Magento-Content-Currency')
  const res = prev(...args)
  if (!currencyCode) return res
  return { ...res, currencyCode }
}
