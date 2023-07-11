import {
  ProductPagePriceProps,
  getProductTierPrice,
  useFormAddProductsToCart,
} from '@graphcommerce/magento-product'
import { Money } from '@graphcommerce/magento-store'
import type { PluginProps } from '@graphcommerce/next-config'
import { useWatch } from '@graphcommerce/react-hook-form'
import { ConfigurableOptionsFragment } from '../graphql/ConfigurableOptions.gql'
import { useConfigurableOptionsSelection } from '../hooks'

export const component = 'ProductPagePrice'
export const exported = '@graphcommerce/magento-product'

type ConfigurablePriceProps = ProductPagePriceProps & {
  product: ConfigurableOptionsFragment
  index?: number
}

function ConfigurablePrice(props: PluginProps<ConfigurablePriceProps>) {
  const { product, index = 0 } = props
  const { configured } = useConfigurableOptionsSelection({ url_key: product.url_key, index })
  const { control } = useFormAddProductsToCart()
  const quantity = useWatch({ control, name: `cartItems.${index}.quantity` })

  const regular_price =
    configured?.configurable_product_options_selection?.variant?.price_range.minimum_price
      .final_price ?? product.price_range?.minimum_price.final_price

  const price_tiers = configured?.configurable_product_options_selection?.variant?.price_tiers
  const price = getProductTierPrice({ price_tiers }, quantity) ?? regular_price

  return <Money {...price} />
}
export const Plugin = ConfigurablePrice
