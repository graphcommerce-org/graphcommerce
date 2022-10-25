import { Money } from '@graphcommerce/magento-store'
import { iconChevronRight, IconSvg, extendableComponent } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react'
import { Box, Button, ButtonProps, SxProps, Theme } from '@mui/material'
import PageLink from 'next/link'
import { CartStartCheckoutFragment } from './CartStartCheckout.gql'

export type CartStartCheckoutProps = CartStartCheckoutFragment & {
  children?: React.ReactNode
  sx?: SxProps<Theme>
  buttonProps?: ButtonProps<'button'>
}

const name = 'CartStartCheckout' as const
const parts = [
  'checkoutButtonContainer',
  'checkoutButton',
  'checkoutButtonTotal',
  'checkoutMoney',
] as const
const { classes } = extendableComponent(name, parts)

export function CartStartCheckout(props: CartStartCheckoutProps) {
  const { prices, children, buttonProps, sx = [] } = props

  const hasTotals = (prices?.grand_total?.value ?? 0) > 0
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
      <PageLink href='/checkout' passHref legacyBehavior>
        <Button
          href='/checkout'
          id='cart-start-checkout'
          variant='pill'
          color='secondary'
          size='large'
          className={classes.checkoutButton}
          endIcon={<IconSvg src={iconChevronRight} />}
          {...buttonProps}
          disabled={!hasTotals || buttonProps?.disabled}
        >
          <Box
            component='span'
            className={classes.checkoutButtonTotal}
            sx={(theme) => ({
              paddingRight: theme.spacings.xxs,
              '& ~ span.MuiButton-endIcon': { marginLeft: '6px' },
            })}
          >
            <Trans id='Start Checkout' />
          </Box>{' '}
          {hasTotals && (
            <span className={classes.checkoutMoney}>
              <Money {...prices?.grand_total} />
            </span>
          )}
        </Button>
      </PageLink>
      {children}
    </Box>
  )
}
