import {
  type getPrivateQueryContextMesh as getPrivateQueryContextMeshType,
  type getPrivateQueryContext as getPrivateQueryContextType,
} from '@graphcommerce/graphql'
import type { PrivateContext } from '@graphcommerce/graphql-mesh'
import type { FunctionPlugin, PluginConfig } from '@graphcommerce/next-config'
import { CustomerTokenDocument } from '../hooks/CustomerToken.gql'

export const config: PluginConfig = {
  type: 'function',
  module: '@graphcommerce/graphql',
}

export const getPrivateQueryContextMesh: FunctionPlugin<typeof getPrivateQueryContextMeshType> = (
  prev,
  context,
) => {
  const loggedIn = !!context.headers?.authorization
  const res = prev(context)
  if (!loggedIn) return res
  return { ...res, loggedIn: true } satisfies PrivateContext
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
