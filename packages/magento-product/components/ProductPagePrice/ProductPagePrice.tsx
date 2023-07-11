import { useWatch } from '@graphcommerce/ecommerce-ui'
import { Money } from '@graphcommerce/magento-store'
import { useFormAddProductsToCart } from '../AddProductsToCart'
import { ProductPagePriceFragment } from './ProductPagePrice.gql'
import { getProductTierPrice } from './getProductTierPrice'

export type ProductPagePriceProps = { product: ProductPagePriceFragment; index?: number }

export function ProductPagePrice(props: ProductPagePriceProps) {
  const { product, index = 0 } = props

  const { control } = useFormAddProductsToCart()
  const quantity = useWatch({ control, name: `cartItems.${index}.quantity` })
  const price =
    getProductTierPrice(product, quantity) ?? product.price_range.minimum_price.final_price

  return <Money {...price} />
}
