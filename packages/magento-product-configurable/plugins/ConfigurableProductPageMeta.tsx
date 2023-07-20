import { mergeDeep } from '@graphcommerce/graphql'
import type { ProductPageMeta } from '@graphcommerce/magento-product'
import type { IfConfig, PluginProps } from '@graphcommerce/next-config'
import { useConfigurableOptionsSelection } from '../hooks'

export const component = 'ProductPageMeta'
export const exported = '@graphcommerce/magento-product'
export const ifConfig: IfConfig = 'configurableVariantValues.content'

// @todo
function ConfigurableProductPageMeta(
  props: PluginProps<React.ComponentProps<typeof ProductPageMeta>>,
) {
  const { Prev, product, ...rest } = props
  const variant = useConfigurableOptionsSelection({ url_key: product.url_key, index: 0 }).configured
    ?.configurable_product_options_selection?.variant

  return <Prev product={mergeDeep(product, variant)} {...rest} />
}
export const Plugin = ConfigurableProductPageMeta
