import type { InputMaybe, PrivateContext } from '@graphcommerce/graphql-mesh'
// eslint-disable-next-line import/no-extraneous-dependencies
import { useIsSSR } from '@graphcommerce/next-ui/hooks/useIsSsr'
// eslint-disable-next-line import/no-extraneous-dependencies
import { getCssFlag, removeCssFlag, setCssFlag } from '@graphcommerce/next-ui/utils/cssFlags'
import { useContext, useEffect } from 'react'
import type { MaybeMasked, QueryHookOptions, QueryResult, TypedDocumentNode } from '../apollo'
import { useQuery } from '../apollo'
import { PrivateQueryMaskContext } from '../components/PrivateQueryMask/PrivateQueryMask'
import { usePrivateQueryContext } from './usePrivateQueryContext'

/**
 * Creates a query that allows fetching data for logged in customers (or other private contexts),
 * but have a fallback for guest users.
 *
 * - Shows a global pageload indicator when loading customer specific information.
 *
 * When not to use this?
 *
 * - When a query is always scoped. This method specifically targets queries that can resolve unscoped
 *   (guest) and both scoped (customer) data.
 *
 * Usage:
 *
 * - Define a `@privateContext(context: $context)` directive in your query
 * - Use the usePrivateQuery
 */
export function usePrivateQuery<
  Q,
  V extends { context?: InputMaybe<PrivateContext>; [index: string]: unknown },
>(
  document: TypedDocumentNode<Q, V>,
  options: QueryHookOptions<Q, V>,
  unscopedResult: Q,
): Omit<QueryResult<Q, V>, 'data'> & { data: Q | NonNullable<MaybeMasked<Q>>; mask: boolean } {
  const { skip = true } = options
  const context = usePrivateQueryContext()
  const isSsr = useIsSSR()

  const privateContext = useContext(PrivateQueryMaskContext)

  useEffect(() => {
    if (isSsr) return
    if (context && !getCssFlag('private-query')) setCssFlag('private-query', true)
    else if (!context && getCssFlag('private-query')) removeCssFlag('private-query')
  }, [context, isSsr])

  const clientQuery = useQuery<Q, V>(document, {
    ...options,
    variables: { ...options.variables, context } as V,
    skip: !!privateContext || (skip && !context),
  })

  let { data } = clientQuery
  if (!skip) data ??= clientQuery.previousData

  // If the user is logged in we might need to show a skeleton:
  let mask = isSsr
  if (!isSsr && context) {
    mask = !skip ? !clientQuery.data && !clientQuery.previousData : !clientQuery.data
  }

  // If this method is called within an PrivateQueryMask, we skip this complete functionality so we show the parent mask.
  if (privateContext) {
    mask = privateContext.mask
  }

  return { ...clientQuery, data: data ?? unscopedResult, mask }
}
