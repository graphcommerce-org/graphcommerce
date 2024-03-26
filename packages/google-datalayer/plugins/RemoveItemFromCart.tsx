import type { RemoveItemFromCart as Original } from '@graphcommerce/magento-cart-items'
import { IfConfig, ReactPlugin } from '@graphcommerce/next-config'
import { removeFromCart } from '../events/remove_from_cart'

export const component = 'RemoveItemFromCart'
export const exported =
  '@graphcommerce/magento-cart-items/components/RemoveItemFromCart/RemoveItemFromCart'

export const RemoveItemFromCart: ReactPlugin<typeof Original> = (props) => {
  const { Prev, uid, quantity, prices, product, buttonProps } = props

  return (
    <Prev
      {...props}
      product={product}
      buttonProps={{
        onClick: (e) => {
          removeFromCart({
            __typename: 'Cart',
            items: [{ uid, __typename: 'SimpleCartItem', product, quantity, prices }],
          })
          buttonProps?.onClick?.(e)
        },
      }}
    />
  )
}

export const Plugin = RemoveItemFromCart
