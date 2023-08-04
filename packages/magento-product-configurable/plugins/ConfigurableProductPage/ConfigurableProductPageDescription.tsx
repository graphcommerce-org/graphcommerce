import type { AddToCartItemSelector, ProductPageDescription } from '@graphcommerce/magento-product'
import type { IfConfig, ReactPlugin } from '@graphcommerce/next-config'
import { useConfigurableSelectedVariant } from '../../hooks'

export const component = 'ProductPageDescription'
export const exported =
  '@graphcommerce/magento-product/components/ProductPageDescription/ProductPageDescription'
export const ifConfig: IfConfig = 'configurableVariantValues.content'

type PluginType = ReactPlugin<typeof ProductPageDescription, AddToCartItemSelector>

export const ConfigurableProductPageDescription: PluginType = (props) => {
  const { Prev, product, index, ...rest } = props
  const variant = useConfigurableSelectedVariant({ url_key: product.url_key, index })

  return (
    <Prev
      product={{
        ...product,
        description: variant?.description?.html ? variant?.description : product.description,
        short_description: variant?.short_description?.html
          ? variant?.short_description
          : product.short_description,
      }}
      {...rest}
    />
  )
}

export const Plugin = ConfigurableProductPageDescription
