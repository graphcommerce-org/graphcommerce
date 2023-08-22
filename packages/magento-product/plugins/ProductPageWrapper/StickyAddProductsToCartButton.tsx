import type { IfConfig, ReactPlugin } from '@graphcommerce/next-config'
import { AddProductsToCartButton, AddToCartItemSelector, StickyAddToCart } from '../../components'

export const component = 'ProductPageWrapper'
export const exported =
  '@graphcommerce/magento-product/components/ProductPageWrapper/ProductPageWrapper'
// export const ifConfig: IfConfig = 'configurableVariantValues.content'

type PluginType = ReactPlugin<typeof AddProductsToCartButton>

const StickyAddProductsToCartButton: PluginType = (props) => {
  const { Prev, product, children, ...rest } = props

  return (
    <>
      <Prev product={product} {...rest}>
        {children}
      </Prev>
      <StickyAddToCart product={product} />
    </>
  )
}

export const Plugin = StickyAddProductsToCartButton
