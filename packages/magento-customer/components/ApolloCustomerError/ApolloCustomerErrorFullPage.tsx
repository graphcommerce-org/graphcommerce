import {
  ApolloErrorFullPage,
  ApolloErrorAlertProps,
  Button,
  SvgImage,
  iconPersonAltBig,
} from '@reachdigital/next-ui'
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
      icon={<SvgImage src={iconPersonAltBig} size={148} alt='person' />}
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
