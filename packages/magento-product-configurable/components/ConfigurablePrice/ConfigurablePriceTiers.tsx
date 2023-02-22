import {
  ProductPagePriceTiers,
  ProductPagePriceTiersProps,
} from '@graphcommerce/magento-product/components/ProductPagePrice/ProductPagePriceTiers'
import { ConfigurableOptionsFragment } from '../../graphql/ConfigurableOptions.gql'
import { useConfigurableOptionsSelection } from '../../hooks/useConfigurableOptionsSelection'

type ConfigurablePriceProps = {
  product: ConfigurableOptionsFragment
  index?: number
} & Omit<ProductPagePriceTiersProps, 'product'>

export function ConfigurablePriceTiers(props: ConfigurablePriceProps) {
  const { product, index = 0, ...rest } = props
  const { configured } = useConfigurableOptionsSelection({ url_key: product.url_key, index })

  const variant = configured?.configurable_product_options_selection?.variant
  if (!variant) return null

  return <ProductPagePriceTiers product={variant} {...rest} />
}
