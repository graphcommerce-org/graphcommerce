import type { RemoveItemFromCartFab as Original } from '@graphcommerce/magento-cart-items'
import { IfConfig, ReactPlugin } from '@graphcommerce/next-config'
import { removeFromCart } from '../events/remove_from_cart'

export const component = 'RemoveItemFromCartFab'
export const exported =
  '@graphcommerce/magento-cart-items/components/RemoveItemFromCart/RemoveItemFromCartFab'
export const ifConfig: IfConfig = 'googleTagmanagerId'

export const RemoveItemFromCartFab: ReactPlugin<typeof Original> = (props) => {
  const { Prev, uid, quantity, prices, product, fabProps } = props

  return (
    <Prev
      {...props}
      product={product}
      fabProps={{
        onClick: (e) => {
          removeFromCart({
            __typename: 'Cart',
            items: [{ uid, __typename: 'SimpleCartItem', product, quantity, prices }],
          })
          fabProps?.onClick?.(e)
        },
      }}
    />
  )
}

export const Plugin = RemoveItemFromCartFab
