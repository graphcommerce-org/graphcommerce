import { Money, useFindCountry, useFindRegion } from '@graphcommerce/magento-store'
import {
  SectionContainer,
  iconInvoice,
  IconSvg,
  extendableComponent,
  useDateTimeFormat,
} from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react'
import { Skeleton, styled, SxProps, Theme } from '@mui/material'
import { TrackingLink } from '../TrackingLink/TrackingLink'
import { OrderDetailsFragment } from './OrderDetails.gql'

export type OrderDetailsProps = Partial<OrderDetailsFragment> & {
  loading?: boolean
  sx?: SxProps<Theme>
}

const componentName = 'OrderDetails' as const
const parts = [
  'sectionContainer',
  'orderDetailTitle',
  'orderDetailsInnerContainer',
  'totalsContainer',
  'totalsRow',
  'totalsDivider',
  'totalsVat',
  'iconContainer',
  'invoice',
] as const
const { classes } = extendableComponent(componentName, parts)

const OrderDetailTitle = styled('span', { target: classes.orderDetailTitle })(({ theme }) =>
  theme.unstable_sx({
    borderBottom: `1px solid ${theme.palette.divider}`,
    fontWeight: 'bold',
    display: 'block',
    width: '100%',
    pb: theme.responsiveTemplate`${[2, 8]}px`,
    mb: theme.spacings.xs,
  }),
)

const OrderDetailsInnerContainer = styled('span', { target: classes.orderDetailsInnerContainer })(
  ({ theme }) =>
    theme.unstable_sx({
      display: 'grid',
      gridColumnGap: theme.spacings.sm,
      gridRowGap: theme.spacings.lg,
      py: theme.spacings.md,
      px: 0,
      borderBottom: `1px solid ${theme.palette.divider}`,
      [theme.breakpoints.up('sm')]: {
        gridColumnGap: theme.spacings.xxl,
        gridRowGap: theme.spacings.md,
        gridTemplateColumns: 'repeat(2, 1fr)',
      },
    }),
)

const TotalsContainer = styled('span', { target: classes.totalsContainer })(({ theme }) =>
  theme.unstable_sx({
    py: theme.spacings.xxs,
    px: 0,
  }),
)

const TotalsRow = styled('span', { target: classes.totalsRow })(({ theme }) =>
  theme.unstable_sx({
    display: 'flex',
    justifyContent: 'space-between',
    padding: '4px 0',
  }),
)

const TotalsDivider = styled('span', { target: classes.totalsDivider })(({ theme }) =>
  theme.unstable_sx({
    height: 1,
    width: '100%',
    background: theme.palette.divider,
    my: theme.spacings.xxs,
    mx: 0,
  }),
)

const TotalsVat = styled(TotalsRow, { target: classes.totalsVat })(({ theme }) =>
  theme.unstable_sx({
    fontWeight: 'bold',
    py: theme.spacings.xxs,
    px: 0,
  }),
)
const IconContainer = styled(TotalsRow, { target: classes.iconContainer })(({ theme }) =>
  theme.unstable_sx({
    marginLeft: '-6px',
    '& > div': {
      padding: '4px 0',
    },
  }),
)

const Invoice = styled(TotalsRow, { target: classes.invoice })(({ theme }) =>
  theme.unstable_sx({
    display: 'flex',
    alignItems: 'center',
    color: 'primary.main',
  }),
)

export function OrderDetails(props: OrderDetailsProps) {
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
    sx = [],
  } = props

  const dateFormatter = useDateTimeFormat({ year: 'numeric', month: 'long', day: 'numeric' })

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
        sx={[
          (theme) => ({
            '& .SectionHeader-root': {
              marginTop: theme.spacings.sm,
              marginBottom: theme.spacings.sm,
            },
          }),
          ...(Array.isArray(sx) ? sx : [sx]),
        ]}
        borderBottom
      >
        <OrderDetailsInnerContainer>
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
        </OrderDetailsInnerContainer>

        <TotalsContainer>
          <TotalsRow>
            <div>Products</div>
            <div>
              <Skeleton width={72} />
            </div>
          </TotalsRow>

          {total?.discounts?.map((discount) => (
            <TotalsRow key={`discount-${discount?.label}`}>
              <div>{discount?.label}</div>
              <div>
                <Skeleton width={72} />
              </div>
            </TotalsRow>
          ))}

          <TotalsRow>
            <div>Shipping</div>
            <div>
              <Skeleton width={72} />
            </div>
          </TotalsRow>

          <TotalsDivider />

          <TotalsVat>
            <div>Total (incl. VAT)</div>
            <div>
              <Skeleton width={72} />
            </div>
          </TotalsVat>
        </TotalsContainer>
      </SectionContainer>
    )
  }

  return (
    <SectionContainer
      labelLeft='Order details'
      borderBottom
      sx={[
        (theme) => ({
          '& .SectionHeader-root': {
            marginTop: theme.spacings.sm,
            marginBottom: theme.spacings.sm,
          },
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <OrderDetailsInnerContainer>
        <div>
          <OrderDetailTitle>
            <Trans id='Order number' />
          </OrderDetailTitle>
          <div>{number}</div>
        </div>

        <div>
          <OrderDetailTitle>
            <Trans id='Order status' />
          </OrderDetailTitle>
          <div>
            Ordered: {order_date && dateFormatter.format(new Date(order_date))}
            {/* Shipped */}
          </div>
        </div>

        <div>
          <OrderDetailTitle>
            <Trans id='Shipping method' />
          </OrderDetailTitle>
          <div>
            <div>{shipping_method ?? ''}</div>

            {shipments && shipments.length > 0 && (
              <>
                <div>{shipments?.[0]?.tracking && shipments?.[0]?.tracking?.[0]?.title}</div>
                {shipments?.[0]?.tracking?.[0] && (
                  <IconContainer>
                    <TrackingLink {...shipments?.[0].tracking?.[0]} />
                  </IconContainer>
                )}
              </>
            )}
          </div>
        </div>

        <div>
          <OrderDetailTitle>
            <Trans id='Payment method' />
          </OrderDetailTitle>
          <div>
            {payment_methods && payment_methods.length < 1 && (
              <div>
                <i>
                  <Trans id='No payment information' />
                </i>
              </div>
            )}

            {payment_methods && payment_methods[0] && (
              <>
                <div>{payment_methods[0].name}</div>

                {invoices && invoices?.length > 0 && (
                  <IconContainer>
                    <Invoice>
                      <IconSvg src={iconInvoice} size='small' />
                      {invoices?.[0]?.number}
                    </Invoice>
                  </IconContainer>
                )}
              </>
            )}
          </div>
        </div>

        <div>
          <OrderDetailTitle>
            <Trans id='Shipping address' />
          </OrderDetailTitle>
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
          <OrderDetailTitle>
            <Trans id='Billing address' />
          </OrderDetailTitle>
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
      </OrderDetailsInnerContainer>

      <TotalsContainer>
        <TotalsRow>
          <div>
            <Trans id='Products' />
          </div>
          <div>
            <Money {...total?.subtotal} />
          </div>
        </TotalsRow>

        {total?.discounts?.map((discount) => (
          <TotalsRow key={`discount-${discount?.label}`}>
            <div>{discount?.label}</div>
            <div>
              {discount?.amount && (
                <Money {...discount.amount} value={(discount.amount.value ?? 0) * -1} />
              )}
            </div>
          </TotalsRow>
        ))}

        <TotalsRow>
          <div>
            <Trans id='Shipping' />
          </div>
          <div>
            <Money {...total?.total_shipping} />
          </div>
          <div>{carrier}</div>
        </TotalsRow>

        <TotalsDivider />

        <TotalsVat>
          <div>
            <Trans id='Grand total' />
          </div>
          <div>
            <Money {...total?.grand_total} />
          </div>
        </TotalsVat>
      </TotalsContainer>
    </SectionContainer>
  )
}
