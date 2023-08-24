import type { RemoveItemFromCartFab } from '@graphcommerce/magento-cart-items'
import { IfConfig, ReactPlugin } from '@graphcommerce/next-config'
import { gtagRemoveFromCart } from '../events/gtagRemoveFromCart/gtagRemoveFromCart'

export const component = 'RemoveItemFromCartFab'
export const exported = '@graphcommerce/magento-cart-items/RemoveItemFromCart/RemoveItemFromCartFab'
export const ifConfig: IfConfig = 'googleAnalyticsId'

export const GaRemoveItemFromCartFab: ReactPlugin<typeof RemoveItemFromCartFab> = (props) => {
  const { Prev, uid, quantity, prices, product, fabProps } = props

  return (
    <Prev
      {...props}
      product={product}
      fabProps={{
        onClick: (e) => {
          gtagRemoveFromCart({
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
