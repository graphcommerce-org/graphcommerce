import { ShippingMethodFormProps } from '@graphcommerce/magento-cart-shipping-method'
import { PluginProps } from '@graphcommerce/next-config'
import { addShippingInfo } from '../events/add_shipping_info'

export const component = 'ShippingMethodForm'
export const exported = '@graphcommerce/magento-cart-shipping-method'

/** When the ShippingMethod is submitted the result is sent to Google Analytics */
export function GoogleDatalayerShippingMethodForm(props: PluginProps<ShippingMethodFormProps>) {
  const { Prev, onComplete, ...rest } = props
  return (
    <Prev
      {...rest}
      onComplete={(result, variables) => {
        addShippingInfo(result.data?.setShippingMethodsOnCart?.cart)
        return onComplete?.(result, variables)
      }}
    />
  )
}

export const Plugin = GoogleDatalayerShippingMethodForm
