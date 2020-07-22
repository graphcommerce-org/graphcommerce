import React from 'react'
import {
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  IconButton,
  makeStyles,
  Theme,
  createStyles,
  TextField,
  TextFieldProps,
} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/RemoveCircleOutline'
import {
  useRemoveItemFromCartMutation,
  useCartIdQuery,
  useUpdateItemQuantityMutation,
} from 'generated/apollo'
import Money from 'components/Money'

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
    quantity: {
      width: 40,
    },
    quantityInput: {
      textAlign: 'center',
    },
  }),
)

export default function CartItem({ id, quantity, product, prices }: GQLCartItemFragment) {
  const { data: cartIdData } = useCartIdQuery()
  const classes = useStyles()
  const [remove] = useRemoveItemFromCartMutation()
  const [update] = useUpdateItemQuantityMutation()

  const removeItemFromCart = async () => {
    if (!cartIdData?.cartId) return
    await remove({
      variables: {
        cartId: cartIdData.cartId,
        cartItemId: Number(id),
      },
    })
  }

  const updateQuantity: TextFieldProps['onChange'] = async (event) => {
    if (!cartIdData?.cartId) return
    await update({
      variables: {
        cartId: cartIdData.cartId,
        cartItemId: Number(id),
        quantity: Number(event.target.value),
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
      <ListItemAvatar>
        <Avatar
          alt={product.thumbnail.label}
          src={product.thumbnail.url}
          variant='rounded'
          className={classes.avatar}
        />
      </ListItemAvatar>
      <ListItemText
        primary={product.name}
        secondaryTypographyProps={{ component: 'div' }}
        secondary={
          <div className={classes.totals}>
            <Money {...prices.price} />
            {' ⨉ '}
            <TextField
              defaultValue={quantity}
              variant='standard'
              size='small'
              type='number'
              onChange={updateQuantity}
              className={classes.quantity}
              inputProps={{
                className: classes.quantityInput,
              }}
            />
            <Money {...prices.row_total_including_tax} />
          </div>
        }
      />
    </ListItem>
  )
}
