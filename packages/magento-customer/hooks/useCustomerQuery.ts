import { useQuery, TypedDocumentNode, QueryHookOptions } from '@graphcommerce/graphql'
import { useCustomerSession } from './useCustomerSession'

/** Will only execute when the customer is signed in. */
export function useCustomerQuery<Q, V>(
  document: TypedDocumentNode<Q, V>,
  queryOptions: QueryHookOptions<Q, V> = {},
) {
  const { loggedIn } = useCustomerSession()
  return useQuery(document, { ...queryOptions, ssr: false, skip: !loggedIn })
}
