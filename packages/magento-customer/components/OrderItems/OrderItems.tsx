import { SectionContainer, responsiveVal, extendableComponent } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Skeleton from '@mui/material/Skeleton'
import { SxProps, Theme } from '@mui/material/styles'
import { useState } from 'react'
import { UseOrderCardItemImages } from '../../hooks/useOrderCardItemImages'
import { OrderItem } from '../OrderItem/OrderItem'
import { OrderItemsFragment } from './OrderItems.gql'

export type OrderItemsProps = OrderItemsFragment & {
  loading?: boolean
  images?: UseOrderCardItemImages
  sx?: SxProps<Theme>
}

const componentName = 'OrderItems' as const
const parts = ['root', 'orderItemsInnerContainer', 'skeletonOrderItem', 'viewAllButton'] as const
const { classes } = extendableComponent(componentName, parts)

export function OrderItems(props: OrderItemsProps) {
  const { images, items, loading, sx = [] } = props
  const [expanded, setExpanded] = useState<boolean>(false)
  const maxItemsAboveFold = 4

  if (loading) {
    return (
      <SectionContainer
        labelLeft={<Trans id='Ordered items' />}
        /* endLabel='SHIPPED'*/
        className={classes.root}
        sx={[
          (theme) => ({
            marginTop: theme.spacings.md,
            marginBottom: theme.spacings.md,
          }),
          ...(Array.isArray(sx) ? sx : [sx]),
        ]}
      >
        <Box
          className={classes.orderItemsInnerContainer}
          sx={(theme) => ({ borderBottom: `1px solid ${theme.palette.divider}` })}
        >
          <Box
            className={classes.skeletonOrderItem}
            sx={(theme) => ({
              marginTop: theme.spacings.xxs,
              marginBottom: theme.spacings.xxs,
            })}
          >
            <Skeleton height={responsiveVal(70, 125)} />
          </Box>
          <Box
            className={classes.skeletonOrderItem}
            sx={(theme) => ({
              marginTop: theme.spacings.xxs,
              marginBottom: theme.spacings.xxs,
            })}
          >
            <Skeleton height={responsiveVal(70, 125)} />
          </Box>
          <Box
            className={classes.skeletonOrderItem}
            sx={(theme) => ({
              marginTop: theme.spacings.xxs,
              marginBottom: theme.spacings.xxs,
            })}
          >
            <Skeleton height={responsiveVal(70, 125)} />
          </Box>
        </Box>
      </SectionContainer>
    )
  }

  return (
    <SectionContainer
      labelLeft={<Trans id='Ordered items' />}
      /* endLabel='SHIPPED'*/
      className={classes.root}
      sx={[
        (theme) => ({
          marginTop: theme.spacings.md,
          marginBottom: theme.spacings.md,
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <Box
        className={classes.orderItemsInnerContainer}
        sx={(theme) => ({ borderBottom: `1px solid ${theme.palette.divider}` })}
      >
        {items?.slice(0, maxItemsAboveFold).map((orderItem) => (
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
