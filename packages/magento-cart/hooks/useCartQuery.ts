import { useQuery, TypedDocumentNode, QueryHookOptions, QueryResult } from '@graphcommerce/graphql'
import { useRouter } from 'next/router'
import { useCurrentCartId } from './useCurrentCartId'
import { DeepPartial } from '@graphcommerce/react-hook-form'

/**
 * Requires the query to have a `$cartId: String!` argument. It will automatically inject the
 * currently active cart_id.
 *
 * Example:
 *
 * ```tsx
 * const { data } = useCartQuery(CartFabQueryDocument)
 * ```
 */
export function useCartQuery<Q, V extends { cartId: string; [index: string]: unknown }>(
  query: TypedDocumentNode<Q, V>,
  options: QueryHookOptions<Q, Omit<V, 'cartId'>> & {
    returnPartialData: true
  },
): QueryResult<DeepPartial<Q>, Omit<V, 'cartId'>>
export function useCartQuery<Q, V extends { cartId: string; [index: string]: unknown }>(
  query: TypedDocumentNode<Q, V>,
  options?: QueryHookOptions<Q, Omit<V, 'cartId'>>,
): QueryResult<Q, Omit<V, 'cartId'>>
export function useCartQuery<Q, V extends { cartId: string; [index: string]: unknown }>(
  document: TypedDocumentNode<Q, V>,
  options: QueryHookOptions<Q, Omit<V, 'cartId'>> = {},
) {
  const router = useRouter()
  const { currentCartId } = useCurrentCartId()

  const urlCartId = router.query.cart_id
  const usingUrl = typeof urlCartId === 'string'
  const cartId = usingUrl ? urlCartId : currentCartId

  if (usingUrl) options.fetchPolicy = 'cache-only'

  options.variables = { cartId, ...options?.variables } as V
  options.skip = options?.skip || !router.isReady || !cartId

  return useQuery(document, { ...options })
}
