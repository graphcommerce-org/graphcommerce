export { cloneDeep, mergeDeep, getOperationName } from '@apollo/client/utilities/internal'

// Core Apollo Client exports
export * from '@apollo/client'

// React hooks - exported explicitly
export {
  ApolloProvider,
  useApolloClient,
  useQuery,
  useLazyQuery,
  useMutation,
  useSubscription,
  useFragment,
  useSuspenseQuery,
  useBackgroundQuery,
  useReadQuery,
  useLoadableQuery,
  useSuspenseFragment,
  useQueryRefHandlers,
  useReactiveVar,
  skipToken,
  getApolloContext,
  createQueryPreloader,
} from '@apollo/client/react'

export * from '@apollo/client/link/schema'
export * from '@apollo/client/link/context'
export * from '@apollo/client/link/error'
export * from '@apollo/client/utilities'

declare module '@apollo/client' {
  interface DataMasking {
    enabled: true
  }
}
