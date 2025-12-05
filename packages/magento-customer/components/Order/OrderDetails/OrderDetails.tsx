import {
  breakpointVal,
  DateTimeFormat,
  extendableComponent,
  SectionContainer,
  sxx,
} from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react/macro'
import type { SxProps, Theme } from '@mui/material'
import { Box, Typography } from '@mui/material'
import { AddressMultiLine } from '../../AddressMultiLine/AddressMultiLine'
import { TrackingLink } from '../../TrackingLink/TrackingLink'
import type { OrderDetailsFragment } from './OrderDetails.gql'

export type OrderDetailsProps = {
  order: OrderDetailsFragment
  sx?: SxProps<Theme>
}

const componentName = 'OrderDetails'
const parts = [
  'sectionContainer',
  'orderDetailTitle',
  'orderDetailContainer',
  'orderDetailRow',
  'invoice',
] as const
const { classes } = extendableComponent(componentName, parts)

export function OrderDetails(props: OrderDetailsProps) {
  const { order, sx = [] } = props
  const {
    number,
    order_date,
    shipping_address,
    billing_address,
    payment_methods,
    shipments,
    shipping_method,
    invoices,
  } = order

  return (
    <Box
      sx={sxx(
        (theme) => ({
          margin: `${theme.spacings.sm} 0`,
          '& > div:last-of-type': {
            borderRadius: '0',
            ...breakpointVal(
              'borderBottomLeftRadius',
              theme.shape.borderRadius * 2,
              theme.shape.borderRadius * 3,
              theme.breakpoints.values,
            ),
            ...breakpointVal(
              'borderBottomRightRadius',
              theme.shape.borderRadius * 2,
              theme.shape.borderRadius * 3,
              theme.breakpoints.values,
            ),
          },
        }),
        sx,
      )}
    >
      <Box
        className={classes.orderDetailContainer}
        sx={(theme) => ({
          ...breakpointVal(
            'borderTopLeftRadius',
            theme.shape.borderRadius * 2,
            theme.shape.borderRadius * 3,
            theme.breakpoints.values,
          ),
          ...breakpointVal(
            'borderTopRightRadius',
            theme.shape.borderRadius * 2,
            theme.shape.borderRadius * 3,
            theme.breakpoints.values,
          ),
          background: theme.lighten(theme.vars.palette.background.default, 0.15),
          padding: theme.spacings.sm,
          gridColumnGap: theme.spacings.xxl,
          gridRowGap: theme.spacings.sm,
          display: 'grid',
          [theme.breakpoints.up('sm')]: {
            gridTemplateColumns: '1fr 1fr',
            marginTop: theme.spacings.xxs,
          },
          ...theme.applyStyles('light', {
            background: theme.vars.palette.background.default,
          }),
        })}
      >
        <Box className={classes.orderDetailRow}>
          <SectionContainer
            variantLeft='h5'
            labelLeft={<Trans>Order number</Trans>}
            className={classes.orderDetailTitle}
            sx={{ '& .SectionHeader-root': { marginTop: 0, paddingBottom: '8px' } }}
          >
            <Typography>{number}</Typography>
          </SectionContainer>
        </Box>
        <Box className={classes.orderDetailRow}>
          <SectionContainer
            variantLeft='h5'
            labelLeft={<Trans>Order date</Trans>}
            className={classes.orderDetailTitle}
            sx={{ '& .SectionHeader-root': { marginTop: 0, paddingBottom: '8px' } }}
          >
            <DateTimeFormat date={order_date} />
          </SectionContainer>
        </Box>
        {shipping_method && (
          <Box className={classes.orderDetailRow}>
            <SectionContainer
              variantLeft='h5'
              labelLeft={<Trans>Shipping method</Trans>}
              className={classes.orderDetailTitle}
              sx={{ '& .SectionHeader-root': { marginTop: 0, paddingBottom: '4px' } }}
            >
              <Typography>{shipping_method ?? ''}</Typography>
              {shipments && shipments.length > 0 && (
                <>
                  {shipments?.[0]?.tracking && shipments?.[0]?.tracking?.[0]?.title}
                  {shipments?.[0]?.tracking?.[0] && (
                    <TrackingLink {...shipments?.[0].tracking?.[0]} sx={{ padding: '4px 0' }} />
                  )}
                </>
              )}
            </SectionContainer>
          </Box>
        )}

        <Box className={classes.orderDetailRow}>
          <SectionContainer
            variantLeft='h5'
            labelLeft={<Trans>Payment method</Trans>}
            className={classes.orderDetailTitle}
            sx={{ '& .SectionHeader-root': { marginTop: 0, paddingBottom: '4px' } }}
          >
            {payment_methods && payment_methods.length < 1 && (
              <Typography>
                <Trans>No payment information</Trans>
              </Typography>
            )}

            {payment_methods && payment_methods[0] && (
              <Typography>{payment_methods[0].name}</Typography>
            )}
          </SectionContainer>
        </Box>

        {shipping_address && (
          <Box className={classes.orderDetailRow}>
            <SectionContainer
              variantLeft='h5'
              labelLeft={<Trans>Shipping address</Trans>}
              className={classes.orderDetailTitle}
              sx={{ '& .SectionHeader-root': { marginTop: 0, paddingBottom: '4px' } }}
            >
              <AddressMultiLine
                {...shipping_address}
                region={{
                  region: shipping_address.region,
                  region_id: shipping_address.region_id ? Number(shipping_address.region_id) : null,
                }}
                // custom_attributesV2={[]}
              />
            </SectionContainer>
          </Box>
        )}
        <Box className={classes.orderDetailRow}>
          <SectionContainer
            variantLeft='h5'
            labelLeft={<Trans>Billing address</Trans>}
            className={classes.orderDetailTitle}
            sx={{ '& .SectionHeader-root': { marginTop: 0, paddingBottom: '4px' } }}
          >
            {billing_address && (
              <AddressMultiLine
                {...billing_address}
                region={{
                  region: billing_address.region,
                  region_id: billing_address.region_id ? Number(billing_address.region_id) : null,
                }}
                // custom_attributesV2={[]}
              />
            )}
          </SectionContainer>
        </Box>
      </Box>
    </Box>
  )
}
