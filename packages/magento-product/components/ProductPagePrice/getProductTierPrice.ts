import type { MoneyFragment } from '@graphcommerce/magento-store'
import type { ProductPagePriceFragment } from './ProductPagePrice.gql'

export function getProductTierPrice(
  price: Pick<ProductPagePriceFragment, 'price_tiers'>,
  quantity: number,
): MoneyFragment | undefined {
  const { price_tiers } = price
  let result

  price_tiers?.forEach((priceTier) => {
    if (priceTier?.quantity && quantity >= priceTier?.quantity) {
      result = priceTier?.final_price
    }
  })

  return result
}
