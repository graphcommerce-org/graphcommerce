import { QueryResult, useQuery } from '@graphcommerce/graphql'
import {
  CustomerTokenDocument,
  CustomerTokenQuery,
  CustomerTokenQueryVariables,
} from './CustomerToken.gql'

export type UseCustomerSessionOptions = Record<string, unknown>

export type UseCustomerSessionReturn = {
  loggedIn: boolean
  requireAuth: boolean
  query: QueryResult<CustomerTokenQuery, CustomerTokenQueryVariables>
} & Partial<Omit<NonNullable<CustomerTokenQuery['customerToken']>, '__typename'>>

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function useCustomerSession(_: UseCustomerSessionOptions = {}) {
  const query = useQuery(CustomerTokenDocument, { pollInterval: 1000 })
  const token = query.data?.customerToken

  return {
    ...token,
    loggedIn: Boolean(token?.token && token.valid),
    requireAuth: Boolean(!token || !token.valid),
    query,
  }
}
