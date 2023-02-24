import { useWatch } from '@graphcommerce/ecommerce-ui';
import { getProductTierPrice, useFormAddProductsToCart } from '@graphcommerce/magento-product';
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
  const { control } = useFormAddProductsToCart();
  const quantity = useWatch({ control, name: `cartItems.${index}.quantity` });

  const regular_price =
    configured?.configurable_product_options_selection?.variant?.price_range.minimum_price
      .final_price ?? product.price_range?.minimum_price.final_price

  const price_tiers = configured?.configurable_product_options_selection?.variant?.price_tiers
  const price = getProductTierPrice({ price_tiers }, quantity) ?? regular_price;

  return <Money {...price} />
}
