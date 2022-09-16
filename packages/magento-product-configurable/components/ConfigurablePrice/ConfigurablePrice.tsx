import { Money } from '@graphcommerce/magento-store'
import { ConfigurableOptionsFragment } from '../../graphql/ConfigurableOptions.gql'
import { useConfigurableTypeProduct } from '../../hooks/useConfigurableTypeProduct'

type ConfigurablePriceProps = {
  product: ConfigurableOptionsFragment
}

export function ConfigurablePrice(props: ConfigurablePriceProps) {
  const { product } = props
  const { configured } = useConfigurableTypeProduct()

  const regular_price =
    configured?.configurable_product_options_selection?.variant?.price_range.minimum_price
      .final_price ?? product.price_range?.minimum_price.final_price

  return <Money {...regular_price} />
}
