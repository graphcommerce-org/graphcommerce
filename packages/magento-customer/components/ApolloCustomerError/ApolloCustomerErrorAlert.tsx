import { ApolloErrorAlert, ApolloErrorAlertProps } from '@graphcommerce/ecommerce-ui'
import { Trans } from '@lingui/react'
import { Link } from '@mui/material'
import NextLink from 'next/link'
import { useExtractCustomerErrors } from '../../hooks/useExtractCustomerErrors'

type MagentoErrorAlertProps = ApolloErrorAlertProps

export function ApolloCustomerErrorAlert(props: MagentoErrorAlertProps) {
  const { error, unauthorized } = useExtractCustomerErrors(props)

  const action = unauthorized && (
    <NextLink href='/account/signin' passHref>
      <Link underline='hover'>
        <Trans id='Create Account' /> / <Trans id='Sign in' />
      </Link>
    </NextLink>
  )

  return <ApolloErrorAlert error={error} graphqlErrorAlertProps={{ action }} />
}
