import { ActionCardLayout, ActionCardLayoutProps, nonNullable } from '@graphcommerce/next-ui'
import { CartItemsFragment } from '../Api/CartItems.gql'
import { CartItemActionCard, CartItemActionCardProps } from '../CartItem/CartItemActionCard'

export type CartProps = ActionCardLayoutProps & {
  cart?: CartItemsFragment | null
  itemProps?: Omit<
    CartItemActionCardProps,
    'cartItem' | 'layout' | 'onClick' | 'disabled' | 'selected' | 'reset' | 'color'
  >
}

export function CartItems(props: CartProps) {
  const { cart, children, layout, itemProps, ...cardLayout } = props

  if (!cart?.items?.length) return null

  return (
    <ActionCardLayout layout={layout} {...cardLayout}>
      {cart.items?.filter(nonNullable).map((item) => (
        <CartItemActionCard
          key={item.uid}
          cartItem={item}
          layout={layout}
          size='large'
          {...itemProps}
        />
      ))}
      {children}
    </ActionCardLayout>
  )
}
