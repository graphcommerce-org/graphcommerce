import type { RemoveItemFromCart } from '@graphcommerce/magento-cart-items'
import type { ReactPlugin } from '@graphcommerce/next-config'
import { sendEvent } from '../api/sendEvent'
import { cartItemToRemoveFromCart } from '../mapping/cartItemToRemoveFromCart/cartToRemoveFromCart'

export const component = 'RemoveItemFromCart'
export const exported =
  '@graphcommerce/magento-cart-items/components/RemoveItemFromCart/RemoveItemFromCart'

export const GoogleDatalayerRemoveItemFromCart: ReactPlugin<typeof RemoveItemFromCart> = (
  props,
) => {
  const { Prev, buttonProps } = props

  return (
    <Prev
      {...props}
      buttonProps={{
        ...buttonProps,
        onClick: (e) => {
          sendEvent(
            'remove_from_cart',
            cartItemToRemoveFromCart({ __typename: 'SimpleCartItem', ...props }),
          )
          buttonProps?.onClick?.(e)
        },
      }}
    />
  )
}

export const Plugin = GoogleDatalayerRemoveItemFromCart
