import {
  ActionCardLayout,
  breakpointVal,
  extendableComponent,
  nonNullable,
  SectionContainer,
  sxx,
} from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react/macro'
import type { SxProps, Theme } from '@mui/material'
import { Box } from '@mui/material'
import type { ShipmentFragment } from './Shipment.gql'
import { ShipmentItem } from './ShipmentItem'

export type ShipmentItemsProps = {
  shipment: ShipmentFragment
  sx?: SxProps<Theme>
  layout?: 'list' | 'grid'
  size?: 'small' | 'medium' | 'large'
}

const componentName = 'ShipmentItems'
const parts = ['root', 'items', 'actionCard'] as const
const { classes } = extendableComponent(componentName, parts)

export function ShipmentItems(props: ShipmentItemsProps) {
  const { shipment, sx = [], layout = 'list', size } = props

  const items = (shipment.items ?? []).filter(nonNullable)
  if (!items.length) return null

  return (
    <Box
      className={classes.root}
      sx={sxx(
        (theme) => ({
          my: theme.spacings.md,
          padding: `${theme.spacings.sm} ${theme.spacings.sm}`,
          border: `1px ${theme.vars.palette.divider} solid`,
          ...breakpointVal(
            'borderRadius',
            theme.shape.borderRadius * 2,
            theme.shape.borderRadius * 3,
            theme.breakpoints.values,
          ),
        }),
        sx,
      )}
    >
      <SectionContainer
        sx={{ '& .SectionHeader-root': { mt: 0 } }}
        labelLeft={<Trans>Shipped items</Trans>}
        variantLeft='h6'
        className={classes.items}
      >
        <ActionCardLayout
          sx={(theme) => ({
            marginBottom: theme.spacings.md,
            '&.layoutStack': {
              gap: 0,
            },
          })}
          className={classes.actionCard}
          layout={layout}
        >
          {items.map((item) => (
            <ShipmentItem key={item.id} item={item} size={size} layout={layout} variant='default' />
          ))}
        </ActionCardLayout>
      </SectionContainer>
    </Box>
  )
}
