import type { QueryResult } from '@graphcommerce/graphql'
import { useQuery } from '@graphcommerce/graphql'
import type { CustomerTokenQuery, CustomerTokenQueryVariables } from './CustomerToken.gql'
import { CustomerTokenDocument } from './CustomerToken.gql'

export type UseCustomerSessionOptions = Record<string, unknown>

export type UseCustomerSessionReturn = {
  loggedIn: boolean
  query: QueryResult<CustomerTokenQuery, CustomerTokenQueryVariables>
} & Partial<Omit<NonNullable<CustomerTokenQuery['customerToken']>, '__typename'>>

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function useCustomerSession(_: UseCustomerSessionOptions = {}) {
  const query = useQuery(CustomerTokenDocument)
  const tokenData = query.data?.customerToken

  return {
    ...tokenData,
    loggedIn: Boolean(tokenData?.token),
    query,
  }
}
