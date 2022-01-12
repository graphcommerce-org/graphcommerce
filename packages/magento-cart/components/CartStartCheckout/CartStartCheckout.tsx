import { Money } from '@graphcommerce/magento-store'
import { iconChevronRight, SvgImageSimple, makeStyles } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/macro'
import { Button } from '@mui/material'
import PageLink from 'next/link'
import React, { PropsWithChildren } from 'react'
import { CartStartCheckoutFragment } from './CartStartCheckout.gql'

const useStyles = makeStyles({ name: 'Cart' })((theme) => ({
  checkoutButtonContainer: {
    textAlign: 'center',
  },
  checkoutButton: {
    marginTop: theme.spacings.md,
    marginBottom: theme.spacings.lg,
  },
  checkoutButtonIcon: {
    marginLeft: 0,
  },
  checkoutButtonTotal: {
    paddingRight: theme.spacings.xxs,
    '& ~ span.MuiButton-endIcon': {
      marginLeft: 6,
    },
  },
  checkoutMoney: {},
}))

export type CartStartCheckoutProps = PropsWithChildren<CartStartCheckoutFragment>

export default function CartStartCheckout(props: CartStartCheckoutProps) {
  const { prices, children } = props

  const hasTotals = (prices?.grand_total?.value ?? 0) > 0
  const { classes } = useStyles()
  return (
    <div className={classes.checkoutButtonContainer}>
      <PageLink href='/checkout' passHref>
        <Button
          variant='pill'
          color='secondary'
          size='large'
          className={classes.checkoutButton}
          endIcon={<SvgImageSimple src={iconChevronRight} />}
          disabled={!hasTotals}
        >
          <span className={classes.checkoutButtonTotal}>
            <Trans>Start Checkout</Trans>
          </span>{' '}
          {hasTotals && (
            <span className={classes.checkoutMoney}>
              <Money {...prices?.grand_total} />
            </span>
          )}
        </Button>
      </PageLink>
      {children}
    </div>
  )
}
