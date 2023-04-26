import { ApolloErrorAlert, ApolloErrorAlertProps } from '@graphcommerce/ecommerce-ui'
import { Button } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react'
import { Link } from '@mui/material'
import { useCustomerSession } from '../../hooks/useCustomerSession'
import { useAuthorizationErrorMasked } from './useAuthorizationErrorMasked'

export type ApolloCustomerErrorAlertProps = ApolloErrorAlertProps

export function ApolloCustomerErrorAlert(props: ApolloCustomerErrorAlertProps) {
  const { error, graphqlErrorAlertProps } = props
  const [newError, unauthorized] = useAuthorizationErrorMasked(error)
  const { query } = useCustomerSession()

  return (
    <ApolloErrorAlert
      {...props}
      error={newError}
      graphqlErrorAlertProps={{
        action: unauthorized ? (
          <>
            {graphqlErrorAlertProps?.action}
            <Button href='/account/signin' color='error' size='small'>
              {query.data?.customerToken ? <Trans id='Sign in' /> : <Trans id='Create Account' />}
            </Button>
          </>
        ) : (
          graphqlErrorAlertProps?.action
        ),
      }}
    />
  )
}
