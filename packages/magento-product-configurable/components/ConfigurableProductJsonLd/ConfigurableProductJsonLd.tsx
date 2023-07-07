import { mergeDeep } from '@graphcommerce/graphql'
import {
  ProductPageGalleryProps,
  jsonLdProduct,
  jsonLdProductOffer,
} from '@graphcommerce/magento-product'
import { jsonLdProductReview } from '@graphcommerce/magento-review'
import { JsonLd } from '@graphcommerce/next-ui'
import { ConfigurableOptionsFragment } from '../../graphql/ConfigurableOptions.gql'
import { useConfigurableOptionsSelection } from '../../hooks/useConfigurableOptionsSelection'

type ConfigurableProductJsonLdProps = ProductPageGalleryProps & {
  index?: number
  product?: ConfigurableOptionsFragment
}

/** Compatible with any product type, but will switch the image when used for a ConfigurableProduct */
export function ConfigurableProductJsonLd(props: ConfigurableProductJsonLdProps) {
  const { product, index = 0 } = props

  const { configured } = useConfigurableOptionsSelection({ url_key: product?.url_key, index })
  const simpleProduct = mergeDeep(
    props,
    configured?.configurable_product_options_selection?.variant,
  )
  const variant = simpleProduct ?? product

  if (!variant) return null

  return (
    <JsonLd
      item={{
        '@context': 'https://schema.org',
        ...jsonLdProduct(variant),
        ...jsonLdProductOffer(variant),
        ...jsonLdProductReview(variant),
      }}
    />
  )
}
