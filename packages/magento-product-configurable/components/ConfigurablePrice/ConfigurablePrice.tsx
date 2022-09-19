import { Money } from '@graphcommerce/magento-store'
import { ConfigurableOptionsFragment } from '../../graphql/ConfigurableOptions.gql'
import { useConfigurableOptionsSelection } from '../../hooks/useConfigurableOptionsSelection'

type ConfigurablePriceProps = {
  product: ConfigurableOptionsFragment
  index?: number
}

export function ConfigurablePrice(props: ConfigurablePriceProps) {
  const { product, index = 0 } = props
  const { configured } = useConfigurableOptionsSelection({ url_key: product.url_key, index })

  const regular_price =
    configured?.configurable_product_options_selection?.variant?.price_range.minimum_price
      .final_price ?? product.price_range?.minimum_price.final_price

  return <Money {...regular_price} />
}
