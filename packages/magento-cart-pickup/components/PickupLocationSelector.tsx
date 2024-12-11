import { useShippingMethod } from '@graphcommerce/magento-cart-shipping-method'
import type { PickupLocationFormProps } from './PickupLocationForm'
import { PickupLocationForm } from './PickupLocationForm'

export function PickupLocationSelector(props: PickupLocationFormProps) {
  const currentShippingMethod = useShippingMethod()

  return currentShippingMethod === 'instore-pickup' ? <PickupLocationForm {...props} /> : null
}
