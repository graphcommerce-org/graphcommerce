import type {
  AddToCartItemSelector,
  JsonLdProductFragment,
  ProductPageJsonLdProps,
} from '@graphcommerce/magento-product'
import type { IfConfig, PluginProps } from '@graphcommerce/next-config'
import { useConfigurableSelectedVariant } from '../../hooks'

export const component = 'ProductPageJsonLd'
export const exported = '@graphcommerce/magento-product'
export const ifConfig: IfConfig = 'configurableVariantValues.content'

const ConfigurableProductPageJsonLd = <
  T extends { '@type': string },
  P extends JsonLdProductFragment,
>(
  props: PluginProps<ProductPageJsonLdProps<T, P>> & AddToCartItemSelector,
) => {
  const { Prev, product, index, ...rest } = props
  const variant = useConfigurableSelectedVariant({ url_key: product.url_key, index })
  return <Prev product={(variant ?? product) as P} {...rest} />
}

export const Plugin = ConfigurableProductPageJsonLd
