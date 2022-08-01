import { useIsomorphicLayoutEffect } from '@graphcommerce/framer-utils'
import { useQuery } from '@graphcommerce/graphql'
import { startTransition, useState } from 'react'
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
  const [hydrating, setHydrating] = useState(!hydration)
  useIsomorphicLayoutEffect(() => startTransition(() => setHydrating(false)), [])
  const skip = hydrating

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
