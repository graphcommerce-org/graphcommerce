import {
  SectionContainer,
  iconInvoice,
  IconSvg,
  extendableComponent,
  useDateTimeFormat,
  breakpointVal,
} from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react'
import { Box, SxProps, Theme, Typography, lighten } from '@mui/material'
import { AddressMultiLine } from '../AddressMultiLine/AddressMultiLine'
import { TrackingLink } from '../TrackingLink/TrackingLink'
import { OrderDetailsFragment } from './OrderDetails.gql'

export type OrderDetailsProps = Partial<OrderDetailsFragment> & {
  sx?: SxProps<Theme>
}

const componentName = 'OrderDetails' as const
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

  const dateFormatter = useDateTimeFormat({ year: 'numeric', month: 'long', day: 'numeric' })

  return (
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
          >
            <Typography>{number}</Typography>
          </SectionContainer>
        </Box>

        <Box className={classes.orderDetailRow}>
          <SectionContainer
            variantLeft='h5'
            labelLeft={<Trans id='Order date' />}
            className={classes.orderDetailTitle}
            sx={{ '& .SectionHeader-root': { marginTop: 0, paddingBottom: '4px' } }}
          >
            <Typography>{order_date && dateFormatter.format(new Date(order_date))}</Typography>
          </SectionContainer>
        </Box>

        <Box className={classes.orderDetailRow}>
          <SectionContainer
            variantLeft='h5'
            labelLeft={<Trans id='Shipping method' />}
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
            labelLeft={<Trans id='Payment method' />}
            className={classes.orderDetailTitle}
            sx={{ '& .SectionHeader-root': { marginTop: 0, paddingBottom: '4px' } }}
          >
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
            labelLeft={<Trans id='Shipping address' />}
            className={classes.orderDetailTitle}
            sx={{ '& .SectionHeader-root': { marginTop: 0, paddingBottom: '4px' } }}
          >
            <AddressMultiLine {...shipping_address} />
          </SectionContainer>
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
  )
}
