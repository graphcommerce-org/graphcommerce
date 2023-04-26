import { iconChevronRight, IconSvg, LinkOrButton, LinkOrButtonProps } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react'
import { SxProps, Theme } from '@mui/material'
import React from 'react'
import { CartStartCheckoutFragment } from './CartStartCheckout.gql'

export type CartStartCheckoutLinkOrButtonProps = CartStartCheckoutFragment & {
  children?: React.ReactNode
  sx?: SxProps<Theme>
  disabled?: boolean
  onStart?: (
    e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>,
    cart: CartStartCheckoutFragment,
  ) => void
  linkOrButtonProps?: LinkOrButtonProps
}

export function CartStartCheckoutLinkOrButton(props: CartStartCheckoutLinkOrButtonProps) {
  const {
    children,
    onStart,
    disabled,
    linkOrButtonProps: { onClick, button, ...linkOrButtonProps } = {},
    ...cart
  } = props

  const hasTotals = (cart.prices?.grand_total?.value ?? 0) > 0
  const hasErrors = cart.items?.some((item) => (item?.errors?.length ?? 0) > 0)

  return (
    <LinkOrButton
      href='/checkout'
      onClick={(e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
        onClick?.(e)
        onStart?.(e, cart)
      }}
      button={{ variant: 'pill', ...button }}
      disabled={disabled || !hasTotals || hasErrors}
      color='secondary'
      endIcon={<IconSvg src={iconChevronRight} />}
      {...linkOrButtonProps}
    >
      <Trans id='Next' />
    </LinkOrButton>
  )
}
