import { Divider, makeStyles, Theme } from '@material-ui/core'
import { Money } from '@reachdigital/magento-store'
import { AnimatedRow, UseStyles } from '@reachdigital/next-ui'
import clsx from 'clsx'
import { AnimatePresence } from 'framer-motion'
import React from 'react'
import { useCartQuery } from '../../hooks'
import { GetCartTotalsDocument } from './GetCartTotals.gql'

const useStyles = makeStyles(
  (theme: Theme) => ({
    costsContainer: {
      borderRadius: 4,
      background: '#FFFADD',
      padding: `${theme.spacings.xs} ${theme.spacings.sm}`,
    },
    containerMarginTop: {
      marginTop: theme.spacings.md,
    },
    costsDivider: {
      margin: `1em 0`,
    },
    costsRow: {
      display: 'flex',
      justifyContent: 'space-between',
      ...theme.typography.subtitle1,
    },
    costsGrandTotal: {
      fontWeight: theme.typography.fontWeightBold,
      color: theme.palette.primary.main,
    },
    costsDiscount: {
      fontWeight: theme.typography.fontWeightBold,
    },
    costsDiscountSub: {
      fontWeight: theme.typography.fontWeightBold,
    },
    costsTax: {
      color: theme.palette.primary.mutedText,
      paddingTop: 0,
    },
    money: {
      whiteSpace: 'nowrap',
    },
  }),
  { name: 'CartTotals' },
)

export type CartTotalsProps = { containerMargin?: boolean } & UseStyles<typeof useStyles>

export default function CartTotals(props: CartTotalsProps) {
  const { data } = useCartQuery(GetCartTotalsDocument, { allowUrl: true })
  const classes = useStyles(props)

  if (!data?.cart) return null
  const { containerMargin } = props
  const { shipping_addresses, prices } = data.cart
  const shippingMethod = shipping_addresses?.[0]?.selected_shipping_method

  return (
    <AnimatedRow
      className={clsx(
        containerMargin ? classes.containerMarginTop : undefined,
        classes.costsContainer,
      )}
      key='total-costs'
    >
      <AnimatePresence initial={false}>
        {prices?.subtotal_including_tax && (
          <AnimatedRow className={classes.costsRow} key='subtotal'>
            <div>Products</div>
            <div className={classes.money}>
              <Money {...prices.subtotal_including_tax} />
            </div>
          </AnimatedRow>
        )}

        {/* {prices?.discounts && prices.discounts.length > 1 && (
          <AnimatedRow className={clsx(classes.costsRow, classes.costsDiscount)} key='discount'>
            <div>Product discount</div>
            <div className={classes.money}>
              <Money
                currency={prices.subtotal_with_discount_excluding_tax?.currency}
                value={
                  (prices.subtotal_excluding_tax?.value ?? 0) * -1 -
                  (prices.subtotal_with_discount_excluding_tax?.value ?? 0) * -1
                }
              />
            </div>
          </AnimatedRow>
        )} */}

        {prices?.discounts?.map((discount) => (
          <AnimatedRow
            className={clsx(classes.costsRow, classes.costsDiscountSub)}
            key={discount?.label}
          >
            <div>{discount?.label}</div>
            <div className={classes.money}>
              {discount?.amount && (
                <Money {...discount.amount} value={(discount.amount.value ?? 0) * -1} />
              )}
            </div>
          </AnimatedRow>
        ))}

        {shippingMethod && (
          <AnimatedRow className={classes.costsRow} key='shippingMethod'>
            <div>
              Shipping ({shippingMethod.carrier_title} {shippingMethod.method_title})
            </div>
            <div className={classes.money}>
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
            <div>Total</div>
            <div className={classes.money}>
              <Money {...prices.grand_total} />
            </div>
          </AnimatedRow>
        )}

        {prices?.applied_taxes?.map((tax) => (
          <AnimatedRow className={clsx(classes.costsRow, classes.costsTax)} key={tax?.label ?? ''}>
            <div>Including {tax?.label}</div>
            <div className={classes.money}>
              <Money {...tax?.amount} />
            </div>
          </AnimatedRow>
        ))}
      </AnimatePresence>
    </AnimatedRow>
  )
}
