import type { ProductPageDescriptionProps } from '@graphcommerce/magento-product'
import type { IfConfig, PluginProps } from '@graphcommerce/next-config'
import { ConfigurableOptionsFragment } from '../graphql/ConfigurableOptions.gql'
import { useConfigurableOptionsSelection } from '../hooks'

export const component = 'ProductPageDescription'
export const exported = '@graphcommerce/magento-product'
export const ifConfig: IfConfig = 'configurableVariantValues.description'

function ConfigurableProductPageDescription(
  props: PluginProps<
    ProductPageDescriptionProps & Partial<ConfigurableOptionsFragment> & { index?: number }
  >,
) {
  const { Prev, product, index = 0, ...rest } = props
  const variant = useConfigurableOptionsSelection({ url_key: product.url_key, index }).configured
    ?.configurable_product_options_selection?.variant

  const productToRender = variant?.description?.html?.length ? variant : product

  return <Prev product={productToRender} {...rest} />
}

export const Plugin = ConfigurableProductPageDescription
