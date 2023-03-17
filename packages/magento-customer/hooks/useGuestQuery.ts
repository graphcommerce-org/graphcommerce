import {
  useQuery,
  TypedDocumentNode,
  QueryHookOptions,
  OperationVariables,
} from '@graphcommerce/graphql'
import { useCustomerSession } from './useCustomerSession'

/** Will only execute when the customer is not signed in. */
export function useGuestQuery<Q, V extends OperationVariables>(
  document: TypedDocumentNode<Q, V>,
  queryOptions: QueryHookOptions<Q, V> & { hydration?: boolean } = {},
) {
  const { token } = useCustomerSession({ hydration: queryOptions.hydration })
  return useQuery(document, { ...queryOptions, ssr: false, skip: !!token })
}
