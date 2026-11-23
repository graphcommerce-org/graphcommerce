import { useQuery } from '@graphcommerce/graphql'
import type { CustomerTokenQuery, CustomerTokenQueryVariables } from './CustomerToken.gql'
import { CustomerTokenDocument } from './CustomerToken.gql'

export type UseCustomerSessionOptions = Record<string, unknown>

export type UseCustomerSessionReturn = {
  loggedIn: boolean
  query: useQuery.Result<CustomerTokenQuery, CustomerTokenQueryVariables>
} & Partial<Omit<NonNullable<CustomerTokenQuery['customerToken']>, '__typename'>>

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function useCustomerSession(_: UseCustomerSessionOptions = {}) {
  const query = useQuery(CustomerTokenDocument)
  const tokenData = query.data?.customerToken

  return {
    ...tokenData,
    // `customerLink` does not send a token with `valid: false`.
    loggedIn: Boolean(tokenData?.token) && tokenData?.valid !== false,
    query,
  }
}
