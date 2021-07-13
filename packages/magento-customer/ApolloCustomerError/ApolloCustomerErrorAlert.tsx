import { Link } from '@material-ui/core'
import { ApolloErrorAlert, ApolloErrorAlertProps } from '@reachdigital/next-ui'
import NextLink from 'next/link'
import React from 'react'
import { useExtractCustomerErrors } from './useExtractCustomerErrors'

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
