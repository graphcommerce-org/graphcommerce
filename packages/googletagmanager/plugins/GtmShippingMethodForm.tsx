import { ShippingMethodFormProps } from '@graphcommerce/magento-cart-shipping-method'
import { IfConfig, PluginProps } from '@graphcommerce/next-config'
import { gtagAddShippingInfo } from '../events/gtagAddShippingInfo/gtagAddShippingInfo'

export const component = 'ShippingMethodForm'
export const exported = '@graphcommerce/magento-cart-shipping-method'
export const ifConfig: IfConfig = 'googleAnalyticsId'

/** When the ShippingMethod is submitted the result is sent to Google Analytics */
export function GaShippingMethodForm(props: PluginProps<ShippingMethodFormProps>) {
  const { Prev, onComplete, ...rest } = props
  return (
    <Prev
      {...rest}
      onComplete={(result, variables) => {
        gtagAddShippingInfo(result.data?.setShippingMethodsOnCart?.cart)
        return onComplete?.(result, variables)
      }}
    />
  )
}

export const Plugin = GaShippingMethodForm
