import {
  useQuery,
  TypedDocumentNode,
  QueryHookOptions,
  QueryResult,
  ApolloError,
} from '@graphcommerce/graphql'
import { GraphQLError } from 'graphql'
import { useCustomerSession } from './useCustomerSession'

const notLoggedInError = new ApolloError({
  graphQLErrors: [
    new GraphQLError('Not authorized', {
      extensions: { category: 'graphql-authorization' },
    }),
  ],
})

/** Will only execute when the customer is signed in. */
export function useCustomerQuery<Q, V>(
  document: TypedDocumentNode<Q, V>,
  options: QueryHookOptions<Q, V> & { hydration?: boolean } = {},
): QueryResult<Q, V> {
  const { hydration, ...queryOptions } = options
  const { loggedIn, called } = useCustomerSession({ hydration })

  const result = useQuery(document, {
    ...queryOptions,
    ssr: false,
    skip: !loggedIn,
  })

  return {
    ...result,
    error: called && !loggedIn ? notLoggedInError : result.error,
  }
}
