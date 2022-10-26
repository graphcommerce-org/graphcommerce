import { ApolloErrorFullPage, ApolloErrorFullPageProps } from '@graphcommerce/ecommerce-ui'
import { iconPerson, IconSvg } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react'
import { Button } from '@mui/material'
import PageLink from 'next/link'
import type { SetOptional } from 'type-fest'
import { useCustomerSession } from '../../hooks/useCustomerSession'
import { useAuthorizationErrorMasked } from './useAuthorizationErrorMasked'

export type ApolloCustomerErrorFullPageProps = {
  /** @deprecated Not used */
  signInHref?: string
  /** @deprecated Not used */
  signUpHref?: string
} & SetOptional<ApolloErrorFullPageProps, 'icon'>

export function ApolloCustomerErrorFullPage(props: ApolloCustomerErrorFullPageProps) {
  const { error, icon, altButton, button, ...alertProps } = props
  const [newError, unauthorized] = useAuthorizationErrorMasked(error)
  const { token } = useCustomerSession()

  return (
    <ApolloErrorFullPage
      icon={<IconSvg src={iconPerson} size='xxl' />}
      {...props}
      error={newError}
      button={
        unauthorized ? (
          <PageLink href='/account/signin' passHref legacyBehavior>
            <Button variant='pill' color='primary' size='large'>
              {token ? <Trans id='Sign in' /> : <Trans id='Sign in or create an account!' />}
            </Button>
          </PageLink>
        ) : (
          button
        )
      }
      {...alertProps}
    />
  )
}
