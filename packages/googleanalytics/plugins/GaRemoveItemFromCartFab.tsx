import type { RemoveItemFromCartFabProps } from '@graphcommerce/magento-cart-items'
import { IfConfig, PluginProps } from '@graphcommerce/next-config'
import { gtagRemoveFromCart } from '../events/gtagRemoveFromCart/gtagRemoveFromCart'

export const component = 'RemoveItemFromCartFab'
export const exported = '@graphcommerce/magento-cart-items'
export const ifConfig: IfConfig = 'googleAnalyticsId'

export const GaRemoveItemFromCartFab = (props: PluginProps<RemoveItemFromCartFabProps>) => {
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
