import type { WaitForQueriesProps } from '@graphcommerce/ecommerce-ui'
import { mergeErrors, WaitForQueries } from '@graphcommerce/ecommerce-ui'
import type { FullPageMessageProps } from '@graphcommerce/next-ui'
import { FullPageMessage, iconPerson, IconSvg } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react'
import { Button, CircularProgress } from '@mui/material'
import React from 'react'
import type { SetOptional } from 'type-fest'
import { useCustomerSession } from '../../hooks/useCustomerSession'
import { ApolloCustomerErrorFullPage } from '../ApolloCustomerError/ApolloCustomerErrorFullPage'

export type WaitForCustomerProps = SetOptional<WaitForQueriesProps, 'waitFor'> &
  SetOptional<FullPageMessageProps, 'title' | 'icon'> & {
    unauthenticated?: React.ReactNode
    allowError?: boolean
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
  const {
    waitFor = [],
    children,
    fallback,
    unauthenticated,
    allowError: ignoreError,
    ...rest
  } = props

  const session = useCustomerSession()
  const queries = Array.isArray(waitFor) ? waitFor : [waitFor]
  const error = mergeErrors(
    queries.map((query) => (typeof query === 'boolean' ? null : query.error)).filter(nonNullable),
  )

  const hasError = error && !ignoreError
  return (
    <WaitForQueries
      waitFor={!session.loggedIn ? session.query : queries}
      fallback={
        fallback ?? (
          <FullPageMessage
            icon={<CircularProgress />}
            title={<Trans id='Loading your data' />}
            {...rest}
          >
            <Trans id='This may take a second' />
          </FullPageMessage>
        )
      }
    >
      {!session.loggedIn &&
        (unauthenticated ?? (
          <FullPageMessage
            icon={<IconSvg src={iconPerson} size='xxl' />}
            title={<Trans id='You must sign in to continue' />}
            button={
              <Button href='/account/signin' variant='pill' color='secondary' size='large'>
                {!session.valid ? (
                  <Trans id='Sign in' />
                ) : (
                  <Trans id='Sign in or create an account!' />
                )}
              </Button>
            }
            {...rest}
          />
        ))}
      {session.loggedIn && hasError && <ApolloCustomerErrorFullPage error={error} />}
      {session.loggedIn && !hasError && children}
    </WaitForQueries>
  )
}
