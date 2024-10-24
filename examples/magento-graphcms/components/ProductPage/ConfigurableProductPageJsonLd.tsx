import {
  AddToCartItemSelector,
  ProductPageJsonLd,
  jsonLdProduct,
  jsonLdProductOffer,
} from '@graphcommerce/magento-product'
import { useConfigurableSelectedVariant } from '@graphcommerce/magento-product-configurable'
import { jsonLdProductReview } from '@graphcommerce/magento-review'
import { isTypename } from '@graphcommerce/next-ui'
import { ProductPage2Query } from '../../graphql/ProductPage2.gql'

type ConfigurableProductPageJsonLdProps = {
  product: NonNullable<NonNullable<NonNullable<ProductPage2Query['products']>['items']>[number]>
} & AddToCartItemSelector

export function ConfigurableProductPageJsonLd(props: ConfigurableProductPageJsonLdProps) {
  const { product: currentProduct, index = 0 } = props

  const variant = useConfigurableSelectedVariant({ url_key: currentProduct?.url_key, index })
  const product = variant || currentProduct
  const isConfigurableProduct = isTypename(product, ['ConfigurableProduct'])

  const shouldRender =
    !import.meta.graphCommerce.configurableVariantForSimple || !isConfigurableProduct || variant

  if (shouldRender) {
    return (
      <ProductPageJsonLd
        product={product}
        render={(p) => ({
          '@context': 'https://schema.org',
          ...jsonLdProduct(p),
          ...jsonLdProductOffer(p),
          ...jsonLdProductReview(p),
        })}
      />
    )
  }

  return null
}
