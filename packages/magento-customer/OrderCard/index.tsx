import { makeStyles, Theme } from '@material-ui/core'
import Skeleton from '@material-ui/lab/Skeleton'
import Money from '@reachdigital/magento-store/Money'
import clsx from 'clsx'
import React from 'react'
import OrderCardItem from '../OrderCardItem'
import OrderCardItemImage from '../OrderCardItemImage'
import { UseOrderCardItemImages } from '../OrderCardItemImage/useOrderCardItemImages'
import OrderStateLabel from '../OrderStateLabel'
import TrackingLink from '../TrackingLink'
import { OrderCardFragment } from './OrderCard.gql'

const useStyles = makeStyles(
  (theme: Theme) => ({
    orderContainer: {
      [theme.breakpoints.up('sm')]: {
        padding: theme.spacings.md,
      },
      textAlign: 'center',
      paddingTop: theme.spacings.lg,
      paddingBottom: theme.spacings.lg,
      borderBottom: `1px solid ${theme.palette.divider}`,
    },
    orderRow: {
      marginBottom: `calc(${theme.spacings.xxs} * .5)`,
    },
    orderMoney: {
      fontWeight: 'bold',
      marginRight: theme.spacings.xxs,
    },
    orderProducts: {
      display: 'flex',
      justifyContent: 'center',
      flexWrap: 'wrap',
    },
    skeleton: {
      display: 'inline-block',
      marginLeft: `calc((${theme.spacings.sm} * .5) * -1)`,
      marginRight: theme.spacings.sm,
    },
    images: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      marginTop: theme.spacings.xxs,
    },
    placeholder: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: 88,
      height: 88,
      marginBottom: theme.spacings.xxs,
    },
  }),
  { name: 'OrderCard' },
)

type OrderCardProps = Partial<OrderCardFragment> & {
  loading?: boolean
  locale?: string
} & { images: UseOrderCardItemImages }

export default function OrderCard(props: OrderCardProps) {
  const { loading, shipments, total, items, order_date, locale, images } = props
  const classes = useStyles()

  const dateFormatter = new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  const totalItems = items?.length ?? 0
  const maxItemsInRow = 5

  return (
    <div className={classes.orderContainer}>
      <div className={classes.orderRow}>
        {!loading ? (
          <span className={classes.orderMoney}>
            <Money {...total?.grand_total} />
          </span>
        ) : (
          <Skeleton classes={{ root: classes.skeleton }} variant='text' width={64} />
        )}

        {!loading ? (
          <span>{dateFormatter.format(new Date(order_date ?? ''))}</span>
        ) : (
          <Skeleton
            classes={{
              root: classes.skeleton,
            }}
            variant='text'
            width={128}
          />
        )}
      </div>
      <div className={classes.orderRow}>
        {!loading ? (
          <OrderStateLabel
            items={items}
            renderer={{
              Ordered: () => <span>Your order is being processed</span>,
              Invoiced: () => <span>Your order has been invoiced</span>,
              Shipped: () => <span>Your order is on its way!</span>,
              Refunded: () => <span>Your order has been refunded</span>,
              Canceled: () => <span>Your order has been canceled</span>,
              Returned: () => <span>Your order has been returned</span>,
              Partial: () => <span>Your order has been partially processed</span>,
            }}
          />
        ) : (
          <Skeleton
            classes={{
              root: classes.skeleton,
            }}
            variant='text'
            width={280}
          />
        )}
      </div>
      <div className={clsx(classes.orderProducts, classes.orderRow)}>
        {!loading ? (
          <div className={classes.images}>
            {items
              ?.slice(0, maxItemsInRow)
              .map(
                (item) =>
                  item?.product_url_key &&
                  images[item.product_url_key] && (
                    <OrderCardItemImage
                      key={item.product_url_key}
                      {...images[item.product_url_key]}
                    />
                  ),
              )}

            {totalItems > maxItemsInRow && (
              <div className={classes.placeholder}>{`+${totalItems - maxItemsInRow}`}</div>
            )}
          </div>
        ) : (
          <>
            <Skeleton
              classes={{
                root: classes.skeleton,
              }}
              variant='rect'
              width={88}
              height={88}
            />
          </>
        )}
      </div>
      <div>
        {!loading ? (
          <>{shipments?.[0]?.tracking?.[0] && <TrackingLink {...shipments?.[0].tracking?.[0]} />}</>
        ) : (
          <>
            <Skeleton
              classes={{
                root: classes.skeleton,
              }}
              variant='text'
              width={228}
            />
          </>
        )}
      </div>
    </div>
  )
}
