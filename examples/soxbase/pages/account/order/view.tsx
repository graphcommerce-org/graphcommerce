import { useQuery } from '@apollo/client'
import { Button, Container, Link, makeStyles, NoSsr, Theme } from '@material-ui/core'
import PageLayout from '@reachdigital/magento-app-shell/PageLayout'
import useOrderCardItemImages from '@reachdigital/magento-customer/OrderCardItemImage/useOrderCardItemImages'
import { OrderDetailPageDocument } from '@reachdigital/magento-customer/OrderDetailPage/OrderDetailPage.gql'
import OrderedItem from '@reachdigital/magento-customer/OrderedItem'
import PageMeta from '@reachdigital/magento-store/PageMeta'
import AnimatedRow from '@reachdigital/next-ui/AnimatedRow'
import OverlayUi from '@reachdigital/next-ui/AppShell/OverlayUi'
import { registerRouteUi } from '@reachdigital/next-ui/PageTransition/historyHelpers'
import SectionContainer from '@reachdigital/next-ui/SectionContainer'
import clsx from 'clsx'
import { AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/router'
import React, { useState } from 'react'

const useStyles = makeStyles(
  (theme: Theme) => ({
    sectionContainer: {
      marginTop: theme.spacings.md,
      marginBottom: theme.spacings.md,
    },
    orderedItemsInnerContainer: {
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
  {
    name: 'OrderDetailPage',
  },
)

const OrderDetailPage = () => {
  const router = useRouter()
  const { orderId } = router.query
  const classes = useStyles()

  const { data, loading } = useQuery(OrderDetailPageDocument, {
    variables: {
      orderNumber: orderId as string,
    },
  })

  const orders = data?.customer?.orders
  const order = orders?.items?.[0]
  const maxItemsAboveFold = 4

  const orderedItemsImages = useOrderCardItemImages(orders)
  const [collapseOrderedItems, setCollapseOrderedItems] = useState<boolean>(true)

  return (
    <OverlayUi title='Orders' variant='bottom' fullHeight>
      <PageMeta
        title={`Order Details #${orderId}`}
        metaDescription={`Order detail page for order #${orderId}`}
        metaRobots='NOINDEX, FOLLOW'
      />
      <Container maxWidth='md'>
        <NoSsr>
          {loading && 'Loading'}

          <SectionContainer
            label='Ordered items'
            /* endLabel='SHIPPED'*/ className={classes.sectionContainer}
          >
            <div className={classes.orderedItemsInnerContainer}>
              <AnimatePresence initial={false}>
                {order?.items?.slice(0, maxItemsAboveFold).map((orderedItem) => (
                  <AnimatedRow key={`orderedItem-${orderedItem?.product_sku}`}>
                    {orderedItem && (
                      <OrderedItem
                        {...orderedItem}
                        {...orderedItemsImages[orderedItem?.product_url_key ?? '']}
                      />
                    )}
                  </AnimatedRow>
                ))}

                {!collapseOrderedItems &&
                  order?.items
                    ?.slice(maxItemsAboveFold, order?.items?.length)
                    .map((orderedItem) => (
                      <AnimatedRow key={`orderedItem-${orderedItem?.product_sku}`}>
                        {orderedItem && (
                          <OrderedItem
                            {...orderedItem}
                            {...orderedItemsImages[orderedItem?.product_url_key ?? '']}
                          />
                        )}
                      </AnimatedRow>
                    ))}
              </AnimatePresence>
            </div>

            {order?.items && maxItemsAboveFold < order?.items?.length && (
              <div className={classes.viewAllButton}>
                <Link
                  href='#'
                  color='primary'
                  onClick={(e) => {
                    e.preventDefault()
                    setCollapseOrderedItems(!collapseOrderedItems)
                  }}
                >
                  View all items
                </Link>
              </div>
            )}
          </SectionContainer>
        </NoSsr>
      </Container>
    </OverlayUi>
  )
}

OrderDetailPage.Layout = PageLayout

registerRouteUi('/account/order', OverlayUi)

export default OrderDetailPage
