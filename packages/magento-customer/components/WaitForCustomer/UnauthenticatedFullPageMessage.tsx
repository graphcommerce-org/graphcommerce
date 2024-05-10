import { FullPageMessage, FullPageMessageProps, IconSvg, iconPerson } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react'
import { Button } from '@mui/material'
import React from 'react'
import { useCustomerSession } from '../../hooks'

type UnauthenticatedFullPageMessageProps = Omit<FullPageMessageProps, 'icon' | 'title'> & {
  icon?: React.ReactNode
  title?: React.ReactNode
}

export function UnauthenticatedFullPageMessage(props: UnauthenticatedFullPageMessageProps) {
  const session = useCustomerSession()

  return (
    <FullPageMessage
      icon={<IconSvg src={iconPerson} size='xxl' />}
      title={<Trans id='You must sign in to continue' />}
      button={
        <Button href='/account/signin' variant='pill' color='secondary' size='large'>
          {!session.valid ? <Trans id='Sign in' /> : <Trans id='Sign in or create an account!' />}
        </Button>
      }
      {...props}
    />
  )
}
