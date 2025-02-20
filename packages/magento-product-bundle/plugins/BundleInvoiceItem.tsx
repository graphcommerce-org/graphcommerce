import type { InvoiceItemProps } from '@graphcommerce/magento-customer'
import type { PluginConfig, PluginProps } from '@graphcommerce/next-config'
import { filterNonNullableKeys } from '@graphcommerce/next-ui'

export const config: PluginConfig = {
  type: 'component',
  module: '@graphcommerce/magento-customer',
}

export function InvoiceItem(props: PluginProps<InvoiceItemProps>) {
  const { Prev, ...rest } = props

  if (rest.item.__typename !== 'BundleInvoiceItem') return <Prev {...rest} />

  return (
    <Prev
      {...rest}
      priceModifiers={[
        ...(rest.priceModifiers ?? []),
        ...filterNonNullableKeys(rest.item.bundle_options).map((option) => ({
          key: option.uid,
          label: option.label,
          items: filterNonNullableKeys(option.values).map((value, index) => ({
            key: `${index}`,
            label: value.product_name,
            amount: value.price.value ?? 0,
            quantity: value.quantity,
          })),
        })),
      ]}
    />
  )
}
