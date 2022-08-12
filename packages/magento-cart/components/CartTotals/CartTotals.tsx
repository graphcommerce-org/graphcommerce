import { Money } from '@graphcommerce/magento-store'
import { AnimatedRow, extendableComponent, responsiveVal } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react'
import { Box, Divider, lighten, SxProps, Theme } from '@mui/material'
import { AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/router'
import { useCartQuery, useDisplayInclTax } from '../../hooks'
import { GetCartTotalsDocument } from './GetCartTotals.gql'

export type CartTotalsProps = OwnerProps & { sx?: SxProps<Theme> }

type OwnerProps = { containerMargin?: boolean }
const name = 'CartTotals' as const
const parts = [
  'root',
  'costsDivider',
  'costsRow',
  'costsGrandTotal',
  'costsDiscountSub',
  'costsTax',
  'money',
] as const
const { withState } = extendableComponent<OwnerProps, typeof name, typeof parts>(name, parts)

/**
 * ⚠️ WARNING: The current CartTotals rely heavily on how Magento is configured. It kinda works for
 * the demo, but we need additional fields from the API to get this working as expected:
 *
 * @see https://github.com/magento/magento2/issues/33848
 */
export function CartTotals(props: CartTotalsProps) {
  const { data } = useCartQuery(GetCartTotalsDocument, { allowUrl: true })
  const { containerMargin, sx = [] } = props
  const { asPath } = useRouter()
  const animateLayout = asPath === '/checkout/payment' ? undefined : true

  const classes = withState({ containerMargin })
  const inclTax = useDisplayInclTax()

  if (!data?.cart) return null

  const { shipping_addresses, prices } = data.cart
  const shippingMethod = shipping_addresses?.[0]?.selected_shipping_method

  const shippingMethodPrices = shipping_addresses?.[0]?.available_shipping_methods?.find(
    (avail) =>
      (shippingMethod?.amount?.value ?? 0) > 0 &&
      avail?.carrier_code === shippingMethod?.carrier_code &&
      avail?.method_code === shippingMethod?.method_code,
  )

  return (
    <AnimatedRow
      layout={animateLayout}
      className={classes.root}
      sx={[
        (theme) => ({
          borderRadius: responsiveVal(theme.shape.borderRadius * 3, theme.shape.borderRadius * 4),
          background:
            theme.palette.mode === 'light'
              ? '#FFE10820'
              : lighten(theme.palette.background.default, 0.15),
          padding: `${theme.spacings.xs} ${theme.spacings.sm}`,

          '&.containerMargin': {
            marginTop: theme.spacings.md,
          },
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      key='total-costs'
    >
      <AnimatePresence initial={false}>
        {prices?.subtotal_including_tax && (
          <AnimatedRow
            layout={animateLayout}
            className={classes.costsRow}
            key='subtotal'
            sx={{ display: 'flex', justifyContent: 'space-between', typography: 'subtitle1' }}
          >
            <Box>
              <Trans id='Products' />
            </Box>
            <Box className={classes.money} sx={{ whiteSpace: 'nowrap' }}>
              <Money
                {...(inclTax ? prices.subtotal_including_tax : prices.subtotal_excluding_tax)}
              />
            </Box>
          </AnimatedRow>
        )}

        {prices?.discounts?.map((discount) => {
          const value = inclTax
            ? (discount?.amount.value ?? 0) * -1
            : (discount?.amount.value ?? 0) *
              ((prices.subtotal_excluding_tax?.value ?? 1) /
                (prices.subtotal_including_tax?.value ?? 1)) *
              -1

          return (
            <AnimatedRow
              layout={animateLayout}
              key={discount?.label}
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                typography: 'subtitle1',
              }}
            >
              <Box>{discount?.label}</Box>
              <Box className={classes.money} sx={{ whiteSpace: 'nowrap' }}>
                {discount?.amount && <Money {...discount.amount} value={value} />}
              </Box>
            </AnimatedRow>
          )
        })}

        {shippingMethod && (
          <AnimatedRow
            layout={animateLayout}
            className={classes.costsRow}
            key='shippingMethod'
            sx={{ display: 'flex', justifyContent: 'space-between', typography: 'subtitle1' }}
          >
            <Box>
              <Trans
                id='Shipping ({0} {1})'
                values={{ 0: shippingMethod.carrier_title, 1: shippingMethod.method_title }}
              />
            </Box>
            <Box className={classes.money} sx={{ whiteSpace: 'nowrap' }}>
              <Money
                {...(inclTax
                  ? shippingMethodPrices?.price_incl_tax
                  : shippingMethodPrices?.price_excl_tax)}
              />
            </Box>
          </AnimatedRow>
        )}

        {!inclTax &&
          prices?.applied_taxes?.map((tax) => (
            <AnimatedRow
              layout={animateLayout}
              className={classes.costsRow}
              key={`excl${tax?.label}`}
              sx={{ display: 'flex', justifyContent: 'space-between', typography: 'subtitle1' }}
            >
              <Box>{tax?.label}</Box>
              <Box className={classes.money} sx={{ whiteSpace: 'nowrap' }}>
                <Money {...tax?.amount} />
              </Box>
            </AnimatedRow>
          ))}

        <AnimatedRow layout key='divider'>
          <Divider className={classes.costsDivider} sx={{ margin: `1em 0` }} />
        </AnimatedRow>

        {prices?.grand_total && (
          <AnimatedRow
            layout={animateLayout}
            className={`${classes.costsRow} ${classes.costsGrandTotal}`}
            key='grand_total'
            sx={(theme) => ({
              display: 'flex',
              justifyContent: 'space-between',
              typography: 'subtitle1',
              color: theme.palette.primary.main,
            })}
          >
            <Box>
              <Trans id='Grand total' />
            </Box>
            <Box className={classes.money} sx={{ whiteSpace: 'nowrap' }}>
              <Money {...prices.grand_total} />
            </Box>
          </AnimatedRow>
        )}

        {inclTax &&
          prices?.applied_taxes?.map((tax) => (
            <AnimatedRow
              layout={animateLayout}
              className={`${classes.costsRow} ${classes.costsTax}`}
              key={`incl${tax?.label}`}
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                typography: 'body1',
                color: 'text.disabled',
                paddingTop: 0,
              }}
            >
              <Box>
                <Trans id='Including {0}' values={{ 0: tax?.label }} />
              </Box>
              <Box className={classes.money} sx={{ whiteSpace: 'nowrap' }}>
                <Money {...tax?.amount} />
              </Box>
            </AnimatedRow>
          ))}
      </AnimatePresence>
    </AnimatedRow>
  )
}
