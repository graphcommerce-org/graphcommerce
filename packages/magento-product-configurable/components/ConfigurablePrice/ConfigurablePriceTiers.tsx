import {
  ProductPagePriceTiers
} from '@graphcommerce/magento-product/components/ProductPagePrice/ProductPagePriceTiers';
import { ConfigurableOptionsFragment } from '../../graphql/ConfigurableOptions.gql'
import { useConfigurableOptionsSelection } from '../../hooks/useConfigurableOptionsSelection'

type ConfigurablePriceProps = {
  product: ConfigurableOptionsFragment
  index?: number
}

export function ConfigurablePriceTiers(props: ConfigurablePriceProps) {
  const { product, index = 0 } = props
  const { configured } = useConfigurableOptionsSelection({ url_key: product.url_key, index })

  const price_tiers = configured?.configurable_product_options_selection?.variant?.price_tiers;
  const price_range = configured?.configurable_product_options_selection?.variant?.price_range;

  if (!price_tiers || !price_range) {
    return null;
  }

  return <ProductPagePriceTiers price_range={price_range} price_tiers={price_tiers}/>
}
