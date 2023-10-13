import { Money } from '@graphcommerce/magento-store'
import {
  SectionContainer,
  iconInvoice,
  IconSvg,
  extendableComponent,
  useDateTimeFormat,
  breakpointVal,
} from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react'
import { Box, Divider, SxProps, Theme, Typography, lighten } from '@mui/material'
import { AddressMultiLine } from '../AddressMultiLine/AddressMultiLine'
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
  'orderDetailContainer',
  'orderDetailRow',
  'totalsContainer',
  'totalsRow',
  'totalsDivider',
  'totalsVat',
  'invoice',
] as const
const { classes } = extendableComponent(componentName, parts)

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
    carrier,
    sx = [],
  } = props

  const dateFormatter = useDateTimeFormat({ year: 'numeric', month: 'long', day: 'numeric' })

  return (
    <>
      <SectionContainer
        labelLeft={<Trans id='Order details' />}
        sx={[
          (theme) => ({
            padding: theme.spacings.sm,
            marginBottom: theme.spacings.md,
            background:
              theme.palette.mode === 'light'
                ? theme.palette.background.default
                : lighten(theme.palette.background.default, 0.15),
            ...breakpointVal(
              'borderRadius',
              theme.shape.borderRadius * 2,
              theme.shape.borderRadius * 3,
              theme.breakpoints.values,
            ),
            '& .SectionHeader-root': {
              mt: 0,
              mb: theme.spacings.xs,
            },
          }),
          ...(Array.isArray(sx) ? sx : [sx]),
        ]}
      >
        <Box
          className={classes.orderDetailContainer}
          sx={[
            (theme) => ({
              gridColumnGap: theme.spacings.xxl,
              gridRowGap: theme.spacings.md,
              display: `grid`,
              [theme.breakpoints.up('sm')]: {
                gridTemplateColumns: `1fr 1fr`,
                marginTop: theme.spacings.xxs,
              },
            }),
            ...(Array.isArray(sx) ? sx : [sx]),
          ]}
        >
          <Box className={classes.orderDetailRow}>
            <SectionContainer
              variantLeft='h5'
              labelLeft={<Trans id='Order number' />}
              className={classes.orderDetailTitle}
              sx={{ '& .SectionHeader-root': { marginTop: 0, paddingBottom: '4px' } }}
            />
            <Typography>{number}</Typography>
          </Box>

          <Box className={classes.orderDetailRow}>
            <SectionContainer
              variantLeft='h5'
              labelLeft={<Trans id='Order status' />}
              className={classes.orderDetailTitle}
              sx={{ '& .SectionHeader-root': { marginTop: 0, paddingBottom: '4px' } }}
            />
            <Typography>
              <Trans id='Ordered items' />:{' '}
              {order_date && dateFormatter.format(new Date(order_date))}
            </Typography>
          </Box>

          <Box className={classes.orderDetailRow}>
            <SectionContainer
              variantLeft='h5'
              labelLeft={<Trans id='Shipping method' />}
              className={classes.orderDetailTitle}
              sx={{ '& .SectionHeader-root': { marginTop: 0, paddingBottom: '4px' } }}
            />
            <Typography>{shipping_method ?? ''}</Typography>

            {shipments && shipments.length > 0 && (
              <>
                {shipments?.[0]?.tracking && shipments?.[0]?.tracking?.[0]?.title}
                {shipments?.[0]?.tracking?.[0] && (
                  <TrackingLink {...shipments?.[0].tracking?.[0]} sx={{ padding: '4px 0' }} />
                )}
              </>
            )}
          </Box>

          <Box className={classes.orderDetailRow}>
            <SectionContainer
              variantLeft='h5'
              labelLeft={<Trans id='Payment method' />}
              className={classes.orderDetailTitle}
              sx={{ '& .SectionHeader-root': { marginTop: 0, paddingBottom: '4px' } }}
            />
            {payment_methods && payment_methods.length < 1 && (
              <Typography>
                <Trans id='No payment information' />
              </Typography>
            )}

            {payment_methods && payment_methods[0] && (
              <>
                <Typography>{payment_methods[0].name}</Typography>
                {invoices && invoices?.length > 0 && (
                  <Box
                    className={classes.invoice}
                    sx={(theme) => ({
                      display: 'flex',
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                      color: theme.palette.primary.main,
                    })}
                  >
                    <IconSvg src={iconInvoice} size='small' />
                    {invoices?.[0]?.number}
                  </Box>
                )}
              </>
            )}
          </Box>

          <Box className={classes.orderDetailRow}>
            <SectionContainer
              variantLeft='h5'
              labelLeft={<Trans id='Shipping address' />}
              className={classes.orderDetailTitle}
              sx={{ '& .SectionHeader-root': { marginTop: 0, paddingBottom: '4px' } }}
            />
            <AddressMultiLine {...shipping_address} />
          </Box>

          <Box className={classes.orderDetailRow}>
            <SectionContainer
              variantLeft='h5'
              labelLeft={<Trans id='Billing address' />}
              className={classes.orderDetailTitle}
              sx={{ '& .SectionHeader-root': { marginTop: 0, paddingBottom: '4px' } }}
            >
              <AddressMultiLine {...billing_address} />
            </SectionContainer>
          </Box>
        </Box>
      </SectionContainer>

      <Box
        className={classes.totalsContainer}
        sx={(theme) => ({
          border: `1px solid ${theme.palette.divider}`,
          marginBottom: theme.spacings.md,
          p: theme.spacings.sm,
          ...breakpointVal(
            'borderRadius',
            theme.shape.borderRadius * 2,
            theme.shape.borderRadius * 3,
            theme.breakpoints.values,
          ),
        })}
      >
        <Box
          className={classes.totalsRow}
          sx={{ display: 'flex', justifyContent: 'space-between' }}
        >
          <Typography>
            <Trans id='Products' />
          </Typography>
          <Money {...total?.subtotal} />
        </Box>

        {total?.discounts?.map((discount) => (
          <Box
            className={classes.totalsRow}
            sx={{ display: 'flex', justifyContent: 'space-between' }}
            key={`discount-${discount?.label}`}
          >
            <Typography>{discount?.label}</Typography>

            {discount?.amount && (
              <Money {...discount.amount} value={(discount.amount.value ?? 0) * -1} />
            )}
          </Box>
        ))}
        <Box
          className={classes.totalsRow}
          sx={{ display: 'flex', justifyContent: 'space-between' }}
        >
          <Typography>
            <Trans id='Shipping ({0} {1})' values={{ 0: carrier }} />
          </Typography>
          <Money {...total?.total_shipping} />
        </Box>

        <Divider sx={(theme) => ({ my: theme.spacings.xxs })} />

        <Box
          className={classes.totalsRow}
          sx={(theme) => ({
            display: 'flex',
            justifyContent: 'space-between',
            color: theme.palette.primary.main,
          })}
        >
          <Typography>
            <Trans id='Grand total' />
          </Typography>
          <Money {...total?.grand_total} />
        </Box>
        {total?.taxes?.map((tax) => (
          <Box
            className={classes.totalsVat}
            sx={(theme) => ({
              display: 'flex',
              justifyContent: 'space-between',
              color: theme.palette.text.disabled,
            })}
          >
            <Typography>
              <Trans id='Including {0}' values={{ 0: tax?.title }} />
            </Typography>
            <Money {...tax?.amount} />
          </Box>
        ))}
      </Box>
    </>
  )
}
