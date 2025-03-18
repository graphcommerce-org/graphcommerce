import type { InvoiceItemProps } from '@graphcommerce/magento-customer'
import type { PluginConfig, PluginProps } from '@graphcommerce/next-config'
import { ProductPageGiftCard } from '../components/ProductPageGiftCard/ProductPageGiftCard'

export const config: PluginConfig = {
  type: 'component',
  module: '@graphcommerce/magento-customer',
}

export function InvoiceItem(props: PluginProps<InvoiceItemProps>) {
  const { Prev, item, additionalInfo } = props

  return <Prev {...props} item={item} additionalInfo={additionalInfo} />
}
