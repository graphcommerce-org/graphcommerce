import { Money } from '@graphcommerce/magento-store'
import { iconChevronRight, IconSvg, extendableComponent } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/macro'
import { Box, Button, SxProps, Theme } from '@mui/material'
import PageLink from 'next/link'
import { CartStartCheckoutFragment } from './CartStartCheckout.gql'

export type CartStartCheckoutProps = CartStartCheckoutFragment & {
  children?: React.ReactNode
  sx?: SxProps<Theme>
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
  const { prices, children, sx = [] } = props

  const hasTotals = (prices?.grand_total?.value ?? 0) > 0
  return (
    <Box
      className={classes.checkoutButtonContainer}
      sx={[{ textAlign: 'center' }, ...(Array.isArray(sx) ? sx : [sx])]}
    >
      <PageLink href='/checkout' passHref>
        <Button
          variant='pill'
          color='secondary'
          size='large'
          className={classes.checkoutButton}
          endIcon={<IconSvg src={iconChevronRight} />}
          disabled={!hasTotals}
          sx={(theme) => ({
            marginTop: theme.spacings.md,
            marginBottom: theme.spacings.lg,
          })}
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
