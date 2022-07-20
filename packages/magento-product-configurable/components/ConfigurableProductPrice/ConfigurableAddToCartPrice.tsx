import { Money } from '@graphcommerce/magento-store'
import { useConfigurableTypeProduct } from '../../hooks/useConfigurableTypeProduct'

export function ConfigurableAddToCartPrice() {
  const { configurable_product_options_selection, price_range } = useConfigurableTypeProduct()

  const regular_price =
    configurable_product_options_selection?.variant?.price_range.minimum_price.final_price ??
    price_range.minimum_price.final_price

  return <Money {...regular_price} />
}
