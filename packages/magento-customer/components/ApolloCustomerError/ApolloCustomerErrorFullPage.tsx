import {
  ApolloErrorFullPage,
  ApolloErrorAlertProps,
  Button,
  SvgImage,
  iconPerson,
  SvgImageSimple,
} from '@graphcommerce/next-ui'
import PageLink from 'next/link'
import React from 'react'

import { useExtractCustomerErrors } from '../../hooks/useExtractCustomerErrors'

type ApolloCustomerErrorFullPageProps = {
  signInHref: string
  signUpHref: string
} & ApolloErrorAlertProps

export default function ApolloCustomerErrorFullPage(props: ApolloCustomerErrorFullPageProps) {
  const { signInHref, signUpHref } = props
  const { error, unauthorized } = useExtractCustomerErrors(props)

  return (
    <ApolloErrorFullPage
      error={error}
      icon={<SvgImageSimple src={iconPerson} alt='person' size='xxl' />}
      button={
        unauthorized ? (
          <PageLink href={signInHref} passHref>
            <Button variant='contained' color='primary' text='bold' size='large'>
              Login
            </Button>
          </PageLink>
        ) : undefined
      }
      altButton={
        unauthorized ? (
          <PageLink href={signUpHref} passHref>
            <Button variant='text' color='primary'>
              Or create an account
            </Button>
          </PageLink>
        ) : undefined
      }
    />
  )
}
