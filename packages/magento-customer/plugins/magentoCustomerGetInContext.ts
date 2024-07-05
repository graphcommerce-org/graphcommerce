import {
  type getInContextInput as getInContextInputType,
  type useInContextInput as useInContextInputType,
} from '@graphcommerce/graphql'
import type { FunctionPlugin, PluginConfig } from '@graphcommerce/next-config'
import { CustomerTokenDocument } from '../hooks/CustomerToken.gql'
import { useCustomerSession } from '../hooks/useCustomerSession'

export const config: PluginConfig = {
  type: 'function',
  module: '@graphcommerce/graphql',
}

export const getInContextInput: FunctionPlugin<typeof getInContextInputType> = (
  prev,
  client,
  ...args
) => ({
  ...prev(client, ...args),
  loggedIn: !!client.cache.readQuery({ query: CustomerTokenDocument })?.customerToken?.token,
})

export const useInContextInput: FunctionPlugin<typeof useInContextInputType> = (prev, ...args) => ({
  ...prev(...args),
  loggedIn: useCustomerSession().loggedIn,
})
