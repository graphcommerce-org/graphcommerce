export { cloneDeep, mergeDeep } from '@apollo/client/utilities'

export { setContext } from '@apollo/client/link/context'
export { onError } from '@apollo/client/link/error'
export {
  ApolloClient,
  useApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  useLazyQuery,
  useMutation,
  fromPromise,
  ApolloError,
  gql,
} from '@apollo/client'

export { getOperationName } from '@apollo/client/utilities'
