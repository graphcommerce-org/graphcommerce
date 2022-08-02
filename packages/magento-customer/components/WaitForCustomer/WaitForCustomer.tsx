import { mergeErrors, WaitForQueries, WaitForQueriesProps } from '@graphcommerce/ecommerce-ui'
import { FullPageMessage, IconSvg, iconPerson } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react'
import { Button, CircularProgress } from '@mui/material'
import PageLink from 'next/link'
import { useCustomerSession } from '../../hooks/useCustomerSession'
import { ApolloCustomerErrorFullPage } from '../ApolloCustomerError/ApolloCustomerErrorFullPage'

type WaitForCustomerProps = Omit<WaitForQueriesProps, 'fallback' | 'waitFor'> & {
  waitFor?: WaitForQueriesProps['waitFor']
}

export function nonNullable<T>(value: T): value is NonNullable<T> {
  return value !== null && value !== undefined
}

export function WaitForCustomer(props: WaitForCustomerProps) {
  const { waitFor = [], children } = props

  const session = useCustomerSession()
  const queries = Array.isArray(waitFor) ? waitFor : [waitFor]
  const error = mergeErrors(queries.map((query) => query.error).filter(nonNullable))

  return (
    <WaitForQueries
      waitFor={!session.loggedIn ? session.query : queries}
      fallback={
        <FullPageMessage icon={<CircularProgress />} title={<Trans id='Loading your data' />}>
          <Trans id='This may take a second' />
        </FullPageMessage>
      }
    >
      {!session.loggedIn && (
        <FullPageMessage
          icon={<IconSvg src={iconPerson} size='xxl' />}
          title={<Trans id='You must sign in to continue' />}
          button={
            <PageLink href='/account/signin' passHref>
              <Button variant='contained' color='secondary' size='large'>
                {!session.valid ? (
                  <Trans id='Sign in' />
                ) : (
                  <Trans id='Sign in or create an account!' />
                )}
              </Button>
            </PageLink>
          }
        />
      )}
      {session.loggedIn && error && <ApolloCustomerErrorFullPage error={error} />}
      {session.loggedIn && !error && children}
    </WaitForQueries>
  )
}
