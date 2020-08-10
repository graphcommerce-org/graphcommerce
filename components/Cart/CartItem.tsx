import {
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  IconButton,
  makeStyles,
  Theme,
  createStyles,
} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/RemoveCircleOutline'
import Money from 'components/Money'
import { useRemoveItemFromCartMutation, useCartIdQuery } from 'generated/apollo'
import React from 'react'
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
  const [remove] = useRemoveItemFromCartMutation()

  const removeItemFromCart = async () => {
    if (!cartIdData?.cartId) return
    await remove({
      variables: {
        cartId: cartIdData.cartId,
        cartItemId: Number(id),
      },
    })
  }

  return (
    <ListItem alignItems='flex-start'>
      <ListItemAvatar>
        <IconButton
          edge='end'
          aria-label='delete'
          onClick={() => {
            // eslint-disable-next-line @typescript-eslint/no-floating-promises
            removeItemFromCart()
          }}
        >
          <DeleteIcon fontSize='small' />
        </IconButton>
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
              quantity={quantity}
              cartItemId={Number(id)}
            />
            {prices?.row_total_including_tax && <Money {...prices.row_total_including_tax} />}
          </div>
        }
      />
    </ListItem>
  )
}
