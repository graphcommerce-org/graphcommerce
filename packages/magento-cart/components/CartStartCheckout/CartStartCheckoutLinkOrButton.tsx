import {
  iconChevronRight,
  IconSvg,
  LinkOrButton,
  LinkOrButtonProps,
  useStorefrontConfig,
} from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react'
import { SxProps, Theme } from '@mui/material'
import React from 'react'
import { CartStartCheckoutFragment } from './CartStartCheckout.gql'
import { useCustomerSession } from '@graphcommerce/magento-customer'

export type CartStartCheckoutLinkOrButtonProps = {
  children?: React.ReactNode
  sx?: SxProps<Theme>
  disabled?: boolean
  cart?: CartStartCheckoutFragment | null | undefined
  onStart?: (
    e: React.MouseEvent<HTMLButtonElement & HTMLAnchorElement & HTMLSpanElement>,
    cart: CartStartCheckoutFragment | null | undefined,
  ) => void
  linkOrButtonProps?: LinkOrButtonProps
}

export function CartStartCheckoutLinkOrButton(props: CartStartCheckoutLinkOrButtonProps) {
  const {
    children,
    onStart,
    disabled,
    linkOrButtonProps: { onClick, button, ...linkOrButtonProps } = {},
    cart,
  } = props

  const { signInMode } = useStorefrontConfig()
  const { loggedIn } = useCustomerSession()
  const disableGuestCheckout = signInMode === 'DISABLE_GUEST_CHECKOUT' && !loggedIn

  const hasTotals = (cart.prices?.grand_total?.value ?? 0) > 0
  const hasErrors = cart.items?.some((item) => (item?.errors?.length ?? 0) > 0)


  return (
    <LinkOrButton
      href={disableGuestCheckout ? '/account/signin' : '/checkout'}
      onClick={(
        e: React.MouseEvent<HTMLButtonElement & HTMLAnchorElement & HTMLSpanElement, MouseEvent>,
      ) => {
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
