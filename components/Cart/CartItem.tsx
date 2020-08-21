import {
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  makeStyles,
  Theme,
  createStyles,
} from '@material-ui/core'
import Money from 'components/Money'
import { useCartIdQuery } from 'generated/apollo'
import React from 'react'
import RemoveItemFromCart from './RemoveItemFromCart'
import UpdateItemQuantity from './UpdateItemQuantity'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    itemWrapper: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    inline: {
      display: 'inline',
    },
    avatar: {
      width: 60,
      height: 60,
      border: `1px solid ${theme.palette.divider}`,
      marginRight: 10,
    },
    avatarImg: {
      objectFit: 'contain',
    },
    itemName: {
      flex: '100 1 0',
      minWidth: '250px',
    },
    totals: {
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
    },
    itemPriceWrapper: {
      flex: '1 1 auto',
    },
    itemPriceInner: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    qtyTotalsWrapper: {
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
      marginRight: `${theme.spacings.sm}`,
    },
    productPrice: {
      marginBottom: `calc(${theme.spacings.xs} / 2)`,
    },
    removeItem: {
      marginLeft: `calc(${theme.spacings.xs} / 2)`,
    },
  }),
)

export default function CartItem({ id, quantity, product, prices }: GQLCartItemFragment) {
  const { data: cartIdData } = useCartIdQuery()
  const classes = useStyles()

  return (
    <ListItem className={classes.itemWrapper}>
      {product?.thumbnail?.url && product.thumbnail.label && (
        <ListItemAvatar>
          <Avatar
            alt={product.thumbnail.label}
            src={product.thumbnail.url}
            variant='rounded'
            className={classes.avatar}
            classes={{ img: classes.avatarImg }}
          />
        </ListItemAvatar>
      )}
      <ListItemText
        className={classes.itemName}
        primary={product.name}
        secondaryTypographyProps={{ component: 'div' }}
      />
      <ListItemText
        classes={{ root: classes.itemPriceWrapper }}
        primary={
          <div className={classes.itemPriceInner}>
            <div className={classes.qtyTotalsWrapper}>
              <div className={classes.productPrice}>
                {prices?.price && <Money {...prices.price} />}
                {' ⨉ '}
              </div>
              <UpdateItemQuantity
                cartId={cartIdData?.cartId ?? ''}
                cartItemId={Number(id)}
                quantity={quantity}
              />
            </div>
            <div>
              {prices?.row_total_including_tax && <Money {...prices.row_total_including_tax} />}
            </div>
            <div className={classes.removeItem}>
              <RemoveItemFromCart cartId={cartIdData?.cartId ?? ''} cartItemId={Number(id)} />
            </div>
          </div>
        }
      />
    </ListItem>
  )
}
