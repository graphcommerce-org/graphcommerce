import { ShippingMethodFormProps } from '@graphcommerce/magento-cart-shipping-method'
import type { PluginConfig, PluginProps } from '@graphcommerce/next-config'
import { sendEvent } from '../api/sendEvent'
import { cartToAddShippingInfo } from '../mapping/cartToAddShippingInfo/cartToAddShippingInfo'

export const config: PluginConfig = {
  module: '@graphcommerce/magento-cart-shipping-method',
  type: 'component',
}

export function ShippingMethodForm(props: PluginProps<ShippingMethodFormProps>) {
  const { Prev, onComplete, ...rest } = props
  return (
    <Prev
      {...rest}
      onComplete={(result, variables) => {
        if (result.data?.setShippingMethodsOnCart?.cart) {
          sendEvent(
            'add_shipping_info',
            cartToAddShippingInfo(result.data?.setShippingMethodsOnCart?.cart),
          )
        }

        return onComplete?.(result, variables)
      }}
    />
  )
}
