import type { ShippingMethodFormProps } from '@graphcommerce/magento-cart-shipping-method'
import type { PluginConfig, PluginProps } from '@graphcommerce/next-config'
import { PickupLocationSelector } from '../components/PickupLocationSelector'

export const config: PluginConfig = {
  type: 'component',
  module: '@graphcommerce/magento-cart-shipping-method',
}

export function ShippingMethodForm(props: PluginProps<ShippingMethodFormProps>) {
  const { Prev, children, step, ...rest } = props
  return (
    <Prev {...rest} step={step}>
      <PickupLocationSelector step={step + 1} />
      {children}
    </Prev>
  )
}
