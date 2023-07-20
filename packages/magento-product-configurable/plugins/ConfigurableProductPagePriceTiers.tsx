import type { ProductPagePriceTiers } from '@graphcommerce/magento-product'
import type { PluginProps } from '@graphcommerce/next-config'
import { useConfigurableOptionsSelection } from '../hooks'

export const component = 'ProductPagePriceTiers'
export const exported = '@graphcommerce/magento-product'

function ConfigurableProductPagePriceTiers(
  props: PluginProps<React.ComponentProps<typeof ProductPagePriceTiers>>,
) {
  const { Prev, product, ...rest } = props
  const variant = useConfigurableOptionsSelection({ url_key: product.url_key, index: 0 }).configured
    ?.configurable_product_options_selection?.variant

  if (!variant) return null

  return <Prev product={variant} {...rest} />
}
export const Plugin = ConfigurableProductPagePriceTiers
