import type { InvoiceItemProps } from '@graphcommerce/magento-customer'
import type { PluginConfig, PluginProps } from '@graphcommerce/next-config'
import { filterNonNullableKeys } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/macro'

export const config: PluginConfig = {
  type: 'component',
  module: '@graphcommerce/magento-customer',
}

export function InvoiceItem(props: PluginProps<InvoiceItemProps>) {
  const { Prev, ...rest } = props

  if (rest.item.__typename !== 'DownloadableInvoiceItem') return <Prev {...rest} />

  return (
    <Prev
      {...rest}
      priceModifiers={[
        ...(rest.priceModifiers ?? []),
        {
          key: 'downloadable-links',
          label: <Trans id='Downloads'>Downloads</Trans>,
          items: filterNonNullableKeys(rest.item.downloadable_links)
            .sort((a, b) => a.sort_order - b.sort_order)
            .map((link) => ({
              key: link.uid,
              label: link.title,
            })),
        },
      ]}
    />
  )
}
