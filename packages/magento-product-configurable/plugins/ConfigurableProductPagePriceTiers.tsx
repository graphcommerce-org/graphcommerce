import type { ProductPagePriceFragment } from '@graphcommerce/magento-product'
import { ProductNameFragment } from '@graphcommerce/magento-product/components/ProductName/ProductName.gql'
import type { PluginProps } from '@graphcommerce/next-config'
import { useConfigurableOptionsSelection } from '../hooks'

export const component = 'ProductPagePriceTiers'
export const exported = '@graphcommerce/magento-product'

type ConfigurableProductPagePriceTiersProps = {
  product: ProductNameFragment & ProductPagePriceFragment
}

function ConfigurableProductPagePriceTiers(
  props: PluginProps<ConfigurableProductPagePriceTiersProps>,
) {
  const { Prev, product, ...rest } = props
  const variant = useConfigurableOptionsSelection({ url_key: product?.url_key, index: 0 })
    .configured?.configurable_product_options_selection?.variant

  if (!variant) return null

  return <Prev product={variant} {...rest} />
}
export const Plugin = ConfigurableProductPagePriceTiers
