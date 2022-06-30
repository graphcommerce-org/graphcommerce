import { useQuery } from '@graphcommerce/graphql'
import { useEffect, useState } from 'react'
import { CustomerTokenDocument, CustomerTokenQuery } from './CustomerToken.gql'

type TokenResponse = Omit<NonNullable<CustomerTokenQuery['customerToken']>, '__typename'> & {
  called: boolean
}

export type UseCustomerSessionReturn =
  | Partial<TokenResponse> & { loggedIn: boolean; requireAuth: boolean }

export function useCustomerSession(): UseCustomerSessionReturn {
  const [skip, setSkip] = useState(true)

  const { called, data } = useQuery(CustomerTokenDocument, {
    ssr: false,
    fetchPolicy: 'cache-only',
    skip,
  })

  const token = data?.customerToken

  useEffect(() => {
    if (skip) setSkip(false)
  }, [skip])

  if (!token) return { called, loggedIn: false, requireAuth: true }

  return {
    ...token,
    called,
    loggedIn: Boolean(token?.token && token.valid),
    requireAuth: Boolean(!token || !token.valid),
  }
}
