import { Divider, makeStyles, Theme } from '@material-ui/core'
import { Money, MoneyProps } from '@graphcommerce/magento-store'
import { AnimatedRow, UseStyles } from '@graphcommerce/next-ui'
import clsx from 'clsx'
import { AnimatePresence } from 'framer-motion'
import React from 'react'
import { useCartQuery, useDisplayInclTax } from '../../hooks'
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

/**
 * ⚠️ WARNING: The current CartTotals rely heavily on how Magento is configured. It kinda works for
 * the demo, but we need additional fields from the API to get this working as expected:
 *
 * @see https://github.com/magento/magento2/issues/33848
 * @see https://github.com/magento/magento2/issues?q=is%3Aopen+is%3Aissue+label%3A%22Project%3A+GraphQL%22+tax
 */
export default function CartTotals(props: CartTotalsProps) {
  const { data } = useCartQuery(GetCartTotalsDocument, { allowUrl: true })
  const classes = useStyles(props)
  const inclTax = useDisplayInclTax()

  if (!data?.cart) return null

  const { containerMargin } = props
  const { shipping_addresses, prices } = data.cart
  const shippingMethod = shipping_addresses?.[0]?.selected_shipping_method
  const shippingMethodPrices = shipping_addresses?.[0]?.available_shipping_methods?.find(
    (avail) =>
      (shippingMethod?.amount.value ?? 0) > 0 &&
      avail?.carrier_code === shippingMethod?.carrier_code &&
      avail?.method_code === shippingMethod?.method_code,
  )

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
              <Money
                {...(inclTax ? prices.subtotal_including_tax : prices.subtotal_excluding_tax)}
              />
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

        {prices?.discounts?.map((discount) => {
          const value = inclTax
            ? (discount?.amount.value ?? 0) * -1
            : (discount?.amount.value ?? 0) *
              ((prices.subtotal_excluding_tax?.value ?? 1) /
                (prices.subtotal_including_tax?.value ?? 1)) *
              -1

          return (
            <AnimatedRow
              className={clsx(classes.costsRow, classes.costsDiscountSub)}
              key={discount?.label}
            >
              <div>{discount?.label}</div>
              <div className={classes.money}>
                {discount?.amount && <Money {...discount} value={value} />}
              </div>
            </AnimatedRow>
          )
        })}

        {shippingMethod && (
          <AnimatedRow className={classes.costsRow} key='shippingMethod'>
            <div>
              Shipping ({shippingMethod.carrier_title} {shippingMethod.method_title})
            </div>
            <div className={classes.money}>
              <Money
                {...(inclTax
                  ? shippingMethodPrices?.price_incl_tax
                  : shippingMethodPrices?.price_excl_tax)}
              />
            </div>
          </AnimatedRow>
        )}

        {!inclTax &&
          prices?.applied_taxes?.map((tax) => (
            <AnimatedRow className={clsx(classes.costsRow)} key={`excl${tax?.label}`}>
              <div>{tax?.label}</div>
              <div className={classes.money}>
                <Money {...tax?.amount} />
              </div>
            </AnimatedRow>
          ))}

        <AnimatedRow key='divider'>
          <Divider className={classes.costsDivider} />
        </AnimatedRow>

        {prices?.grand_total && (
          <AnimatedRow
            className={clsx(classes.costsRow, classes.costsGrandTotal)}
            key='grand_total'
          >
            <div>Grand total</div>
            <div className={classes.money}>
              <Money {...prices.grand_total} />
            </div>
          </AnimatedRow>
        )}

        {inclTax &&
          prices?.applied_taxes?.map((tax) => (
            <AnimatedRow
              className={clsx(classes.costsRow, classes.costsTax)}
              key={`incl${tax?.label}`}
            >
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
