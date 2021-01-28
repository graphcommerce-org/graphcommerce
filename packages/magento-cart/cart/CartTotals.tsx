import { Divider, makeStyles, Theme } from '@material-ui/core'
import Money from '@reachdigital/magento-store/Money'
import AnimatedRow from '@reachdigital/next-ui/AnimatedForm/AnimatedRow'
import clsx from 'clsx'
import { AnimatePresence } from 'framer-motion'
import React from 'react'
import { CartTotalsFragment } from './CartTotals.gql'

const useStyles = makeStyles(
  (theme: Theme) => ({
    costsContainer: {
      background: '#FFFADD',
      paddingBottom: theme.spacings.xs,
      paddingTop: `calc(${theme.spacings.xs} - ${theme.spacings.xxs})`,
      paddingLeft: theme.spacings.sm,
      paddingRight: theme.spacings.sm,
      marginTop: theme.spacings.lg,
    },
    costsDivider: {
      marginTop: theme.spacings.xxs,
    },
    costsRow: {
      display: 'flex',
      justifyContent: 'space-between',
      ...theme.typography.body1,
      '& > div': {
        paddingTop: theme.spacings.xxs,
      },
    },
    costsGrandTotal: {
      fontWeight: theme.typography.fontWeightBold,
      color: theme.palette.primary.main,
    },
    costsTax: {
      ...theme.typography.body2,
      fontWeight: 500,
      color: theme.palette.primary.mutedText,
      paddingTop: 0,
      '& > div': {
        paddingTop: 5,
      },
    },
  }),
  { name: 'TotalCosts' },
)

export default function CartTotals(props: CartTotalsFragment) {
  const { shipping_addresses, prices } = props
  const shippingMethod = shipping_addresses?.[0]?.selected_shipping_method
  const classes = useStyles()

  if (!prices) return null

  return (
    <AnimatedRow className={classes.costsContainer} key='total-costs'>
      <AnimatePresence initial={false}>
        {prices?.subtotal_including_tax && (
          <AnimatedRow className={classes.costsRow} key='subtotal'>
            <div>Products</div>
            <div>
              <Money {...prices.subtotal_including_tax} />
            </div>
          </AnimatedRow>
        )}

        {prices?.discounts?.map((discount) => (
          <AnimatedRow className={classes.costsRow} key='discount'>
            <div>{discount?.label}</div>
            <div>
              {discount?.amount && (
                <Money {...discount.amount} value={(discount.amount.value ?? 0) * -1} />
              )}
            </div>
          </AnimatedRow>
        ))}

        {shippingMethod && (
          <AnimatedRow className={classes.costsRow} key='shippingMethod'>
            <div>
              {shippingMethod.carrier_title} {shippingMethod.method_title}
            </div>
            <div>
              <Money {...shippingMethod.amount} />
            </div>
          </AnimatedRow>
        )}

        <AnimatedRow key='divider'>
          <Divider className={classes.costsDivider} />
        </AnimatedRow>

        {prices?.grand_total && (
          <AnimatedRow
            className={clsx(classes.costsRow, classes.costsGrandTotal)}
            key='grand_total'
          >
            <div>Total (incl. VAT)</div>
            <div>
              <Money {...prices.grand_total} />
            </div>
          </AnimatedRow>
        )}

        {prices.applied_taxes?.map((tax) => (
          <AnimatedRow className={clsx(classes.costsRow, classes.costsTax)} key={tax?.label ?? ''}>
            <div>Including {tax?.label}</div>
            <div>
              <Money {...tax?.amount} />
            </div>
          </AnimatedRow>
        ))}
      </AnimatePresence>
    </AnimatedRow>
  )
}
