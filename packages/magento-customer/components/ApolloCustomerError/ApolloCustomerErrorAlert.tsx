import { ApolloErrorAlert, ApolloErrorAlertProps } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/macro'
import { Link } from '@mui/material'
import NextLink from 'next/link'
import React from 'react'
import { useExtractCustomerErrors } from '../../hooks/useExtractCustomerErrors'

type MagentoErrorAlertProps = ApolloErrorAlertProps

export default function ApolloCustomerErrorAlert(props: MagentoErrorAlertProps) {
  const { error, unauthorized } = useExtractCustomerErrors(props)

  const action = unauthorized && (
    <NextLink href='/account/signin' passHref>
      <Link>
        <Trans>Create Account</Trans> / <Trans>Sign In</Trans>
      </Link>
    </NextLink>
  )

  return <ApolloErrorAlert error={error} graphqlErrorAlertProps={{ action }} />
}
