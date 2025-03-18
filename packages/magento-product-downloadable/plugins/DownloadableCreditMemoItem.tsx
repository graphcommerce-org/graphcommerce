import type { CreditMemoItemProps } from '@graphcommerce/magento-customer'
import type { PluginConfig, PluginProps } from '@graphcommerce/next-config'
import { filterNonNullableKeys } from '@graphcommerce/next-ui'

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
        ...filterNonNullableKeys(rest.item.downloadable_links).map((link) => ({
          key: link.uid,
          label: link.title,
          items: filterNonNullableKeys(link.values).map((value, index) => ({
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
