import { type ProductPagePrice } from '@graphcommerce/magento-product'
import type { PluginProps } from '@graphcommerce/next-config'
import { useConfigurableOptionsSelection } from '../hooks'

export const component = 'ProductPagePrice'
export const exported = '@graphcommerce/magento-product'

function ConfigurableProductPagePrice(
  props: PluginProps<React.ComponentProps<typeof ProductPagePrice>>,
) {
  const { Prev, product, index = 0 } = props
  const { configured } = useConfigurableOptionsSelection({ url_key: product.url_key, index })
  const variant = configured?.configurable_product_options_selection?.variant

  return <Prev product={variant ?? product} />
}
export const Plugin = ConfigurableProductPagePrice
