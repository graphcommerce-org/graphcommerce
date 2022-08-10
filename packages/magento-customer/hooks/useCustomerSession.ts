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

export function useCustomerSession(
  options: UseCustomerSessionOptions = {},
): UseCustomerSessionReturn {
  const { hydration = false } = options
  const [hydrating, setHydrating] = useState(!hydration)

  useIsomorphicLayoutEffect(() => startTransition(() => setHydrating(false)), [])

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
