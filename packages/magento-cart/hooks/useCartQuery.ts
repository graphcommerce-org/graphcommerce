import { useQuery, TypedDocumentNode, QueryHookOptions } from '@apollo/client'
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
  options: QueryHookOptions<Q, Omit<V, 'cartId'>> & { allowUrl?: boolean } = {},
) {
  const { allowUrl = false, ...queryOptions } = options

  const router = useRouter()
  const currentCartId = useCurrentCartId()
  const urlCartId = router.query.cartId
  const usingUrl = allowUrl && typeof urlCartId === 'string'

  const cartId = usingUrl ? urlCartId : currentCartId

  if (usingUrl && typeof queryOptions.fetchPolicy === 'undefined')
    queryOptions.fetchPolicy = 'cache-only'

  if (usingUrl && typeof queryOptions.returnPartialData === 'undefined')
    queryOptions.returnPartialData = true

  queryOptions.variables = { cartId, ...options?.variables } as V
  queryOptions.skip = queryOptions?.skip || !cartId
  queryOptions.ssr = false

  return useQuery(document, queryOptions)
}
