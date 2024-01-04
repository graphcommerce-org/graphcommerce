import type { RemoveItemFromCartFab } from '@graphcommerce/magento-cart-items'
import { IfConfig, ReactPlugin } from '@graphcommerce/next-config'
import { dataLayerRemoveFromCart } from '../events/dataLayerRemoveFromCart/dataLayerRemoveFromCart'

export const component = 'RemoveItemFromCartFab'
export const exported =
  '@graphcommerce/magento-cart-items/components/RemoveItemFromCart/RemoveItemFromCartFab'
export const ifConfig: IfConfig = 'googleTagmanagerId'

export const GaRemoveItemFromCartFab: ReactPlugin<typeof RemoveItemFromCartFab> = (props) => {
  const { Prev, uid, quantity, prices, product, fabProps } = props

  return (
    <Prev
      {...props}
      product={product}
      fabProps={{
        onClick: (e) => {
          dataLayerRemoveFromCart({
            __typename: 'Cart',
            items: [{ uid, __typename: 'SimpleCartItem', product, quantity, prices }],
          })
          fabProps?.onClick?.(e)
        },
      }}
    />
  )
}

export const Plugin = GaRemoveItemFromCartFab
