import { ApolloErrorSnackbar, ApolloErrorSnackbarProps } from '@graphcommerce/ecommerce-ui'
import { Trans } from '@lingui/react'
import { Link } from '@mui/material'
import NextLink from 'next/link'
import { useCustomerSession } from '../../hooks/useCustomerSession'
import { useAuthorizationErrorMasked } from './useAuthorizationErrorMasked'

export type ApolloCustomerErrorSnackbarProps = ApolloErrorSnackbarProps

export function ApolloCustomerErrorSnackbar(props: ApolloCustomerErrorSnackbarProps) {
  const { error } = props
  const [newError, unauthorized] = useAuthorizationErrorMasked(error)
  const { token } = useCustomerSession()

  return (
    <ApolloErrorSnackbar
      {...props}
      action={
        unauthorized && (
          <NextLink href='/account/signin' passHref>
            <Link underline='hover'>
              {token ? <Trans id='Sign in' /> : <Trans id='Create Account' />}
            </Link>
          </NextLink>
        )
      }
      error={newError}
    />
  )
}
