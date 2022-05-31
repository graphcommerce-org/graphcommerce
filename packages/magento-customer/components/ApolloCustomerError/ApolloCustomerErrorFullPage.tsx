import { ApolloErrorFullPage, ApolloErrorAlertProps } from '@graphcommerce/ecommerce-ui'
import { graphqlErrorByCategory } from '@graphcommerce/magento-graphql'
import { iconPerson, IconSvg } from '@graphcommerce/next-ui'
import { i18n } from '@lingui/core'
import { Trans } from '@lingui/react'
import { Button } from '@mui/material'
import PageLink from 'next/link'

type ApolloCustomerErrorFullPageProps = {
  signInHref: string
  signUpHref: string
} & ApolloErrorAlertProps

export function ApolloCustomerErrorFullPage(props: ApolloCustomerErrorFullPageProps) {
  const { signInHref, signUpHref, error } = props
  const [newError, unauthorized] = graphqlErrorByCategory({
    category: 'graphql-authorization',
    error,
    extract: false,
    mask: i18n._(/* i18n */ `You must sign in to continue`),
  })
  return (
    <ApolloErrorFullPage
      error={newError}
      icon={<IconSvg src={iconPerson} size='xxl' />}
      button={
        unauthorized ? (
          <PageLink href={signInHref} passHref>
            <Button variant='contained' color='primary' size='large'>
              <Trans id='Log in' />
            </Button>
          </PageLink>
        ) : undefined
      }
      altButton={
        unauthorized ? (
          <PageLink href={signUpHref} passHref>
            <Button variant='text' color='primary'>
              <Trans id='Or create an account' />
            </Button>
          </PageLink>
        ) : undefined
      }
    />
  )
}
