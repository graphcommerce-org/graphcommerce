import { useQuery } from '@apollo/client'
import {
  ListItem,
  ListItemText,
  Divider,
  Theme,
  ListItemSecondaryAction,
  NoSsr,
  makeStyles,
} from '@material-ui/core'
import CartIcon from '@material-ui/icons/ShoppingBasketOutlined'
import Money from '@reachdigital/magento-store/Money'
import RenderType, { TypeRenderer } from '@reachdigital/next-ui/RenderType'
import clsx from 'clsx'
import { m as motion, AnimatePresence, MotionProps } from 'framer-motion'
import React from 'react'
import { CartDocument, CartQuery } from './Cart.gql'

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
    emptyCart: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      color: theme.palette.primary.mutedText,
    },
    emptyCartIcon: {
      fontSize: 200,
    },
  }),
  { name: 'Cart' },
)

type CartItemRenderer = TypeRenderer<
  NonNullable<NonNullable<NonNullable<CartQuery['cart']>['items']>[0]> & { cartId: string }
>

type CartProps = { renderer: CartItemRenderer }

export default function Cart(props: CartProps) {
  const { renderer } = props
  const classes = useStyles()
  const { data, loading } = useQuery(CartDocument)

  let content

  const cartItemAnimation: MotionProps = {
    initial: { opacity: 0, x: 0 },
    animate: { opacity: 1, x: 0 },
    exit: { x: -100 },
    layout: true,
  }

  const animation: MotionProps = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0, transition: { type: 'inertia' } },
    layout: true,
  }

  if (!data?.cart?.items?.length) {
    content = (
      <motion.div
        className={clsx(classes.emptyCart)}
        key='empty-cart'
        {...{ ...animation, layout: false }}
      >
        <CartIcon className={classes.emptyCartIcon} color='disabled' />
        <p>Looks like you did not add anything to your cart yet.</p>
      </motion.div>
    )
  } else if (loading) {
    content = (
      <motion.div key='loading-cart' {...{ ...animation, layout: false }}>
        loading...
      </motion.div>
    )
  } else if (data) {
    const { cart } = data
    content = (
      <>
        {cart?.items?.map((item) => {
          if (!item) return null
          return (
            <motion.div key={`item${item.id}`} {...cartItemAnimation}>
              <RenderType renderer={renderer} {...item} cartId={cart.id} />
              <Divider variant='inset' component='div' />
            </motion.div>
          )
        })}

        {cart?.prices?.subtotal_including_tax && (
          <motion.div {...animation} key='subtotal'>
            <ListItem ContainerComponent='div'>
              <ListItemText inset>Subtotal</ListItemText>
              <ListItemSecondaryAction>
                <Money {...cart.prices.subtotal_including_tax} />
              </ListItemSecondaryAction>
            </ListItem>
          </motion.div>
        )}

        {cart?.prices?.discounts?.map((discount, idx) => (
          <motion.div {...animation} key={`price${idx}`}>
            <ListItem ContainerComponent='div'>
              <ListItemText inset>{discount?.label}</ListItemText>
              <ListItemSecondaryAction>
                {discount?.amount && (
                  <Money
                    currency={discount?.amount.currency}
                    value={(discount?.amount.value ?? 0) * -1}
                  />
                )}
              </ListItemSecondaryAction>
            </ListItem>
          </motion.div>
        ))}

        {cart?.shipping_addresses?.map((address, idx) => (
          // eslint-disable-next-line react/no-array-index-key
          <motion.div {...animation} key={`shipping_addresses_${idx}`}>
            <ListItem ContainerComponent='div'>
              <ListItemText inset>{address?.selected_shipping_method?.carrier_title}</ListItemText>
              <ListItemSecondaryAction>
                {address?.selected_shipping_method?.amount && (
                  <Money {...address.selected_shipping_method.amount} key={idx} />
                )}
              </ListItemSecondaryAction>
            </ListItem>
          </motion.div>
        ))}

        <motion.div {...animation} key='total'>
          <ListItem key='total' ContainerComponent='div'>
            <ListItemText inset>Total</ListItemText>
            <ListItemSecondaryAction>
              {cart?.prices?.grand_total && <Money {...cart.prices.grand_total} />}
            </ListItemSecondaryAction>
          </ListItem>
        </motion.div>
      </>
    )
  }

  return (
    <NoSsr>
      <AnimatePresence exitBeforeEnter>{content}</AnimatePresence>
    </NoSsr>
  )
}
