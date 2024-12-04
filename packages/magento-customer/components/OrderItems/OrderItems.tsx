import { SectionContainer, extendableComponent } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react'
import type { SxProps, Theme } from '@mui/material'
import { Box, Button } from '@mui/material'
import { useState } from 'react'
import type { UseOrderCardItemImages } from '../../hooks/useOrderCardItemImages'
import { OrderItem } from '../OrderItem/OrderItem'
import type { OrderItemsFragment } from './OrderItems.gql'

export type OrderItemsProps = OrderItemsFragment & {
  images?: UseOrderCardItemImages
  sx?: SxProps<Theme>
}

const componentName = 'OrderItems'
const parts = ['root', 'orderItemsInnerContainer', 'skeletonOrderItem', 'viewAllButton'] as const
const { classes } = extendableComponent(componentName, parts)

export function OrderItems(props: OrderItemsProps) {
  const { images, items, sx = [] } = props
  const [expanded, setExpanded] = useState<boolean>(false)
  const maxItemsAboveFold = 4

  return (
    <SectionContainer
      labelLeft={<Trans id='Ordered items' />}
      /* endLabel='SHIPPED'*/
      className={classes.root}
      sx={[
        (theme) => ({
          marginTop: theme.spacings.md,
          marginBottom: theme.spacings.sm,
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <Box className={classes.orderItemsInnerContainer} sx={(theme) => ({ mb: theme.spacings.md })}>
        {items
          ?.slice(0, maxItemsAboveFold)
          .map((orderItem) => (
            <Box key={`orderItem-${orderItem?.id}`}>
              {orderItem && (
                <OrderItem {...orderItem} {...images?.[orderItem?.product_url_key ?? '']} />
              )}
            </Box>
          ))}

        {expanded &&
          items
            ?.slice(maxItemsAboveFold, items?.length)
            .map((orderItem) => (
              <Box key={`orderItem-${orderItem?.id}`}>
                {orderItem && (
                  <OrderItem {...orderItem} {...images?.[orderItem?.product_url_key ?? '']} />
                )}
              </Box>
            ))}
      </Box>

      {items && maxItemsAboveFold < items?.length && (
        <Box
          className={classes.viewAllButton}
          sx={(theme) => ({
            margin: `${theme.spacings.xs} auto 0 auto`,
            textAlign: 'center',
            '& a': { padding: '8px' },
          })}
        >
          <Button variant='text' color='primary' onClick={() => setExpanded(!expanded)}>
            {expanded ? <Trans id='View less items' /> : <Trans id='View all items' />}
          </Button>
        </Box>
      )}
    </SectionContainer>
  )
}
