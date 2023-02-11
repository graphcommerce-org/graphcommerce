import { MoneyFragment } from '@graphcommerce/magento-store';
import { ProductPagePriceFragment } from './ProductPagePrice.gql';

export function getProductTierPrice(
  price: ProductPagePriceFragment,
  quantity: number,
): MoneyFragment | undefined {
  const { price_tiers } = price;
  let result;

  price_tiers?.forEach(priceTier => {
    if (priceTier?.quantity && quantity >= priceTier?.quantity) {
      result = priceTier?.final_price;
    }
  });

  return result;
}
