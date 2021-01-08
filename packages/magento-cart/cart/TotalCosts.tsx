import { Divider, makeStyles, Theme } from '@material-ui/core'
import Money from '@reachdigital/magento-store/Money'
import AnimatedRow from '@reachdigital/next-ui/AnimatedForm/AnimatedRow'
import clsx from 'clsx'
import React from 'react'
import { ClientCartQuery } from '../ClientCart.gql'

const useStyles = makeStyles(
  (theme: Theme) => ({
    costsContainer: {
      background: '#FFFADD',
      paddingTop: theme.spacings.xs,
      paddingBottom: theme.spacings.xs,
      paddingLeft: theme.spacings.sm,
      paddingRight: theme.spacings.sm,
      marginTop: theme.spacings.lg,
    },
    costsRow: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: theme.spacings.xxs,
      fontSize: 17,
    },
    costsGrandTotal: {
      marginTop: theme.spacings.xxs,
      fontWeight: theme.typography.fontWeightBold,
      color: theme.palette.primary.main,
    },
  }),
  { name: 'TotalCosts' },
)

type TotalCostsProps = {
  cart: ClientCartQuery['cart']
}

export default function TotalCosts(props: TotalCostsProps) {
  const { cart } = props
  const classes = useStyles()

  return (
    <AnimatedRow className={classes.costsContainer} key='total-costs'>
      {cart?.prices?.subtotal_including_tax && (
        <div className={classes.costsRow}>
          <div>Products</div>
          <div>
            <Money {...cart.prices.subtotal_including_tax} />
          </div>
        </div>
      )}

      {cart?.prices?.discounts?.map((discount, idx) => (
        <div className={classes.costsRow} key={`discount-${idx}`}>
          <div>{discount?.label}</div>
          <div>
            {discount?.amount && (
              <Money
                currency={discount?.amount.currency}
                value={(discount?.amount.value ?? 0) * -1}
              />
            )}
          </div>
        </div>
      ))}

      <Divider key='divider' />

      {cart?.prices?.grand_total && (
        <div className={clsx(classes.costsRow, classes.costsGrandTotal)}>
          <div>Total (incl. VAT)</div>
          <div>
            <Money {...cart.prices.grand_total} />
          </div>
        </div>
      )}
    </AnimatedRow>
  )
}
