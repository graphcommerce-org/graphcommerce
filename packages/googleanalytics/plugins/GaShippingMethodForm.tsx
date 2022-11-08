import { ShippingMethodFormProps } from '@graphcommerce/magento-cart-shipping-method'
import { PluginProps } from '@graphcommerce/next-config'
import { gtagAddShippingInfo } from '../events/gtagAddShippingInfo/gtagAddShippingInfo'

export const component = 'ShippingMethodForm'
export const exported = '@graphcommerce/magento-cart-shipping-method'

/** When the ShippingMethod is submitted the result is sent to Google Analytics */
export function GaShippingMethodForm(props: PluginProps<ShippingMethodFormProps>) {
  const { Prev, onComplete, ...rest } = props
  return (
    <Prev
      {...rest}
      onComplete={(result) => {
        const cart = result.data?.setShippingMethodsOnCart?.cart
        if (!cart) return
        gtagAddShippingInfo(cart)
      }}
    />
  )
}

export const Plugin = GaShippingMethodForm
