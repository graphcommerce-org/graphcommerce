import { ApolloErrorAlert, ApolloErrorAlertProps } from '@graphcommerce/next-ui'
import { Link } from '@mui/material'
import NextLink from 'next/link'
import React from 'react'
import { useExtractCustomerErrors } from '../../hooks/useExtractCustomerErrors'

type MagentoErrorAlertProps = ApolloErrorAlertProps

export default function ApolloCustomerErrorAlert(props: MagentoErrorAlertProps) {
  const { error, unauthorized } = useExtractCustomerErrors(props)

  const action = unauthorized && (
    <>
      <NextLink href='/account/signin' passHref>
        <Link>Sign Up / Sign In</Link>
      </NextLink>
    </>
  )

  return <ApolloErrorAlert error={error} graphqlErrorAlertProps={{ action }} />
}
