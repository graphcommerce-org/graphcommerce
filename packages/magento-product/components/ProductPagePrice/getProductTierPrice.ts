import type { MoneyFragment } from '@graphcommerce/magento-store'
import type { ProductPagePriceFragment } from './ProductPagePrice.gql'

export function getProductTierPrice(
  price: Pick<ProductPagePriceFragment, 'price_tiers'>,
  quantity: number,
): MoneyFragment | undefined | null {
  const { price_tiers } = price
  let result: MoneyFragment | undefined | null

  price_tiers?.forEach((priceTier) => {
    if (priceTier?.quantity && quantity >= priceTier?.quantity) result = priceTier?.final_price
  })

  return result
}
