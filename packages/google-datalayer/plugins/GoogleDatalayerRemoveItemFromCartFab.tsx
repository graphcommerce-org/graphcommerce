import type { RemoveItemFromCartFab as Original } from '@graphcommerce/magento-cart-items'
import type { ReactPlugin } from '@graphcommerce/next-config'
import { sendEvent } from '../api/sendEvent'
import { cartItemToRemoveFromCart } from '../mapping/cartItemToRemoveFromCart/cartToRemoveFromCart'

export const component = 'RemoveItemFromCartFab'
export const exported =
  '@graphcommerce/magento-cart-items/components/RemoveItemFromCart/RemoveItemFromCartFab'

export const GoogleDatalayerRemoveItemFromCartFab: ReactPlugin<typeof Original> = (props) => {
  const { Prev, fabProps } = props

  return (
    <Prev
      {...props}
      fabProps={{
        ...fabProps,
        onClick: (e) => {
          sendEvent(
            'remove_from_cart',
            cartItemToRemoveFromCart({ __typename: 'SimpleCartItem', ...props }),
          )
          fabProps?.onClick?.(e)
        },
      }}
    />
  )
}

export const Plugin = GoogleDatalayerRemoveItemFromCartFab
