import type { OrderItemProps } from '@graphcommerce/magento-customer'
import type { PriceModifier } from '@graphcommerce/magento-store'
import type { PluginConfig, PluginProps } from '@graphcommerce/next-config'
import { filterNonNullableKeys } from '@graphcommerce/next-ui'

export const config: PluginConfig = {
  type: 'component',
  module: '@graphcommerce/magento-customer',
}

export function OrderItem(props: PluginProps<OrderItemProps>) {
  const { Prev, ...rest } = props

  if (rest.item.__typename !== 'DownloadableOrderItem') return <Prev {...rest} />

  return (
    <Prev
      {...rest}
      priceModifiers={[
        ...(rest.priceModifiers ?? []),
        ...filterNonNullableKeys(rest.item.downloadable_links)
          .sort((a, b) => a.sort_order - b.sort_order)
          .map<PriceModifier>((link) => ({
            key: link.uid,
            label: link.title,
          })),
      ]}
    />
  )
}
