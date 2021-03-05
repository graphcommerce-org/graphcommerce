import { makeStyles, Theme } from '@material-ui/core'
import AnimatedRow from '@reachdigital/next-ui/AnimatedRow'
import Button from '@reachdigital/next-ui/Button'
import SectionContainer from '@reachdigital/next-ui/SectionContainer'
import { AnimatePresence } from 'framer-motion'
import React, { useState } from 'react'
import { UseOrderCardItemImages } from '../OrderCardItemImage/useOrderCardItemImages'
import OrderItem from '../OrderItem'
import { OrderItemsFragment } from './OrderItems.gql'

const useStyles = makeStyles(
  (theme: Theme) => ({
    sectionContainer: {
      marginTop: theme.spacings.md,
      marginBottom: theme.spacings.md,
    },
    orderItemsInnerContainer: {
      borderBottom: `1px solid ${theme.palette.divider}`,
    },
    viewAllButton: {
      margin: `${theme.spacings.xs} auto 0 auto`,
      textAlign: 'center',
      '& a': {
        padding: 8,
      },
    },
  }),
  { name: 'OrderItems' },
)

export type OrderItemsProps = OrderItemsFragment & { loading?: boolean } & {
  images?: UseOrderCardItemImages
}

export default function OrderItems(props: OrderItemsProps) {
  const { images, items, loading } = props
  const classes = useStyles()
  const [expanded, setExpanded] = useState<boolean>(false)
  const maxItemsAboveFold = 4

  return (
    <SectionContainer
      label='Ordered items'
      /* endLabel='SHIPPED'*/
      className={classes.sectionContainer}
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
          <Button variant='text' color='primary' onClick={(event) => setExpanded(!expanded)}>
            {expanded ? 'View less items' : 'View all items'}
          </Button>
        </div>
      )}
    </SectionContainer>
  )
}
