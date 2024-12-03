import type {
  OperationVariables,
  QueryHookOptions,
  TypedDocumentNode,
} from '@graphcommerce/graphql'
import { useQuery } from '@graphcommerce/graphql'
import { useCustomerSession } from './useCustomerSession'

/** Will only execute when the customer is not signed in. */
export function useGuestQuery<Q, V extends OperationVariables>(
  document: TypedDocumentNode<Q, V>,
  queryOptions: QueryHookOptions<Q, V> = {},
) {
  const { token } = useCustomerSession()
  return useQuery(document, { ...queryOptions, ssr: false, skip: queryOptions.skip || !!token })
}
