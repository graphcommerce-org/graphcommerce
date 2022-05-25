import { useQuery, TypedDocumentNode, QueryHookOptions } from '@graphcommerce/graphql'
import { useCustomerSession } from './useCustomerSession'

/** Will only execute when the customer is not signed in. */
export function useGuestQuery<Q, V>(
  document: TypedDocumentNode<Q, V>,
  queryOptions: QueryHookOptions<Q, V> = {},
) {
  const { token } = useCustomerSession()
  return useQuery(document, { ...queryOptions, ssr: false, skip: !!token })
}
