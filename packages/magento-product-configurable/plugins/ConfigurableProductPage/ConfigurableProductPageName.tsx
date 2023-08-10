import type { AddToCartItemSelector, ProductPageName } from '@graphcommerce/magento-product'
import type { IfConfig, ReactPlugin } from '@graphcommerce/next-config'
import { useConfigurableSelectedVariant } from '../../hooks'

export const component = 'ProductPageName'
export const exported = '@graphcommerce/magento-product/components/ProductPageName/ProductPageName'
export const ifConfig: IfConfig = 'configurableVariantValues.content'

type PluginType = ReactPlugin<typeof ProductPageName, AddToCartItemSelector>

const ConfigurableProductPageName: PluginType = (props) => {
  const { Prev, product, index, ...rest } = props
  const variant = useConfigurableSelectedVariant({ url_key: product.url_key, index })
  return <Prev product={variant ?? product} {...rest} />
}

export const Plugin = ConfigurableProductPageName
