import type { FullPageMessageProps } from '@graphcommerce/next-ui'
import {
  FullPageMessage,
  iconShoppingBag,
  IconSvg,
  OverlayCloseButton,
} from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react'
import type { SxProps, Theme } from '@mui/material'
import React from 'react'

export type EmptyCartProps = {
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
          <OverlayCloseButton variant='pill' color='secondary' size='large'>
            <Trans id='Continue shopping'>Continue shopping</Trans>
          </OverlayCloseButton>
        )
      }
      {...rest}
    >
      {children ?? <Trans id='Discover our collection and add items to your cart!' />}
    </FullPageMessage>
  )
}
