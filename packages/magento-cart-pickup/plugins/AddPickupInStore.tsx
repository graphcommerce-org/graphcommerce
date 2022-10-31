import { ShippingMethodFormProps } from '@graphcommerce/magento-cart-shipping-method'
import type { PluginProps } from '@graphcommerce/next-config'
import { PickupLocationSelector } from '../components/PickupLocationSelector'

export const component = 'ShippingMethodForm'
export const exported = '@graphcommerce/magento-cart-shipping-method'

function AddPickupInStore(props: PluginProps<ShippingMethodFormProps>) {
  const { Component, children, step } = props
  return (
    <Component {...props}>
      <PickupLocationSelector step={step + 1} />
      {children}
    </Component>
  )
}

export const Plugin = AddPickupInStore
