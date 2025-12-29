import type { OperationVariables, TypedDocumentNode } from '@graphcommerce/graphql'
import { useQuery } from '@graphcommerce/graphql'
import type { useQuery as useQueryType } from '@apollo/client/react'
import { useCustomerSession } from './useCustomerSession'

/** Will only execute when the customer is signed in. */
export function useCustomerQuery<Q, V extends OperationVariables>(
  document: TypedDocumentNode<Q, V>,
  options?: Omit<useQueryType.Options<Q, V>, 'query'>,
) {
  const { loggedIn } = useCustomerSession()
  return useQuery(document, {
    ...options,
    ssr: false,
    returnPartialData: false,
    skip: options?.skip || !loggedIn,
  } as useQueryType.Options<Q, V>)
}
