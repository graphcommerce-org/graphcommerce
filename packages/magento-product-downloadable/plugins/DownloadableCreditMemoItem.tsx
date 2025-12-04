import type { CreditMemoItemProps } from '@graphcommerce/magento-customer'
import type { PluginConfig, PluginProps } from '@graphcommerce/next-config'
import { filterNonNullableKeys } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react/macro'

export const config: PluginConfig = {
  type: 'component',
  module: '@graphcommerce/magento-customer',
}

export function CreditMemoItem(props: PluginProps<CreditMemoItemProps>) {
  const { Prev, ...rest } = props

  if (rest.item.__typename !== 'DownloadableCreditMemoItem') return <Prev {...rest} />

  return (
    <Prev
      {...rest}
      priceModifiers={[
        ...(rest.priceModifiers ?? []),
        {
          key: 'downloadable-links',
          label: <Trans>Downloads</Trans>,
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
