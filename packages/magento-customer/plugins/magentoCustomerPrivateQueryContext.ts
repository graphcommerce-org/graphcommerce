import {
  type getPrivateQueryContext as getPrivateQueryContextType,
  type usePrivateQueryContext as usePrivateQueryContextType,
} from '@graphcommerce/graphql'
import type { FunctionPlugin, PluginConfig } from '@graphcommerce/next-config'
import { CustomerTokenDocument } from '../hooks/CustomerToken.gql'
import { useCustomerSession } from '../hooks/useCustomerSession'

export const config: PluginConfig = {
  type: 'function',
  module: '@graphcommerce/graphql',
}

export const getPrivateQueryContext: FunctionPlugin<typeof getPrivateQueryContextType> = (
  prev,
  client,
  ...args
) => {
  const loggedIn = !!client.cache.readQuery({ query: CustomerTokenDocument })?.customerToken?.token
  const res = prev(client, ...args)
  if (!loggedIn) return res

  return { ...res, loggedIn: true }
}

export const usePrivateQueryContext: FunctionPlugin<typeof usePrivateQueryContextType> = (
  prev,
  ...args
) => {
  const { loggedIn } = useCustomerSession()
  const res = prev(...args)
  if (!loggedIn) return res

  return {
    ...res,
    loggedIn: true,
  }
}
