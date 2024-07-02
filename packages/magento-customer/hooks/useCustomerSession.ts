import { QueryResult, useQuery } from '@graphcommerce/graphql'
import { removeCssFlag, setCssFlag } from '@graphcommerce/next-ui'
import { useEffect } from 'react'
import {
  CustomerTokenDocument,
  CustomerTokenQuery,
  CustomerTokenQueryVariables,
} from './CustomerToken.gql'

export type UseCustomerSessionOptions = Record<string, unknown>

export type UseCustomerSessionReturn = {
  loggedIn: boolean
  query: QueryResult<CustomerTokenQuery, CustomerTokenQueryVariables>
} & Partial<Omit<NonNullable<CustomerTokenQuery['customerToken']>, '__typename'>>

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function useCustomerSession(_: UseCustomerSessionOptions = {}) {
  const query = useQuery(CustomerTokenDocument)
  const tokenData = query.data?.customerToken

  useEffect(() => {
    if (!query.loading) {
      if (tokenData?.token) setCssFlag('signed-in', true)
      else removeCssFlag('signed-in')
    }
  }, [query.loading, tokenData?.token])

  return {
    ...tokenData,
    loggedIn: Boolean(tokenData?.token),
    query,
  }
}
