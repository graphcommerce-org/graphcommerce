import { useQuery } from '@graphcommerce/graphql'
import { CustomerTokenDocument, CustomerTokenQuery } from './CustomerToken.gql'

type TokenResponse = Omit<NonNullable<CustomerTokenQuery['customerToken']>, '__typename'>

export type UseCustomerSessionReturn =
  | TokenResponse & {
      loggedIn: boolean
      requireAuth: boolean
    }

export function useCustomerSession(): UseCustomerSessionReturn {
  const token = useQuery(CustomerTokenDocument, { ssr: false, fetchPolicy: 'cache-only' }).data
    ?.customerToken

  if (!token) return { loggedIn: false, requireAuth: true }

  return {
    ...token,
    loggedIn: Boolean(token?.token && token.valid),
    requireAuth: Boolean(!token || !token.valid),
  }
}
