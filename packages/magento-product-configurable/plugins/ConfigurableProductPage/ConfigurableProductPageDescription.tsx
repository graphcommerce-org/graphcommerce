import type {
  AddToCartItemSelector,
  ProductPageDescriptionProps,
} from '@graphcommerce/magento-product'
import type { IfConfig, PluginProps } from '@graphcommerce/next-config'
import { useConfigurableSelectedVariant } from '../../hooks'

export const component = 'ProductPageDescription'
export const exported = '@graphcommerce/magento-product'
export const ifConfig: IfConfig = 'configurableVariantValues.content'

export const ConfigurableProductPageDescription = (
  props: PluginProps<ProductPageDescriptionProps & AddToCartItemSelector>,
) => {
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
