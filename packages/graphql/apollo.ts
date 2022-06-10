import { ApolloCache, NormalizedCacheObject } from '@apollo/client'

export { cloneDeep, mergeDeep } from '@apollo/client/utilities'

export * from '@apollo/client'
export * from '@apollo/client/link/schema'
export * from '@apollo/client/link/context'
export * from '@apollo/client/link/error'

export { getOperationName } from '@apollo/client/utilities'

export type ClientContext = {
  cache: ApolloCache<NormalizedCacheObject>
  headers?: Record<string, string>
}
