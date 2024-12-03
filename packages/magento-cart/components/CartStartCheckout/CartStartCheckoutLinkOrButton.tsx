import type { LinkOrButtonProps } from '@graphcommerce/next-ui'
import { IconSvg, LinkOrButton, iconChevronRight } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react'
import type { SxProps, Theme } from '@mui/material'
import React from 'react'
import { useCheckoutShouldLoginToContinue } from '../../hooks'
import type { CartStartCheckoutFragment } from './CartStartCheckout.gql'

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
    onStart,
    disabled,
    linkOrButtonProps: { onClick, button, ...linkOrButtonProps } = {},
    cart,
  } = props

  const shouldLoginToContinue = useCheckoutShouldLoginToContinue()

  const hasTotals = (cart?.prices?.grand_total?.value ?? 0) > 0
  const hasErrors = cart?.items?.some((item) => (item?.errors?.length ?? 0) > 0)

  return (
    <LinkOrButton
      href='/checkout'
      onClick={(
        e: React.MouseEvent<HTMLButtonElement & HTMLAnchorElement & HTMLSpanElement, MouseEvent>,
      ) => {
        onClick?.(e)
        onStart?.(e, cart)
      }}
      button={{ variant: 'pill', ...button }}
      disabled={disabled || !hasTotals || hasErrors || shouldLoginToContinue}
      color='secondary'
      endIcon={<IconSvg src={iconChevronRight} />}
      {...linkOrButtonProps}
    >
      <Trans id='Next' />
    </LinkOrButton>
  )
}
