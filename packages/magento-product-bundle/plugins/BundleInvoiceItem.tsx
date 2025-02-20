import type { InvoiceItemProps } from '@graphcommerce/magento-customer'
import type { PluginConfig, PluginProps } from '@graphcommerce/next-config'

export const config: PluginConfig = {
  type: 'component',
  module: '@graphcommerce/magento-customer',
}

export function InvoiceItem(props: PluginProps<InvoiceItemProps>) {
  const { Prev, item, additionalInfo, ...rest } = props

  return (
    <Prev
      item={item}
      additionalInfo={
        <>
          {additionalInfo}
          {item.__typename === 'BundleInvoiceItem' && <>Hi</>}
        </>
      }
      {...rest}
    />
  )
}
