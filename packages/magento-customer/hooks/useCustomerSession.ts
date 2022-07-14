import { useIsomorphicLayoutEffect } from '@graphcommerce/framer-utils'
import { useQuery } from '@graphcommerce/graphql'
import { useState } from 'react'
import { CustomerTokenDocument, CustomerTokenQuery } from './CustomerToken.gql'

export type UseCustomerSessionOptions = { hydration?: boolean }

export type UseCustomerSessionReturn =
  | Partial<
      Omit<NonNullable<CustomerTokenQuery['customerToken']>, '__typename'> & {
        called: boolean
      }
    > & { loggedIn: boolean; requireAuth: boolean }

export function useCustomerSession(
  options: UseCustomerSessionOptions = {},
): UseCustomerSessionReturn {
  const { hydration = false } = options
  const [waitUntilAfterHydration, setWaitUntilAfterHydration] = useState(!hydration)
  useIsomorphicLayoutEffect(() => {
    if (waitUntilAfterHydration) setWaitUntilAfterHydration(false)
  }, [waitUntilAfterHydration])
  const skip = waitUntilAfterHydration

  const { called, data } = useQuery(CustomerTokenDocument, { skip })

  const token = data?.customerToken

  if (!token) return { called, loggedIn: false, requireAuth: true }

  return {
    ...token,
    called,
    loggedIn: Boolean(token?.token && token.valid),
    requireAuth: Boolean(!token || !token.valid),
  }
}
