import {
  FullPageMessage,
  IconSvg,
  iconShoppingBag,
  FullPageMessageProps,
} from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react'
import { Button, SxProps, Theme } from '@mui/material'
import React from 'react'

type EmptyCartProps = {
  children?: React.ReactNode
  sx?: SxProps<Theme>
  disableMargin?: boolean
} & Pick<FullPageMessageProps, 'button'>
export function EmptyCart(props: EmptyCartProps) {
  const { children, button, ...rest } = props

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
      {...rest}
    >
      {children ?? <Trans id='Discover our collection and add items to your cart!' />}
    </FullPageMessage>
  )
}
