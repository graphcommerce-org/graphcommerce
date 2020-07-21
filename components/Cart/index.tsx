import React from 'react'
import { useGuestCartLazyQuery, useCartIdQuery } from 'generated/apollo'
import {
  ListItem,
  ListItemText,
  Divider,
  Theme,
  ListItemSecondaryAction,
  Button,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import Money from 'components/Money'
import GQLRenderType, { GQLTypeRenderer } from 'components/GQLRenderType'
import CartSkeleton from './CartSkeleton'

const useStyles = makeStyles(
  (theme: Theme) => ({
    root: {
      width: '100%',
      backgroundColor: theme.palette.background.paper,
    },
    buttonContainer: {
      position: 'sticky',
      bottom: 8,
    },
    button: {
      width: '100%',
    },
  }),
  { name: 'Cart' },
)

type CartItemRenderer = GQLTypeRenderer<GQLGuestCartQuery['cart']['items'][0]>

type CartProps = { renderer: CartItemRenderer }

export default function Cart(props: CartProps) {
  const { renderer } = props
  const { data: cartIdData } = useCartIdQuery()
  const classes = useStyles()
  const [loadCart, { data, loading, called }] = useGuestCartLazyQuery()

  if (!cartIdData?.cartId) return <CartSkeleton>nothing in your cart</CartSkeleton>

  if (!called) loadCart({ variables: { cartId: cartIdData.cartId } })

  if (loading || !data) {
    return <CartSkeleton>loading your cart</CartSkeleton>
  }

  const { cart } = data

  return (
    <CartSkeleton badgeContent={cart.total_quantity}>
      {cart.items.map<React.ReactNode>((item) => {
        return [
          <GQLRenderType renderer={renderer} {...item} key={item.id} />,
          <Divider variant='inset' component='li' key={`${item.id}-divider`} />,
        ]
      })}

      {(cart.shipping_addresses.length > 0 || cart.prices.discounts) && (
        <ListItem>
          <ListItemText inset>Subtotal</ListItemText>
          <ListItemSecondaryAction>
            <Money {...cart.prices.subtotal_including_tax} />
          </ListItemSecondaryAction>
        </ListItem>
      )}

      {cart.prices.discounts?.map((discount, idx) => (
        <ListItem key={idx}>
          <ListItemText inset>{discount.label}</ListItemText>
          <ListItemSecondaryAction>
            <Money {...discount.amount} key={idx} />
          </ListItemSecondaryAction>
        </ListItem>
      ))}

      {cart.shipping_addresses?.map((address, idx) => (
        // eslint-disable-next-line react/no-array-index-key
        <ListItem key={idx}>
          <ListItemText inset>{address.selected_shipping_method.carrier_title}</ListItemText>
          <ListItemSecondaryAction>
            <Money {...address.selected_shipping_method.amount} key={idx} />
          </ListItemSecondaryAction>
        </ListItem>
      ))}

      <ListItem>
        <ListItemText inset>Total</ListItemText>
        <ListItemSecondaryAction>
          <Money {...cart.prices.grand_total} />
        </ListItemSecondaryAction>
      </ListItem>

      <ListItem className={classes.buttonContainer}>
        <Button variant='contained' color='primary' size='large' className={classes.button}>
          Proceed to checkout
        </Button>
      </ListItem>
    </CartSkeleton>
  )
}
