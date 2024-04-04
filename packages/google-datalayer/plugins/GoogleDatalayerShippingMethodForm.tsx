import { ShippingMethodFormProps } from '@graphcommerce/magento-cart-shipping-method'
import type { PluginProps } from '@graphcommerce/next-config'
import { sendEvent } from '../api/sendEvent'
import { cartToAddShippingInfo } from '../mapping/cartToAddShippingInfo/cartToAddShippingInfo'

export const component = 'ShippingMethodForm'
export const exported = '@graphcommerce/magento-cart-shipping-method'

export function GoogleDatalayerShippingMethodForm(props: PluginProps<ShippingMethodFormProps>) {
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

export const Plugin = GoogleDatalayerShippingMethodForm
