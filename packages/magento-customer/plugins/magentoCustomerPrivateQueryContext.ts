import {
  useApolloClient,
  type getPrivateQueryContextMesh as getPrivateQueryContextMeshType,
  type getPrivateQueryContext as getPrivateQueryContextType,
  type usePrivateQueryContext as usePrivateQueryContextType,
} from '@graphcommerce/graphql'
import type { PrivateContext } from '@graphcommerce/graphql-mesh'
import type { FunctionPlugin, PluginConfig } from '@graphcommerce/next-config'
import { useCallback, useSyncExternalStore } from 'react'
import { CustomerTokenDocument } from '../hooks/CustomerToken.gql'

/**
 * Subscribe to the derived `loggedIn` boolean only. Reading the full CustomerToken query result
 * would re-render the calling page whenever the query object changes (e.g. loading → cached result
 * right after hydration), even when `loggedIn` itself doesn't change.
 */
function useIsLoggedIn() {
  const { cache } = useApolloClient()
  const subscribe = useCallback(
    (onChange: () => void) =>
      cache.watch({ query: CustomerTokenDocument, optimistic: true, callback: () => onChange() }),
    [cache],
  )
  return useSyncExternalStore(
    subscribe,
    () => !!cache.readQuery({ query: CustomerTokenDocument })?.customerToken?.token,
    () => false,
  )
}

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

export const usePrivateQueryContext: FunctionPlugin<typeof usePrivateQueryContextType> = (
  prev,
  ...args
) => {
  const loggedIn = useIsLoggedIn()
  const res = prev(...args)
  if (!loggedIn) return res
  return { ...res, loggedIn: true }
}
