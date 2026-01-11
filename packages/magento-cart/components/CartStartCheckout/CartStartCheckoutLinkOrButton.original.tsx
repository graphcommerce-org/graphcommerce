import type { LinkOrButtonProps } from '@graphcommerce/next-ui'
import { iconChevronRight, IconSvg, LinkOrButton, sxx } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react/macro'
import type { SxProps, Theme } from '@mui/material'
import React from 'react'
import { useCheckoutShouldLoginToContinue } from '../../hooks'
import type { CartStartCheckoutFragment } from './CartStartCheckout.gql'

export type CartStartCheckoutLinkOrButtonProps = {
  children?: React.ReactNode
  disabled?: boolean
  cart?: CartStartCheckoutFragment | null | undefined
  onStart?: (
    e: React.MouseEvent<HTMLButtonElement & HTMLAnchorElement & HTMLSpanElement>,
    cart: CartStartCheckoutFragment | null | undefined,
  ) => Promise<void>
  linkOrButtonProps?: LinkOrButtonProps
}

export function CartStartCheckoutLinkOrButton(props: CartStartCheckoutLinkOrButtonProps) {
  const {
    onStart,
    disabled,
    linkOrButtonProps: { onClick, button, ...linkOrButtonProps } = {},
    cart,
    children,
  } = props

  const shouldLoginToContinue = useCheckoutShouldLoginToContinue()

  const hasTotals = (cart?.prices?.grand_total?.value ?? 0) > 0 || !!cart?.items?.length
  const hasErrors = cart?.items?.some((item) => (item?.errors?.length ?? 0) > 0)

  return (
    <LinkOrButton
      href='/checkout'
      onClick={async (
        e: React.MouseEvent<HTMLButtonElement & HTMLAnchorElement & HTMLSpanElement, MouseEvent>,
      ) => {
        onClick?.(e)
        await onStart?.(e, cart)
      }}
      button={{ variant: 'pill', ...button }}
      disabled={disabled || !hasTotals || hasErrors || shouldLoginToContinue}
      color='secondary'
      endIcon={<IconSvg src={iconChevronRight} />}
      {...linkOrButtonProps}
    >
      {children ?? <Trans>Next</Trans>}
    </LinkOrButton>
  )
}
