import {
  ActionCardLayout,
  breakpointVal,
  extendableComponent,
  nonNullable,
  SectionContainer,
} from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react/macro'
import type { SxProps, Theme } from '@mui/material'
import { Box } from '@mui/material'
import type { OrderItemProps } from '../OrderItem/OrderItem'
import { OrderItem } from '../OrderItem/OrderItem'
import type { OrderItemsFragment } from './OrderItems.gql'

export type OrderItemsProps = {
  order: OrderItemsFragment
  sx?: SxProps<Theme>
  layout?: 'list' | 'grid'
  size?: 'small' | 'medium' | 'large'
  itemProps?: Omit<OrderItemProps, 'cartItem'>
}

const name = 'OrderItems'
const parts = ['root', 'items', 'actionCard'] as const
const { classes } = extendableComponent(name, parts)

export function OrderItems(props: OrderItemsProps) {
  const { order, sx = [], layout = 'list', size, itemProps = {} } = props

  const items = (order.items ?? []).filter(nonNullable)
  if (!items.length) return null

  return (
    <Box
      className={classes.root}
      sx={[
        (theme) => ({
          my: theme.spacings.md,
          padding: `${theme.spacings.sm} ${theme.spacings.sm}`,
          border: `1px ${theme.palette.divider} solid`,
          ...breakpointVal(
            'borderRadius',
            theme.shape.borderRadius * 2,
            theme.shape.borderRadius * 3,
            theme.breakpoints.values,
          ),
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <SectionContainer
        sx={{ '& .SectionHeader-root': { mt: 0 } }}
        labelLeft={<Trans>Ordered items</Trans>}
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
          {items.map((orderItem) => (
            <OrderItem
              key={orderItem.id}
              item={orderItem}
              variant='default'
              {...itemProps}
              size={size}
              layout={layout}
            />
          ))}
        </ActionCardLayout>
      </SectionContainer>
    </Box>
  )
}
