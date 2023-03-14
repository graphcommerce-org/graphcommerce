import {
  FullPageMessage,
  IconSvg,
  iconShoppingBag,
  FullPageMessageProps,
} from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react'
import Button from '@mui/material/Button'
import React from 'react'

type EmptyCartProps = { children?: React.ReactNode } & Pick<FullPageMessageProps, 'button'>
export function EmptyCart(props: EmptyCartProps) {
  const { children, button } = props

  return (
    <FullPageMessage
      title={<Trans id='Your cart is empty' />}
      icon={<IconSvg src={iconShoppingBag} size='xxl' />}
      button={
        button || (
          <Button href='/' variant='pill' color='secondary' size='large'>
            <Trans id='Continue shopping' />
          </Button>
        )
      }
    >
      {children ?? <Trans id='Discover our collection and add items to your cart!' />}
    </FullPageMessage>
  )
}
