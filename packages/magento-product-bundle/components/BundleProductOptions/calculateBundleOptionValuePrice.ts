import type { CurrencyEnum } from '@graphcommerce/graphql-mesh'
import type { ProductListPriceFragment } from '@graphcommerce/magento-product/components'
import type { BundleProductItemOptionType, BundleProductItemType, BundleProductType } from './types'

export type CalculatedBundleOptionValuePrice = [number, number] // [regularPrice, finalPrice]

export function calculateBundleOptionValuePrice(
  product: BundleProductType,
  item: BundleProductItemType,
  option: BundleProductItemOptionType,
  quantity = 1,
): CalculatedBundleOptionValuePrice {
  const { dynamic_price = false } = product
  const precentOff = item?.price_range.minimum_price.discount?.percent_off ?? 0

  const regularPrice =
    (dynamic_price ? option.product?.price_range.minimum_price.final_price.value : option.price) ??
    0

  const finalPrice = regularPrice * (1 - precentOff / 100)
  return [regularPrice * quantity, finalPrice * quantity]
}

export function sumCalculatedBundleOptionValuePrices(
  prices: CalculatedBundleOptionValuePrice[],
): CalculatedBundleOptionValuePrice {
  return prices.reduce((acc, [regular, final]) => [acc[0] + regular, acc[1] + final], [0, 0])
}

export function substractCalculatedBundleOptionValuePrices(
  basePrice: CalculatedBundleOptionValuePrice,
  substractPrice: CalculatedBundleOptionValuePrice,
): CalculatedBundleOptionValuePrice {
  return [basePrice[0] - substractPrice[0], basePrice[1] - substractPrice[1]]
}

export function toProductListPriceFragment(
  price: CalculatedBundleOptionValuePrice,
  currency: CurrencyEnum | null | undefined,
): ProductListPriceFragment {
  return {
    regular_price: { currency: currency, value: price[0] },
    final_price: { currency, value: price[1] },
  }
}
