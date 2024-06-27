import { QueryHookOptions, QueryResult, TypedDocumentNode, useQuery } from '@graphcommerce/graphql'
import { SessionScopeInput } from '@graphcommerce/graphql-mesh'
import { useCustomerSession } from './useCustomerSession'

/**
 * Creates a scope based on customer's session.
 *
 * Todo: Generalize this feature to be used for other scopes.
 *
 * Other plugins should be able to define their own scopes and create a plugin on this method to augment the specific scope.
 *
 * - User configured currency
 * - Adobe Commerce preview functionality
 * - Hygraph preview functionality
 */
export function useSessionScope(): SessionScopeInput {
  const session = useCustomerSession()
  const { loggedIn } = session
  return { loggedIn }
}

/**
 * Creates a query that allows fetching data for logged in customers, but have
 * a fallback for guest users.
 *
 * - Shows a global pageload indicator when loading customer specific information.
 *
 * When not to use this?
 * - When a query is always scoped. This method specifically targets queries that can resolve unscoped (guest) and both scoped (customer) data.
 *
 * Usage:
 * - Define a `@sessionScope(sessionScope: $sessionScope)` directive in your query
 * - Use the useSessionScopeQuery
 */
export function useSessionScopeQuery<
  Q,
  V extends { sessionScope?: SessionScopeInput; [index: string]: unknown },
>(
  document: TypedDocumentNode<Q, V>,
  options: QueryHookOptions<Q, V>,
  unscopedResult: Q,
): Omit<QueryResult<Q, V>, 'data'> & { data: Q; mask: boolean } {
  const { skip = true } = options
  const session = useCustomerSession()

  const sessionScope = useSessionScope()

  const clientQuery = useQuery<Q, V>(document, {
    ...options,
    variables: { ...options.variables, sessionScope } as V,
    skip: skip && !sessionScope.loggedIn,
  })

  let { data } = clientQuery
  if (!skip) data ??= clientQuery.previousData
  // else if (!sessionScope.loggedIn) data ??= unscopedResult

  // If the user is logged in we might need to show a skeleton:
  let mask = session.query.loading
  if (!session.query.loading && session.loggedIn) {
    mask = !skip ? !clientQuery.data && !clientQuery.previousData : !clientQuery.data
  }

  return { ...clientQuery, data: data ?? unscopedResult, mask }
}
