import { ApolloErrorAlert, ApolloErrorAlertProps } from '@graphcommerce/ecommerce-ui'
import { Trans } from '@lingui/macro'
import { Link } from '@mui/material'
import NextLink from 'next/link'
import { useExtractCustomerErrors } from '../../hooks/useExtractCustomerErrors'

type MagentoErrorAlertProps = ApolloErrorAlertProps

export default function ApolloCustomerErrorAlert(props: MagentoErrorAlertProps) {
  const { error, unauthorized } = useExtractCustomerErrors(props)

  const action = unauthorized && (
    <NextLink href='/account/signin' passHref>
      <Link underline='hover'>
        <Trans>Create Account</Trans> / <Trans>Sign in</Trans>
      </Link>
    </NextLink>
  )

  return <ApolloErrorAlert error={error} graphqlErrorAlertProps={{ action }} />
}
