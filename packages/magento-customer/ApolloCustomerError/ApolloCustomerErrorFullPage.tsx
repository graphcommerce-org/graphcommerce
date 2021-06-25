import ApolloErrorFullPage from '@reachdigital/next-ui/ApolloError/ApolloErrorFullPage'
import PageLink from 'next/link'
import React from 'react'
import { ApolloErrorAlertProps } from '../../next-ui/ApolloError/ApolloErrorAlert'
import Button from '../../next-ui/Button'
import SvgImage from '../../next-ui/SvgImage'
import { iconPersonAltBig } from '../../next-ui/icons'
import { useExtractCustomerErrors } from './useExtractCustomerErrors'

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
