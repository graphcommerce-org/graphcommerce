import type { OrderItemProps } from '@graphcommerce/magento-customer'
import type { PluginConfig, PluginProps } from '@graphcommerce/next-config'

export const config: PluginConfig = {
  type: 'component',
  module: '@graphcommerce/magento-customer',
}

export function OrderItem(props: PluginProps<OrderItemProps>) {
  const { Prev, item, priceModifiers, ...rest } = props

  return <Prev item={item} {...rest} />
}
