import { FullPageMessage, FullPageMessageProps, IconSvg, iconPerson } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react'
import { Button } from '@mui/material'
import React from 'react'
import { useCustomerAccountCanSignUp } from '../../hooks'

type UnauthenticatedFullPageMessageProps = Omit<FullPageMessageProps, 'icon' | 'title'> & {
  icon?: React.ReactNode
  title?: React.ReactNode
}

export function UnauthenticatedFullPageMessage(props: UnauthenticatedFullPageMessageProps) {
  const canSignUp = useCustomerAccountCanSignUp()

  return (
    <FullPageMessage
      icon={<IconSvg src={iconPerson} size='xxl' />}
      title={<Trans id='You must be signed in to continue' />}
      button={
        <Button href='/account/signin' variant='pill' color='secondary' size='large'>
          {canSignUp ? <Trans id='Sign in or create an account!' /> : <Trans id='Sign in' />}
        </Button>
      }
      {...props}
    />
  )
}
