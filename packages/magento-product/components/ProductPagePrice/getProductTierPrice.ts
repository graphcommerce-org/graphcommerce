import type { MoneyFragment } from '@graphcommerce/magento-store'
import { filterNonNullableKeys } from '@graphcommerce/next-ui'
import type { ProductPagePriceFragment } from './ProductPagePrice.gql'

export function getProductTierPrice(
  price: Pick<ProductPagePriceFragment, 'price_tiers'>,
  quantity: number,
): MoneyFragment | undefined | null {
  const { price_tiers } = price
  let result: MoneyFragment | undefined | null

  filterNonNullableKeys(price_tiers, ['quantity', 'final_price'])?.forEach((priceTier) => {
    if (quantity >= priceTier.quantity)
      result = {
        value: (priceTier.final_price.value ?? 0) / priceTier.quantity,
        currency: priceTier.final_price.currency,
      }
  })

  return result
}
