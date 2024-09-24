import { ApolloErrorFullPage, ApolloErrorFullPageProps } from '@graphcommerce/ecommerce-ui'
import { iconPerson, IconSvg } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react'
import { Button } from '@mui/material'
import type { SetOptional } from 'type-fest'
import { useCustomerAccountCanSignUp } from '../../hooks'
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
  const canSignUp = useCustomerAccountCanSignUp()

  return (
    <ApolloErrorFullPage
      icon={<IconSvg src={iconPerson} size='xxl' />}
      {...props}
      error={newError}
      button={
        unauthorized ? (
          <Button href='/account/signin' variant='pill' color='primary' size='large'>
            {canSignUp ? <Trans id='Sign in or create an account!' /> : <Trans id='Sign in' />}
          </Button>
        ) : (
          button
        )
      }
      {...alertProps}
    />
  )
}
