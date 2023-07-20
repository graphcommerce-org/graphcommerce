import { mergeDeep } from '@graphcommerce/graphql'
import type { AddToCartItemSelector, ProductPageMeta } from '@graphcommerce/magento-product'
import type { IfConfig, ReactPlugin } from '@graphcommerce/next-config'
import { useConfigurableSelectedVariant } from '../hooks'

export const component = 'ProductPageMeta'
export const exported = '@graphcommerce/magento-product'
export const ifConfig: IfConfig = 'configurableVariantValues.url'

type PluginType = ReactPlugin<typeof ProductPageMeta, AddToCartItemSelector>

// @todo Wanneer updaten we de meta?
const ConfigurableProductPageMeta: PluginType = (props) => {
  const { Prev, product, index, ...rest } = props
  const variant = useConfigurableSelectedVariant({ url_key: product.url_key, index })

  return <Prev product={variant ? mergeDeep(product, variant) : product} {...rest} />
}

export const Plugin = ConfigurableProductPageMeta
