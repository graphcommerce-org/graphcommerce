import { ActionCardLayout, ActionCardLayoutProps, nonNullable } from '@graphcommerce/next-ui'
import { CartItemsFragment } from '../Api/CartItems.gql'
import { CartItemActionCard, CartItemActionCardProps } from '../CartItem/CartItemActionCard'

export type CartProps = ActionCardLayoutProps & {
  cart?: CartItemsFragment | null
  itemProps?: Omit<
    CartItemActionCardProps,
    'cartItem' | 'layout' | 'onClick' | 'disabled' | 'selected' | 'reset' | 'color'
  >
} & { size?: 'small' | 'medium' | 'large' }

export function CartItems(props: CartProps) {
  const { cart, children, layout, itemProps, size, ...cardLayout } = props

  if (!cart?.items?.length) return null

  return (
    <ActionCardLayout
      sx={(theme) => ({ marginBottom: theme.spacings.lg })}
      layout={layout}
      {...cardLayout}
    >
      {cart.items?.filter(nonNullable).map((item) => (
        <CartItemActionCard
          key={item.uid}
          cartItem={item}
          layout={layout}
          size={size}
          {...itemProps}
        />
      ))}
      {children}
    </ActionCardLayout>
  )
}
