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
  options: QueryHookOptions<Q, V> = {},
): QueryResult<Q, V> {
  const { loggedIn } = useCustomerSession()
  return useQuery(document, { ...options, ssr: false, skip: options.skip || !loggedIn })
}
