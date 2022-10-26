import { ApolloErrorSnackbar, ApolloErrorSnackbarProps } from '@graphcommerce/ecommerce-ui'
import { Button } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react'
import NextLink from 'next/link'
import { useCustomerSession } from '../../hooks/useCustomerSession'
import { useAuthorizationErrorMasked } from './useAuthorizationErrorMasked'

export type ApolloCustomerErrorSnackbarProps = ApolloErrorSnackbarProps

export function ApolloCustomerErrorSnackbar(props: ApolloCustomerErrorSnackbarProps) {
  const { error, action } = props
  const [newError, unauthorized] = useAuthorizationErrorMasked(error)
  const { token } = useCustomerSession()

  return (
    <ApolloErrorSnackbar
      {...props}
      error={newError}
      action={
        unauthorized ? (
          <Button href='/account/signin' variant='pill' color='secondary'>
            {token ? <Trans id='Sign in' /> : <Trans id='Create Account' />}
          </Button>
        ) : (
          action
        )
      }
    />
  )
}
