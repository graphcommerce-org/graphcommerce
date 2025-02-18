import { extendableComponent, SectionContainer } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/macro'
import type { SxProps, Theme } from '@mui/material'
import { Box } from '@mui/material'
import type { ShipmentFragment } from './Shipment.gql'
import { ShipmentItem } from './ShipmentItem'

export type ShipmentItemsProps = {
  shipment: ShipmentFragment
  sx?: SxProps<Theme>
}

const componentName = 'ShipmentItems'
const parts = ['root', 'items'] as const
const { classes } = extendableComponent(componentName, parts)

export function ShipmentItems(props: ShipmentItemsProps) {
  const { shipment, sx = [] } = props
  const { items } = shipment

  if (!items?.length) return null

  return (
    <SectionContainer
      labelLeft={<Trans>Shipped items</Trans>}
      className={classes.root}
      sx={[
        (theme) => ({
          marginTop: theme.spacings.md,
          marginBottom: theme.spacings.sm,
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <Box className={classes.items} sx={(theme) => ({ mb: theme.spacings.md })}>
        {items.map((item) => {
          if (!item) return null
          return <ShipmentItem key={item.id} item={item} />
        })}
      </Box>
    </SectionContainer>
  )
}
