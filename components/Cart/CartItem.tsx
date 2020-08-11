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
    inline: {
      display: 'inline',
    },
    avatar: {
      width: 60,
      height: 60,
      border: `1px solid ${theme.palette.divider}`,
      marginRight: 10,
    },
    totals: {
      display: 'flex',
      alignItems: 'center',
    },
  }),
)

export default function CartItem({ id, quantity, product, prices }: GQLCartItemFragment) {
  const { data: cartIdData } = useCartIdQuery()
  const classes = useStyles()

  return (
    <ListItem alignItems='flex-start'>
      <ListItemAvatar>
        <RemoveItemFromCart cartId={cartIdData?.cartId ?? ''} cartItemId={Number(id)} />
      </ListItemAvatar>
      {product?.thumbnail?.url && product.thumbnail.label && (
        <ListItemAvatar>
          <Avatar
            alt={product.thumbnail.label}
            src={product.thumbnail.url}
            variant='rounded'
            className={classes.avatar}
          />
        </ListItemAvatar>
      )}
      <ListItemText
        primary={product.name}
        secondaryTypographyProps={{ component: 'div' }}
        secondary={
          <div className={classes.totals}>
            {prices?.price && <Money {...prices.price} />}
            {' ⨉ '}
            <UpdateItemQuantity
              cartId={cartIdData?.cartId ?? ''}
              cartItemId={Number(id)}
              quantity={quantity}
            />
            {prices?.row_total_including_tax && <Money {...prices.row_total_including_tax} />}
          </div>
        }
      />
    </ListItem>
  )
}
