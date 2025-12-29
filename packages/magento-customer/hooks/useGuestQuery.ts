import type { OperationVariables, TypedDocumentNode } from '@graphcommerce/graphql'
import { useQuery } from '@graphcommerce/graphql'
import type { useQuery as useQueryType } from '@apollo/client/react'
import { useCustomerSession } from './useCustomerSession'

/** Will only execute when the customer is not signed in. */
export function useGuestQuery<Q, V extends OperationVariables>(
  document: TypedDocumentNode<Q, V>,
  queryOptions?: Omit<useQueryType.Options<Q, V>, 'query'>,
) {
  const { token } = useCustomerSession()
  return useQuery(document, {
    ...queryOptions,
    ssr: false,
    skip: queryOptions?.skip || !!token,
  } as useQueryType.Options<Q, V>)
}
