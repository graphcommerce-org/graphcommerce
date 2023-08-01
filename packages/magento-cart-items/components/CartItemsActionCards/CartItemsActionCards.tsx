import { ActionCardLayout, ActionCardLayoutProps, nonNullable } from '@graphcommerce/next-ui'
import { Theme, useMediaQuery } from '@mui/material'
import { CartItemsFragment } from '../../Api/CartItems.gql'
import {
  CartItemActionCard,
  CartItemActionCardProps,
} from '../CartItemActionCard/CartItemActionCard'

export type CartProps = ActionCardLayoutProps & {
  cart?: CartItemsFragment | null
  itemProps?: Omit<
    CartItemActionCardProps,
    'cartItem' | 'layout' | 'onClick' | 'disabled' | 'selected' | 'reset' | 'color'
  >
} & { sizeSm?: 'small' | 'medium' | 'large'; sizeMd?: 'small' | 'medium' | 'large' }

export function CartItemsActionCards(props: CartProps) {
  const {
    cart,
    children,
    layout = 'stack',
    itemProps,
    sizeSm = 'small',
    sizeMd = 'medium',
    ...cardLayout
  } = props

  const isMobile = useMediaQuery<Theme>((theme) => theme.breakpoints.down('md'), {
    defaultMatches: false,
  })

  const size = isMobile ? sizeSm : sizeMd

  if (!cart?.items?.length) return null

  return (
    <ActionCardLayout
      sx={(theme) => ({
        marginBottom: theme.spacings.md,
        '&.layoutStack': {
          gap: 0,
        },
      })}
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
