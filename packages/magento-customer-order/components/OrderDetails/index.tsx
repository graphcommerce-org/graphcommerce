import { useQuery } from '@apollo/client'
import {
  StoreConfigDocument,
  Money,
  useFindCountry,
  useFindRegion,
} from '@graphcommerce/magento-store'
import {
  SectionContainer,
  responsiveVal,
  iconInvoice,
  SvgIcon,
  makeStyles,
} from '@graphcommerce/next-ui'
import { Trans } from '@lingui/macro'
import { Box, experimental_sx, Skeleton, styled, Theme } from '@mui/material'
import clsx from 'clsx'
import React from 'react'
import TrackingLink from '../TrackingLink'
import { OrderDetailsFragment } from './OrderDetails.gql'

const useStyles = makeStyles({ name: 'OrderDetails' })((theme) => ({
  sectionContainer: {},
  orderDetailsInnerContainer: {
    display: 'grid',
    gridColumnGap: theme.spacings.sm,
    gridRowGap: theme.spacings.lg,
    padding: `${theme.spacings.md} 0`,
    borderBottom: `1px solid ${theme.palette.divider}`,
    [theme.breakpoints.up('sm')]: {
      gridColumnGap: theme.spacings.xxl,
      gridRowGap: theme.spacings.md,
      gridTemplateColumns: 'repeat(2, 1fr)',
    },
  },
  orderDetailTitle: {},
  totalsContainer: {
    padding: `${theme.spacings.xxs} 0`,
  },
  totalsRow: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '4px 0',
  },
  totalsDivider: {
    height: 1,
    width: '100%',
    background: theme.palette.divider,
    margin: `${theme.spacings.xxs} 0`,
  },
  totalsVat: {
    fontWeight: 'bold',
    padding: `${theme.spacings.xxs} 0`,
  },
  iconContainer: {
    marginLeft: '-6px',
    '& > div': {
      padding: '4px 0',
    },
  },
  invoice: {
    display: 'flex',
    alignItems: 'center',
    color: theme.palette.primary.main,
  },
}))

export type OrderDetailsProps = Partial<OrderDetailsFragment> & {
  loading?: boolean
}

const OrderDetailTitle = styled('span')(
  experimental_sx<Theme>((theme) => ({
    borderBottom: `1px solid ${theme.palette.divider}`,
    fontWeight: 'bold',
    display: 'block',
    width: '100%',
    paddingBottom: responsiveVal(2, 8),
    marginBottom: theme.spacings.xs,
  })),
)

export default function OrderDetails(props: OrderDetailsProps) {
  const {
    number,
    order_date,
    shipping_address,
    billing_address,
    payment_methods,
    shipments,
    shipping_method,
    total,
    invoices,
    loading,
    carrier,
  } = props
  const { classes } = useStyles()

  const { data: config } = useQuery(StoreConfigDocument)
  const locale = config?.storeConfig?.locale?.replace('_', '-')

  const dateFormatter = new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  const billingAddressCountry = useFindCountry(billing_address?.country_code)
  const billingAddressRegion = useFindRegion(
    billing_address?.country_code,
    Number(billing_address?.region_id) ?? undefined,
  )

  const shippingAddressCountry = useFindCountry(shipping_address?.country_code)
  const shippingAddressRegion = useFindRegion(
    shipping_address?.country_code,
    Number(shipping_address?.region_id) ?? undefined,
  )

  if (loading) {
    return (
      <SectionContainer
        labelLeft='Order details'
        sx={(theme) => ({
          '& .SectionHeader': { marginTop: theme.spacings.sm, marginBottom: theme.spacings.sm },
        })}
        borderBottom
      >
        <div className={classes.orderDetailsInnerContainer}>
          <div>
            <Skeleton height={100} />
          </div>
          <div>
            <Skeleton height={100} />
          </div>
          <div>
            <Skeleton height={100} />
          </div>
          <div>
            <Skeleton height={100} />
          </div>
          <div>
            <Skeleton height={100} />
          </div>
          <div>
            <Skeleton height={100} />
          </div>
        </div>

        <div className={classes.totalsContainer}>
          <div className={classes.totalsRow}>
            <div>Products</div>
            <div>
              <Skeleton width={72} />
            </div>
          </div>

          {total?.discounts?.map((discount) => (
            <div key={`discount-${discount?.label}`} className={classes.totalsRow}>
              <div>{discount?.label}</div>
              <div>
                <Skeleton width={72} />
              </div>
            </div>
          ))}

          <div className={classes.totalsRow}>
            <div>Shipping</div>
            <div>
              <Skeleton width={72} />
            </div>
          </div>

          <div className={classes.totalsDivider} />

          <div className={clsx(classes.totalsRow, classes.totalsVat)}>
            <div>Total (incl. VAT)</div>
            <div>
              <Skeleton width={72} />
            </div>
          </div>
        </div>
      </SectionContainer>
    )
  }

  return (
    <SectionContainer
      labelLeft='Order details'
      borderBottom
      sx={(theme) => ({
        '& .SectionHeader': { marginTop: theme.spacings.sm, marginBottom: theme.spacings.sm },
      })}
    >
      <div className={classes.orderDetailsInnerContainer}>
        <div>
          <OrderDetailTitle>Order number</OrderDetailTitle>
          <div>{number}</div>
        </div>

        <div>
          <OrderDetailTitle>Order status</OrderDetailTitle>
          <div>
            Ordered: {order_date && dateFormatter.format(new Date(order_date))}
            {/* Shipped */}
          </div>
        </div>

        <div>
          <OrderDetailTitle>Shipping method</OrderDetailTitle>
          <div>
            <div>{shipping_method ?? ''}</div>

            {shipments && shipments.length > 0 && (
              <>
                <div>{shipments?.[0]?.tracking && shipments?.[0]?.tracking?.[0]?.title}</div>
                {shipments?.[0]?.tracking?.[0] && (
                  <div className={classes.iconContainer}>
                    <TrackingLink {...shipments?.[0].tracking?.[0]} />
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        <div>
          <OrderDetailTitle>Payment method</OrderDetailTitle>
          <div>
            {payment_methods && payment_methods.length < 1 && (
              <div>
                <i>No payment information</i>
              </div>
            )}

            {payment_methods && payment_methods[0] && (
              <>
                <div>{payment_methods[0].name}</div>

                {invoices && invoices?.length > 0 && (
                  <div className={classes.iconContainer}>
                    <div className={classes.invoice}>
                      <SvgIcon src={iconInvoice} size='small' />
                      {invoices?.[0]?.number}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        <div>
          <OrderDetailTitle>Shipping address</OrderDetailTitle>
          <div>
            <div>
              {shipping_address?.firstname} {shipping_address?.lastname}
            </div>
            <div>{shipping_address?.street}</div>
            <div>
              {shipping_address?.postcode} {shipping_address?.city}
            </div>
            <div>
              {shippingAddressRegion?.name}, {shippingAddressCountry?.full_name_locale}
            </div>
          </div>
        </div>

        <div>
          <OrderDetailTitle>Billing address</OrderDetailTitle>
          <div>
            <div>
              {billing_address?.firstname} {billing_address?.lastname}
            </div>
            <div>{billing_address?.street}</div>
            <div>
              {billing_address?.postcode} {billing_address?.city}
            </div>
            <div>
              {billingAddressRegion?.name}, {billingAddressCountry?.full_name_locale}
            </div>
          </div>
        </div>
      </div>

      <div className={classes.totalsContainer}>
        <div className={classes.totalsRow}>
          <div>
            <Trans>Products</Trans>
          </div>
          <div>
            <Money {...total?.subtotal} />
          </div>
        </div>

        {total?.discounts?.map((discount) => (
          <div key={`discount-${discount?.label}`} className={classes.totalsRow}>
            <div>{discount?.label}</div>
            <div>
              {discount?.amount && (
                <Money {...discount.amount} value={(discount.amount.value ?? 0) * -1} />
              )}
            </div>
          </div>
        ))}

        <div className={classes.totalsRow}>
          <div>
            <Trans>Shipping</Trans>
          </div>
          <div>
            <Money {...total?.total_shipping} />
          </div>
          <div>{carrier}</div>
        </div>

        <div className={classes.totalsDivider} />

        <div className={clsx(classes.totalsRow, classes.totalsVat)}>
          <div>
            <Trans>Grand Total</Trans>
          </div>
          <div>
            <Money {...total?.grand_total} />
          </div>
        </div>
      </div>
    </SectionContainer>
  )
}
