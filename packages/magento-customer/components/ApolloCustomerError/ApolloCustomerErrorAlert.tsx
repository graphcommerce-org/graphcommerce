import { ApolloErrorAlert, ApolloErrorAlertProps } from '@graphcommerce/ecommerce-ui'
import { Trans } from '@lingui/react'
import { Link } from '@mui/material'
import NextLink from 'next/link'
import { useCustomerSession } from '../../hooks/useCustomerSession'
import { useAuthorizationErrorMasked } from './useAuthorizationErrorMasked'

export type ApolloCustomerErrorAlertProps = ApolloErrorAlertProps

export function ApolloCustomerErrorAlert(props: ApolloCustomerErrorAlertProps) {
  const { error, graphqlErrorAlertProps } = props
  const [newError, unauthorized] = useAuthorizationErrorMasked(error)
  const { token } = useCustomerSession()

  return (
    <ApolloErrorAlert
      {...props}
      error={newError}
      graphqlErrorAlertProps={{
        action: unauthorized ? (
          <NextLink href='/account/signin' passHref>
            <Link underline='hover'>
              {token ? <Trans id='Sign in' /> : <Trans id='Create Account' />}
            </Link>
          </NextLink>
        ) : (
          graphqlErrorAlertProps?.action
        ),
      }}
    />
  )
}
