import { RemoveItemFromCartProps } from '@graphcommerce/magento-cart-items'
import { IfConfig, PluginProps } from '@graphcommerce/next-config'
import { gtagRemoveFromCart } from '../events/gtagRemoveFromCart/gtagRemoveFromCart'

export const component = 'RemoveItemFromCartFab'
export const exported = '@graphcommerce/magento-cart-items'
export const ifConfig: IfConfig = 'googleAnalyticsId'

export function GaRemoveItemFromCart(props: PluginProps<RemoveItemFromCartProps>) {
  const { Prev, uid, quantity, prices, product, onClick } = props

  return (
    <Prev
      {...props}
      product={product}
      onClick={(e) => {
        gtagRemoveFromCart({
          __typename: 'Cart',
          items: [
            {
              uid,
              __typename: 'SimpleCartItem',
              product,
              quantity,
              prices,
            },
          ],
        })
        onClick?.(e)
      }}
    />
  )
}

export const Plugin = GaRemoveItemFromCart
