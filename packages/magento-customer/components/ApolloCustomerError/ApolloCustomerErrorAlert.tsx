import { ApolloErrorAlert, ApolloErrorAlertProps } from '@graphcommerce/ecommerce-ui'
import { graphqlErrorByCategory } from '@graphcommerce/magento-graphql'
import { i18n } from '@lingui/core'
import { Trans } from '@lingui/react'
import { Link } from '@mui/material'
import NextLink from 'next/link'

type MagentoErrorAlertProps = ApolloErrorAlertProps

export function ApolloCustomerErrorAlert(props: MagentoErrorAlertProps) {
  const { error } = props
  const [newError, unauthorized] = graphqlErrorByCategory({
    category: 'graphql-authorization',
    error,
    extract: false,
    mask: i18n._(/* i18n */ `You must sign in to continue`),
  })
  const action = unauthorized && (
    <NextLink href='/account/signin' passHref>
      <Link underline='hover'>
        <Trans id='Create Account' /> / <Trans id='Sign in' />
      </Link>
    </NextLink>
  )

  return <ApolloErrorAlert error={newError} graphqlErrorAlertProps={{ action }} />
}
