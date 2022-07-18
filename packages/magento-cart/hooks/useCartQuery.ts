import { useQuery, TypedDocumentNode, QueryHookOptions, ApolloError } from '@graphcommerce/graphql'
import { GraphQLError } from 'graphql'
import { useRouter } from 'next/router'
import { useCurrentCartId } from './useCurrentCartId'

const noCartError = new ApolloError({
  graphQLErrors: [new GraphQLError('No cart found', {})],
})

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
  options: QueryHookOptions<Q, Omit<V, 'cartId'>> & {
    allowUrl?: boolean
    hydration?: boolean
  } = {},
) {
  const { allowUrl = true, hydration, ...queryOptions } = options
  const router = useRouter()
  const { currentCartId, called } = useCurrentCartId({ hydration })

  const urlCartId = router.query.cart_id
  const usingUrl = allowUrl && typeof urlCartId === 'string'
  const cartId = usingUrl ? urlCartId : currentCartId

  if (usingUrl && typeof queryOptions.fetchPolicy === 'undefined')
    queryOptions.fetchPolicy = 'cache-only'

  if (usingUrl && typeof queryOptions.returnPartialData === 'undefined')
    queryOptions.returnPartialData = true

  queryOptions.variables = { cartId, ...options?.variables } as V
  queryOptions.skip = queryOptions?.skip || !cartId
  queryOptions.ssr = !!hydration

  const result = useQuery(document, queryOptions)

  return {
    ...useQuery(document, queryOptions),
    ...result,
    error: called && !currentCartId ? noCartError : result.error,
  }
}
