import type { AddToCartItemSelector, ProductPageJsonLdProps } from '@graphcommerce/magento-product'
import type { IfConfig, PluginProps } from '@graphcommerce/next-config'
import { useConfigurableSelectedVariant } from '../../hooks'

export const component = 'ProductPageJsonLd'
export const exported = '@graphcommerce/magento-product/components/JsonLdProduct/ProductPageJsonLd'
export const ifConfig: IfConfig = 'configurableVariantValues.content'

const ConfigurableProductPageJsonLd = <T extends { '@type': string }>(
  props: PluginProps<ProductPageJsonLdProps<T>> & AddToCartItemSelector,
) => {
  const { Prev, product, index, ...rest } = props
  const variant = useConfigurableSelectedVariant({ url_key: product.url_key, index })
  return <Prev product={variant ?? product} {...rest} />
}

export const Plugin = ConfigurableProductPageJsonLd
