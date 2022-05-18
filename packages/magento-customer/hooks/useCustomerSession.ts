import { useQuery } from '@graphcommerce/graphql'
import { CustomerTokenDocument } from './CustomerToken.gql'
import { CustomerTokenFragment } from './CustomerTokenFragment.gql'

export type UseCustomerTokenReturn =
  | (CustomerTokenFragment & {
      loggedIn: boolean
      requireAuth: boolean
    })
  | (Partial<CustomerTokenFragment> & { loggedIn: false; requireAuth: true })

export function useCustomerSession(): UseCustomerTokenReturn {
  const token = useQuery(CustomerTokenDocument, { ssr: false, fetchPolicy: 'cache-only' }).data
    ?.customerToken

  if (!token) return { loggedIn: false, requireAuth: true }

  return {
    ...token,
    loggedIn: Boolean(token?.token && token.valid),
    requireAuth: Boolean(!token || !token.valid),
  }
}
