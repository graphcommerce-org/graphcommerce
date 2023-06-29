import { useQuery, TypedDocumentNode, QueryHookOptions } from '@graphcommerce/graphql'
import { useRouter } from 'next/router'
import { useCurrentCartId } from './useCurrentCartId'

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

  const result = useQuery(document, { ...options })

  return {
    ...result,
    // error: called && !currentCartId ? noCartError : result.error,
  }
}
