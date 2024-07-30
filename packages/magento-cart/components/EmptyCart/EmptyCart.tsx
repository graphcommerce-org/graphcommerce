import {
  FullPageMessage,
  IconSvg,
  iconShoppingBag,
  FullPageMessageProps,
} from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react'
import { Button, SxProps, Theme } from '@mui/material'
import React from 'react'

type EmptyCartProps = { children?: React.ReactNode; sx?: SxProps<Theme> } & Pick<
  FullPageMessageProps,
  'button'
>
export function EmptyCart(props: EmptyCartProps) {
  const { children, button, sx } = props

  return (
    <FullPageMessage
      sx={[
        (theme) => ({
          mt: { md: theme.spacings.md },
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
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
