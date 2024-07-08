import type { InputMaybe, InContextInput } from '@graphcommerce/graphql-mesh'
import { useCustomerSession } from '@graphcommerce/magento-customer/hooks'
import { QueryHookOptions, QueryResult, TypedDocumentNode, useQuery } from '../apollo'
import { useInContextInput } from './useInContextInput'

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
 * - Define a `@inContext(context: $inContext)` directive in your query
 * - Use the useInContextInputQuery
 */
export function useInContextQuery<
  Q,
  V extends { inContext?: InputMaybe<InContextInput>; [index: string]: unknown },
>(
  document: TypedDocumentNode<Q, V>,
  options: QueryHookOptions<Q, V>,
  unscopedResult: Q,
): Omit<QueryResult<Q, V>, 'data'> & { data: Q; mask: boolean } {
  const { skip = true } = options
  const session = useCustomerSession()
  const inContext = useInContextInput()

  const clientQuery = useQuery<Q, V>(document, {
    ...options,
    variables: { ...options.variables, inContext } as V,
    skip: skip && !inContext,
  })

  let { data } = clientQuery
  if (!skip) data ??= clientQuery.previousData

  // If the user is logged in we might need to show a skeleton:
  let mask = session.query.loading
  if (!session.query.loading && session.loggedIn) {
    mask = !skip ? !clientQuery.data && !clientQuery.previousData : !clientQuery.data
  }

  return { ...clientQuery, data: data ?? unscopedResult, mask }
}
