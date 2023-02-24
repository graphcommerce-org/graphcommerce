import {
  useQuery,
  TypedDocumentNode,
  QueryHookOptions,
  QueryResult,
  OperationVariables,
} from '@graphcommerce/graphql'
import { useCustomerSession } from './useCustomerSession'

/** Will only execute when the customer is signed in. */
export function useCustomerQuery<Q, V extends OperationVariables>(
  document: TypedDocumentNode<Q, V>,
  options: QueryHookOptions<Q, V> & { hydration?: boolean } = {},
): QueryResult<Q, V> {
  const { hydration, ...queryOptions } = options
  const { loggedIn } = useCustomerSession({ hydration })

  const result = useQuery(document, {
    ...queryOptions,
    ssr: false,
    skip: !loggedIn,
  })

  return result
}
