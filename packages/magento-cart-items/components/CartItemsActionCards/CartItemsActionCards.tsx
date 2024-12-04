import type { ActionCardLayoutProps } from '@graphcommerce/next-ui'
import { ActionCardLayout, nonNullable } from '@graphcommerce/next-ui'
import type { CartItemsFragment } from '../../Api/CartItems.gql'
import type { CartItemActionCardProps } from '../CartItemActionCard/CartItemActionCard'
import { CartItemActionCard } from '../CartItemActionCard/CartItemActionCard'

export type CartProps = Omit<ActionCardLayoutProps, 'className'> & {
  cart?: CartItemsFragment | null
  /**
   * @deprecated Not used anymore, please use the size prop
   */
  sizeSm?: CartItemActionCardProps['size']
  /**
   * @deprecated Not used anymore, please use the size prop
   */
  sizeMd?: CartItemActionCardProps['size']
  variant?: CartItemActionCardProps['variant']
  itemProps?: Omit<
    CartItemActionCardProps,
    | 'cartItem'
    | 'layout'
    | 'onClick'
    | 'disabled'
    | 'selected'
    | 'reset'
    | 'color'
    | 'size'
    | 'variant'
  >
}

export function CartItemsActionCards(props: CartProps) {
  const {
    cart,
    children,
    layout = 'list',
    itemProps = {},
    variant = 'default',
    ...remainingProps
  } = props

  if (!cart?.items?.length) return null

  return (
    <ActionCardLayout layout={layout} {...remainingProps}>
      {cart.items
        ?.filter(nonNullable)
        .map((item) => (
          <CartItemActionCard
            key={item.uid}
            cartItem={item}
            layout={layout}
            variant={variant}
            {...itemProps}
          />
        ))}
      {children}
    </ActionCardLayout>
  )
}
