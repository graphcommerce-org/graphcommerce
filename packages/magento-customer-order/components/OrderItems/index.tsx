import { AnimatedRow, SectionContainer, responsiveVal, makeStyles } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/macro'
import { Skeleton, Button } from '@mui/material'
import { AnimatePresence } from 'framer-motion'
import React, { useState } from 'react'
import { UseOrderCardItemImages } from '../../hooks/useOrderCardItemImages'
import OrderItem from '../OrderItem'
import { OrderItemsFragment } from './OrderItems.gql'

const useStyles = makeStyles({ name: 'OrderItems' })((theme) => ({
  sectionContainer: {
    marginTop: theme.spacings.md,
    marginBottom: theme.spacings.md,
  },
  orderItemsInnerContainer: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  skeletonOrderItem: {
    marginTop: theme.spacings.xxs,
    marginBottom: theme.spacings.xxs,
  },
  viewAllButton: {
    margin: `${theme.spacings.xs} auto 0 auto`,
    textAlign: 'center',
    '& a': {
      padding: 8,
    },
  },
}))

export type OrderItemsProps = OrderItemsFragment & { loading?: boolean } & {
  images?: UseOrderCardItemImages
}

export default function OrderItems(props: OrderItemsProps) {
  const { images, items, loading } = props
  const { classes } = useStyles()
  const [expanded, setExpanded] = useState<boolean>(false)
  const maxItemsAboveFold = 4

  if (loading) {
    return (
      <SectionContainer
        labelLeft={<Trans>Ordered items</Trans>}
        /* endLabel='SHIPPED'*/
        classes={{ sectionContainer: classes.sectionContainer }}
      >
        <div className={classes.orderItemsInnerContainer}>
          <div className={classes.skeletonOrderItem}>
            <Skeleton height={responsiveVal(70, 125)} />
          </div>
          <div className={classes.skeletonOrderItem}>
            <Skeleton height={responsiveVal(70, 125)} />
          </div>
          <div className={classes.skeletonOrderItem}>
            <Skeleton height={responsiveVal(70, 125)} />
          </div>
        </div>
      </SectionContainer>
    )
  }

  return (
    <SectionContainer
      labelLeft={<Trans>Ordered items</Trans>}
      /* endLabel='SHIPPED'*/
      classes={{ sectionContainer: classes.sectionContainer }}
    >
      <div className={classes.orderItemsInnerContainer}>
        <AnimatePresence initial={false}>
          {items?.slice(0, maxItemsAboveFold).map((orderItem) => (
            <AnimatedRow key={`orderItem-${orderItem?.id}`}>
              {orderItem && (
                <OrderItem {...orderItem} {...images?.[orderItem?.product_url_key ?? '']} />
              )}
            </AnimatedRow>
          ))}

          {expanded &&
            items
              ?.slice(maxItemsAboveFold, items?.length)
              .map((orderItem) => (
                <AnimatedRow key={`orderItem-${orderItem?.id}`}>
                  {orderItem && (
                    <OrderItem {...orderItem} {...images?.[orderItem?.product_url_key ?? '']} />
                  )}
                </AnimatedRow>
              ))}
        </AnimatePresence>
      </div>

      {items && maxItemsAboveFold < items?.length && (
        <div className={classes.viewAllButton}>
          <Button variant='text' color='primary' onClick={() => setExpanded(!expanded)}>
            {expanded ? <Trans>View less items</Trans> : <Trans>View all items</Trans>}
          </Button>
        </div>
      )}
    </SectionContainer>
  )
}
