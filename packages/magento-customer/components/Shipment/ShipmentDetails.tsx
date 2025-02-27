import {
  breakpointVal,
  DateTimeFormat,
  extendableComponent,
  filterNonNullableKeys,
  SectionContainer,
} from '@graphcommerce/next-ui'
import { Trans } from '@lingui/macro'
import type { SxProps, Theme } from '@mui/material'
import { Box, lighten, Typography } from '@mui/material'
import { TrackingLink } from '../TrackingLink/TrackingLink'
import type { ShipmentFragment } from './Shipment.gql'

export type ShipmentDetailsProps = {
  shipment: ShipmentFragment
  sx?: SxProps<Theme>
}

const componentName = 'ShipmentDetails'
const parts = [
  'sectionContainer',
  'shipmentDetailTitle',
  'shipmentDetailContainer',
  'shipmentDetailRow',
] as const
const { classes } = extendableComponent(componentName, parts)

export function ShipmentDetails(props: ShipmentDetailsProps) {
  const { shipment, sx = [] } = props
  const { number, tracking } = shipment

  return (
    <SectionContainer
      labelLeft={<Trans>Shipment details</Trans>}
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
        className={classes.shipmentDetailContainer}
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
        <Box className={classes.shipmentDetailRow}>
          <SectionContainer
            variantLeft='h5'
            labelLeft={<Trans>Shipment number</Trans>}
            className={classes.shipmentDetailTitle}
            sx={{ '& .SectionHeader-root': { marginTop: 0, paddingBottom: '4px' } }}
          >
            <Typography>{number}</Typography>
          </SectionContainer>
        </Box>

        {tracking && tracking.length > 0 && (
          <Box className={classes.shipmentDetailRow}>
            <SectionContainer
              variantLeft='h5'
              labelLeft={<Trans>Tracking</Trans>}
              className={classes.shipmentDetailTitle}
              sx={{ '& .SectionHeader-root': { marginTop: 0, paddingBottom: '4px' } }}
            >
              {filterNonNullableKeys(tracking).map((track) => (
                <TrackingLink key={track.number} {...track} />
              ))}
            </SectionContainer>
          </Box>
        )}
      </Box>
    </SectionContainer>
  )
}
