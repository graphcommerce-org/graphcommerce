import type { FullPageMessageProps } from '@graphcommerce/next-ui'
import { FullPageMessage, IconSvg, iconShoppingBag } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react'
import type { SxProps, Theme } from '@mui/material'
import { Button } from '@mui/material'
import React from 'react'

type EmptyCartProps = {
  children?: React.ReactNode
  sx?: SxProps<Theme>
} & Pick<FullPageMessageProps, 'button' | 'disableMargin'>

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
