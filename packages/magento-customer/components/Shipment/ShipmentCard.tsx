import { Money } from '@graphcommerce/magento-store'
import {
  breakpointVal,
  filterNonNullableKeys,
  iconChevronRight,
  IconSvg,
  NextLink,
  sxx,
} from '@graphcommerce/next-ui'
import { Trans } from '@lingui/macro'
import type { SxProps, Theme } from '@mui/material'
import { Box, lighten } from '@mui/material'
import { TrackingLink } from '../TrackingLink/TrackingLink'
import type { ShipmentCardFragment } from './ShipmentCard.gql'

export type ShipmentCardProps = {
  orderNumber: string
  shipment: ShipmentCardFragment
  sx?: SxProps<Theme>
}

export function ShipmentCard(props: ShipmentCardProps) {
  const { orderNumber, shipment, sx = [] } = props
  const { number } = shipment

  return (
    <Box
      component={NextLink}
      href={`/account/orders/shipment?orderNumber=${orderNumber}&shipmentNumber=${number}`}
      sx={sxx(
        (theme) => ({
          textDecoration: 'none',
          color: 'text.primary',
          px: theme.spacings.xxs,
          py: theme.spacings.xxs,
          gap: theme.spacings.sm,
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
          // '&:hover': {
          //   backgroundColor: theme.palette.action.hover,
          // },
          display: 'grid',
          gridTemplate: `
            "number action" / 1fr auto
          `,
          rowGap: 0.5,
          columnGap: 1,
        }),
        sx,
      )}
    >
      <Box sx={{ gridArea: 'number', typography: 'body1' }}>
        <Trans>Shipment #{number}</Trans>
      </Box>

      <IconSvg
        src={iconChevronRight}
        size='medium'
        sx={{ gridArea: 'action', alignSelf: 'center' }}
      />
    </Box>
  )
}
