import { useQuery } from '@apollo/client'
import { makeStyles, Theme } from '@material-ui/core'
import { Description } from '@material-ui/icons'
import { Skeleton } from '@material-ui/lab'
import { CountryRegionsQuery } from '@reachdigital/magento-cart/countries/CountryRegions.gql'
import Money from '@reachdigital/magento-store/Money'
import { StoreConfigDocument } from '@reachdigital/magento-store/StoreConfig.gql'
import SectionContainer from '@reachdigital/next-ui/SectionContainer'
import responsiveVal from '@reachdigital/next-ui/Styles/responsiveVal'
import clsx from 'clsx'
import React from 'react'
import TrackingLink from '../TrackingLink'
import { OrderDetailsFragment } from './OrderDetails.gql'

const useStyles = makeStyles(
  (theme: Theme) => ({
    sectionContainer: {
      marginTop: theme.spacings.sm,
      marginBottom: theme.spacings.sm,
    },
    orderDetailsInnerContainer: {
      display: 'grid',
      gridColumnGap: theme.spacings.sm,
      gridRowGap: theme.spacings.lg,
      padding: `${theme.spacings.md} 0`,
      borderBottom: `1px solid ${theme.palette.divider}`,
      [theme.breakpoints.up('sm')]: {
        gridColumnGap: theme.spacings.xl,
        gridRowGap: theme.spacings.md,
        gridTemplateColumns: 'repeat(2, 1fr)',
      },
    },
    orderDetailTitle: {
      borderBottom: `1px solid ${theme.palette.divider}`,
      fontWeight: 'bold',
      display: 'block',
      width: '100%',
      paddingBottom: responsiveVal(2, 8),
      marginBottom: theme.spacings.xs,
    },
    totalsContainer: {
      // borderBottom: `1px solid ${theme.palette.divider}`,
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
  }),
  { name: 'OrderDetails' },
)

export type OrderDetailsProps = Partial<OrderDetailsFragment> & {
  loading?: boolean
} & CountryRegionsQuery

function countryCodeToName(countries: CountryRegionsQuery['countries'], code: string): string {
  const country = countries?.filter((c) => c?.two_letter_abbreviation === code)[0]

  if (!country) return code

  return country.full_name_locale ?? code
}

export default function OrderDetails(props: OrderDetailsProps) {
  const {
    number,
    order_date,
    shipping_address,
    billing_address,
    payment_methods,
    shipments,
    total,
    invoices,
    countries,
    loading,
  } = props
  const classes = useStyles()

  const { data: config } = useQuery(StoreConfigDocument)
  const locale = config?.storeConfig?.locale?.replace('_', '-')

  const dateFormatter = new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  if (loading) {
    return (
      <SectionContainer label='Order details' className={classes.sectionContainer} borderBottom>
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
    <SectionContainer label='Order details' className={classes.sectionContainer} borderBottom>
      <div className={classes.orderDetailsInnerContainer}>
        <div>
          <span className={classes.orderDetailTitle}>Order number</span>
          <div>{number}</div>
        </div>

        <div>
          <span className={classes.orderDetailTitle}>Order status</span>
          <div>
            Ordered: {order_date && dateFormatter.format(new Date(order_date))}
            {/* Shipped */}
          </div>
        </div>

        <div>
          <span className={classes.orderDetailTitle}>Shipping method</span>
          <div>
            {!shipments?.length && (
              <div>
                <i>No shipments yet</i>
              </div>
            )}

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
          <span className={classes.orderDetailTitle}>Payment method</span>
          <div>
            {!payment_methods?.[0]?.additional_data?.length && (
              <div>
                <i>No payment information</i>
              </div>
            )}

            {payment_methods && payment_methods?.[0]?.additional_data?.[0] && (
              <>
                <div>{payment_methods?.[0]?.additional_data?.[0]?.name}</div>

                {invoices?.length > 0 && (
                  <div className={classes.iconContainer}>
                    <div className={classes.invoice}>
                      <Description color='primary' />
                      {invoices?.[0]?.number}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        <div>
          <span className={classes.orderDetailTitle}>Shipping address</span>
          <div>
            <div>
              {shipping_address?.firstname} {shipping_address?.lastname}
            </div>
            <div>{shipping_address?.street}</div>
            <div>
              {shipping_address?.postcode} {shipping_address?.city}
            </div>
            <div>{countryCodeToName(countries, shipping_address?.country_code ?? '')}</div>
          </div>
        </div>

        <div>
          <span className={classes.orderDetailTitle}>Billing address</span>
          <div>
            <div>
              {billing_address?.firstname} {billing_address?.lastname}
            </div>
            <div>{billing_address?.street}</div>
            <div>
              {billing_address?.postcode} {billing_address?.city}
            </div>
            <div>{countryCodeToName(countries, billing_address?.country_code ?? '')}</div>
          </div>
        </div>
      </div>

      <div className={classes.totalsContainer}>
        <div className={classes.totalsRow}>
          <div>Products</div>
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
          <div>Shipping</div>
          <div>
            <Money {...total?.total_shipping} />
          </div>
        </div>

        <div className={classes.totalsDivider} />

        <div className={clsx(classes.totalsRow, classes.totalsVat)}>
          <div>Total (incl. VAT)</div>
          <div>
            <Money {...total?.grand_total} />
          </div>
        </div>
      </div>
    </SectionContainer>
  )
}
