import {
  DateTimeFormat,
  IconSvg,
  SectionContainer,
  breakpointVal,
  extendableComponent,
  iconInvoice,
} from '@graphcommerce/next-ui'
import { Trans } from '@lingui/macro'
import type { SxProps, Theme } from '@mui/material'
import { Box, Typography, lighten } from '@mui/material'
import { AddressMultiLine } from '../AddressMultiLine/AddressMultiLine'
import { TrackingLink } from '../TrackingLink/TrackingLink'
import type { OrderDetailsFragment } from './OrderDetails.gql'

export type OrderDetailsProps = Partial<OrderDetailsFragment> & {
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
  const {
    number,
    order_date,
    shipping_address,
    billing_address,
    payment_methods,
    shipments,
    shipping_method,
    invoices,
    sx = [],
  } = props

  return (
    <SectionContainer
      labelLeft={<Trans>Order details</Trans>}
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
            display: 'grid',
            [theme.breakpoints.up('sm')]: {
              gridTemplateColumns: '1fr 1fr',
              marginTop: theme.spacings.xxs,
            },
          }),
          ...(Array.isArray(sx) ? sx : [sx]),
        ]}
      >
        <Box className={classes.orderDetailRow}>
          <SectionContainer
            variantLeft='h5'
            labelLeft={<Trans>Order number</Trans>}
            className={classes.orderDetailTitle}
            sx={{ '& .SectionHeader-root': { marginTop: 0, paddingBottom: '4px' } }}
          >
            <Typography>{number}</Typography>
          </SectionContainer>
        </Box>

        <Box className={classes.orderDetailRow}>
          <SectionContainer
            variantLeft='h5'
            labelLeft={<Trans>Order date</Trans>}
            className={classes.orderDetailTitle}
            sx={{ '& .SectionHeader-root': { marginTop: 0, paddingBottom: '4px' } }}
          >
            <DateTimeFormat date={order_date} />
          </SectionContainer>
        </Box>

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
              <>
                <Typography>{payment_methods[0].name}</Typography>
                {invoices && invoices?.length > 0 && (
                  <Box
                    className={classes.invoice}
                    sx={{
                      display: 'flex',
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                    }}
                  >
                    <IconSvg src={iconInvoice} size='small' />
                    {invoices?.[0]?.number}
                  </Box>
                )}
              </>
            )}
          </SectionContainer>
        </Box>

        <Box className={classes.orderDetailRow}>
          <SectionContainer
            variantLeft='h5'
            labelLeft={<Trans>Shipping address</Trans>}
            className={classes.orderDetailTitle}
            sx={{ '& .SectionHeader-root': { marginTop: 0, paddingBottom: '4px' } }}
          >
            <AddressMultiLine {...shipping_address} />
          </SectionContainer>
        </Box>

        <Box className={classes.orderDetailRow}>
          <SectionContainer
            variantLeft='h5'
            labelLeft={<Trans>Billing address</Trans>}
            className={classes.orderDetailTitle}
            sx={{ '& .SectionHeader-root': { marginTop: 0, paddingBottom: '4px' } }}
          >
            <AddressMultiLine {...billing_address} />
          </SectionContainer>
        </Box>
      </Box>
    </SectionContainer>
  )
}
