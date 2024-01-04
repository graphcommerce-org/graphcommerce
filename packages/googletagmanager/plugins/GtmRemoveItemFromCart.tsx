import type { RemoveItemFromCart } from '@graphcommerce/magento-cart-items'
import { IfConfig, ReactPlugin } from '@graphcommerce/next-config'
import { dataLayerRemoveFromCart } from '../events/dataLayerRemoveFromCart/dataLayerRemoveFromCart'

export const component = 'RemoveItemFromCart'
export const exported =
  '@graphcommerce/magento-cart-items/components/RemoveItemFromCart/RemoveItemFromCart'
export const ifConfig: IfConfig = 'googleRecaptchaKey'

export const GaRemoveItemFromCart: ReactPlugin<typeof RemoveItemFromCart> = (props) => {
  const { Prev, uid, quantity, prices, product, buttonProps } = props

  return (
    <Prev
      {...props}
      product={product}
      buttonProps={{
        onClick: (e) => {
          dataLayerRemoveFromCart({
            __typename: 'Cart',
            items: [{ uid, __typename: 'SimpleCartItem', product, quantity, prices }],
          })
          buttonProps?.onClick?.(e)
        },
      }}
    />
  )
}

export const Plugin = GaRemoveItemFromCart
