import { mergeDeep } from '@graphcommerce/graphql'
import type { ProductPageDescription } from '@graphcommerce/magento-product'
import type { IfConfig, PluginProps } from '@graphcommerce/next-config'
import { useConfigurableOptionsSelection } from '../hooks'

export const component = 'ProductPageDescription'
export const exported = '@graphcommerce/magento-product'
export const ifConfig: IfConfig = 'configurableVariantValues.content'

function ConfigurableProductPageDescription(
  props: PluginProps<React.ComponentProps<typeof ProductPageDescription>>,
) {
  const { Prev, product, ...rest } = props
  const variant = useConfigurableOptionsSelection({ url_key: product.url_key, index: 0 }).configured
    ?.configurable_product_options_selection?.variant

  return <Prev product={mergeDeep(product, variant)} {...rest} />
}

export const Plugin = ConfigurableProductPageDescription
