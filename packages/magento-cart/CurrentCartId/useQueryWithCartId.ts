import { useQuery, TypedDocumentNode, QueryHookOptions } from '@apollo/client'
import { CurrentCartIdDocument } from './CurrentCartId.gql'

/**
 * Requires the query to have a `$cartId: String!` argument. It will automatically inject the
 * currently active cart_id.
 *
 * Example:
 *
 * ```tsx
 * const { data } = useQueryWithCartId(CartFabQueryDocument)
 * ```
 */
export const useQueryWithCartId = <Q, V extends { cartId: string; [index: string]: unknown }>(
  document: TypedDocumentNode<Q, V>,
  options?: QueryHookOptions<Q, Omit<V, 'cartId'>>,
) => {
  const cartId = useQuery(CurrentCartIdDocument).data?.currentCartId?.id

  return useQuery(document, {
    ...options,
    variables: { cartId, ...options?.variables } as V,
    skip: !cartId,
    fetchPolicy: options?.fetchPolicy ?? 'cache-only',
  })
}
