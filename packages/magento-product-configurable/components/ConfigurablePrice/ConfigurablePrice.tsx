import { ProductPagePriceFragment } from '@graphcommerce/magento-product'
import { Money } from '@graphcommerce/magento-store'
import { useConfigurableTypeProduct } from '../../hooks/useConfigurableTypeProduct'

export function ConfigurablePrice(props: ProductPagePriceFragment) {
  const { price_range } = props
  const { typeProduct } = useConfigurableTypeProduct()

  const regular_price =
    typeProduct.configurable_product_options_selection?.variant?.price_range.minimum_price
      .final_price ?? price_range.minimum_price.final_price

  return <Money {...regular_price} />
}
