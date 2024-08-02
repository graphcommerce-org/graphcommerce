import { mergeErrors, WaitForQueries, WaitForQueriesProps } from '@graphcommerce/ecommerce-ui'
import { FullPageMessage } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react'
import { CircularProgress } from '@mui/material'
import React from 'react'
import { useCustomerSession } from '../../hooks/useCustomerSession'
import { ApolloCustomerErrorFullPage } from '../ApolloCustomerError/ApolloCustomerErrorFullPage'
import { UnauthenticatedFullPageMessage } from './UnauthenticatedFullPageMessage'

type WaitForCustomerProps = Omit<WaitForQueriesProps, 'fallback' | 'waitFor'> & {
  waitFor?: WaitForQueriesProps['waitFor']
  fallback?: React.ReactNode
  unauthenticated?: React.ReactNode
}

export function nonNullable<T>(value: T): value is NonNullable<T> {
  return value !== null && value !== undefined
}

/**
 * A full page wrapper to render customer specific information.
 *
 * - Shows a loading spinner during: SSR, Hydration and Query Loading.
 * - Will show a login message if the customer isn't logged in.
 * - Will show an error message for any query that has that are passed.
 * - Will show the contents if none of the above matches.
 *
 * ```tsx
 * import { useQuery } from '@graphcommerce/graphql'
 * import { WaitForCustomer } from '@graphcommerce/magento-customer'
 *
 * function MyComponent() {
 *   const optionalAdditionalQuery = useQuery(MyQueryDocument)
 *   return (
 *     <WaitForCustomer waitFor={optionalAdditionalQuery}>
 *       Customer logged in and {optionalAdditionalQuery.data.myField} data available
 *     </WaitForCustomer>
 *   )
 * }
 * ```
 */
export function WaitForCustomer(props: WaitForCustomerProps) {
  const { waitFor = [], children, fallback, unauthenticated } = props

  const session = useCustomerSession()
  const queries = Array.isArray(waitFor) ? waitFor : [waitFor]
  const error = mergeErrors(
    queries.map((query) => (typeof query === 'boolean' ? null : query.error)).filter(nonNullable),
  )

  return (
    <WaitForQueries
      waitFor={!session.loggedIn ? session.query : queries}
      fallback={
        fallback ?? (
          <FullPageMessage icon={<CircularProgress />} title={<Trans id='Loading your data' />}>
            <Trans id='This may take a second' />
          </FullPageMessage>
        )
      }
    >
      {!session.loggedIn && (unauthenticated ?? <UnauthenticatedFullPageMessage />)}
      {session.loggedIn && error && <ApolloCustomerErrorFullPage error={error} />}
      {session.loggedIn && !error && children}
    </WaitForQueries>
  )
}
