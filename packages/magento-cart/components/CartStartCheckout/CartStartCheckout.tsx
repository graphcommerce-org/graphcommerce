import { Money } from '@graphcommerce/magento-store'
import type { ButtonProps } from '@graphcommerce/next-ui'
import { extendableComponent, iconChevronRight, IconSvg } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/macro'
import type { SxProps, Theme } from '@mui/material'
import { Box, Button, Link } from '@mui/material'
import React from 'react'
import { useCheckoutShouldLoginToContinue } from '../../hooks'
import type { CartStartCheckoutFragment } from './CartStartCheckout.gql'

export type CartStartCheckoutProps = {
  children?: React.ReactNode
  sx?: SxProps<Theme>
  buttonProps?: ButtonProps<'button'>
  disabled?: boolean
  hideTotal?: boolean
  cart?: CartStartCheckoutFragment | null | undefined
  onStart?: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    cart: CartStartCheckoutFragment | null | undefined,
  ) => Promise<void>
}

const name = 'CartStartCheckout'
const parts = [
  'checkoutButtonContainer',
  'checkoutButton',
  'checkoutButtonTotal',
  'checkoutMoney',
  'loginContainer',
] as const
const { classes } = extendableComponent(name, parts)

export function CartStartCheckout(props: CartStartCheckoutProps) {
  const {
    children,
    onStart,
    buttonProps: { onClick, ...buttonProps } = {},
    disabled,
    hideTotal = false,
    sx = [],
    cart,
  } = props

  const shouldLoginToContinue = useCheckoutShouldLoginToContinue()
  const hasTotals = (cart?.prices?.grand_total?.value ?? 0) > 0 || !!cart?.items?.length
  const hasErrors = cart?.items?.some((item) => (item?.errors?.length ?? 0) > 0)

  return (
    <Box
      className={classes.checkoutButtonContainer}
      sx={[
        (theme) => ({
          textAlign: 'center',
          my: theme.spacings.md,
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {shouldLoginToContinue && (
        <Box sx={{ mb: 1 }} className={classes.loginContainer}>
          <Link href='/account/signin'>
            <Trans>You must first login before you can continue</Trans>
          </Link>
        </Box>
      )}

      <Button
        href='/checkout'
        id='cart-start-checkout'
        variant='pill'
        color='secondary'
        size='large'
        className={classes.checkoutButton}
        endIcon={<IconSvg src={iconChevronRight} />}
        onClick={async (e) => {
          onClick?.(e)
          await onStart?.(e, cart)
        }}
        disabled={disabled || !hasTotals || hasErrors || shouldLoginToContinue}
        {...buttonProps}
      >
        <Box
          component='span'
          className={classes.checkoutButtonTotal}
          sx={(theme) => ({
            paddingRight: theme.spacings.xxs,
            '& ~ span.MuiButton-endIcon': { marginLeft: '6px' },
          })}
        >
          <Trans>Start Checkout</Trans>
        </Box>{' '}
        {hasTotals && !hideTotal && (
          <span className={classes.checkoutMoney}>
            <Money {...cart?.prices?.grand_total} />
          </span>
        )}
      </Button>

      {children}

      {hasErrors && (
        <Box sx={(theme) => ({ color: 'error.main', mt: theme.spacings.xs })}>
          <Trans>
            Some items in your cart contain errors, please update or remove them, then try again.
          </Trans>
        </Box>
      )}
    </Box>
  )
}
