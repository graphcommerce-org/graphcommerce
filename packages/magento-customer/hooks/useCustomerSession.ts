import { useIsomorphicLayoutEffect } from '@graphcommerce/framer-utils'
import { QueryResult, useQuery } from '@graphcommerce/graphql'
import { startTransition, useState } from 'react'
import {
  CustomerTokenDocument,
  CustomerTokenQuery,
  CustomerTokenQueryVariables,
} from './CustomerToken.gql'

export type UseCustomerSessionOptions = { hydration?: boolean }

export type UseCustomerSessionReturn =
  | {
      loggedIn: boolean
      requireAuth: boolean
      query: QueryResult<CustomerTokenQuery, CustomerTokenQueryVariables>
    } & Partial<Omit<NonNullable<CustomerTokenQuery['customerToken']>, '__typename'>>

export function useCustomerSession(options: UseCustomerSessionOptions = {}) {
  /**
   * We current always assume the initial render is during hydration.
   *
   * How can we determine we're not actually hydrating? Classically you could just use some global
   * state to track this because when the initial render is done, we're not hydrating anymore.
   *
   * However, <Suspense/> can be used to defer the rendering to a later moment. This means that the
   * useCustomerSession hook is called later and we're still in the hydration phase for this
   * component while other components are rendering for the second time.
   */
  const { hydration = false } = options
  const [hydrating, setHydrating] = useState(false)

  /**
   * After the initital render we are definitely sure we're not hydrating anymore so we can flip the
   * switch and rerender.
   */
  useIsomorphicLayoutEffect(() => {
    if (!hydrating) return
    startTransition(() => setHydrating(false))
  }, [hydrating])

  const skip = hydrating

  const query = useQuery(CustomerTokenDocument, { skip })

  const token = query.data?.customerToken

  return {
    ...token,
    loggedIn: Boolean(token?.token && token.valid),
    requireAuth: Boolean(!token || !token.valid),
    query,
  }
}
