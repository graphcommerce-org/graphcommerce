import { jsonLdProduct, jsonLdProductOffer } from '@graphcommerce/magento-product/components'
// import { jsonLdProductReview } from '@graphcommerce/magento-review'
import { JsonLd } from '@graphcommerce/next-ui'
import { ConfigurableOptionsFragment } from '../../graphql/ConfigurableOptions.gql'
import { useConfigurableOptionsSelection } from '../../hooks/useConfigurableOptionsSelection'

type ConfigurableJsonLdProps = {
  product: ConfigurableOptionsFragment
  index?: number
}

export function ConfigurableJsonLd(props: ConfigurableJsonLdProps) {
  const { product, index = 0 } = props
  const { configured } = useConfigurableOptionsSelection({ url_key: product?.url_key, index })
  const selectedOption = configured?.configurable_product_options_selection?.variant

  return (
    <JsonLd
      item={{
        '@context': 'https://schema.org',
        ...jsonLdProduct(selectedOption ?? product),
        ...jsonLdProductOffer(selectedOption ?? product),
        // TODO: make reviews available for configurable products
        // ...jsonLdProductReview(selectedOption ?? product),
      }}
    />
  )
}
