import { ActionCardLayout, ActionCardLayoutProps, nonNullable } from '@graphcommerce/next-ui'
import { Theme, useMediaQuery } from '@mui/material'
import { CartItemsFragment } from '../../Api/CartItems.gql'
import {
  CartItemActionCard,
  CartItemActionCardProps,
} from '../CartItemActionCard/CartItemActionCard'

export type CartProps = Omit<ActionCardLayoutProps, 'className'> & {
  cart?: CartItemsFragment | null
  sizeSm?: CartItemActionCardProps['size']
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
    sizeSm = 'medium',
    sizeMd = 'large',
    variant = 'default',
    ...remainingProps
  } = props

  const isMobile = useMediaQuery<Theme>((theme) => theme.breakpoints.down('md'), {
    defaultMatches: false,
  })

  const size = isMobile ? sizeSm : sizeMd

  if (!cart?.items?.length) return null

  return (
    <ActionCardLayout layout={layout} {...remainingProps}>
      {cart.items?.filter(nonNullable).map((item) => (
        <CartItemActionCard
          key={item.uid}
          cartItem={item}
          layout={layout}
          size={size}
          variant={variant}
          {...itemProps}
        />
      ))}
      {children}
    </ActionCardLayout>
  )
}
