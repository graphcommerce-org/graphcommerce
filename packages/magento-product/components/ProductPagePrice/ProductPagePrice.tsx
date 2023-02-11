import { useWatch } from '@graphcommerce/ecommerce-ui';
import { Money } from '@graphcommerce/magento-store';
import { useFormAddProductsToCart } from '../AddProductsToCart';
import { ProductPagePriceFragment } from './ProductPagePrice.gql';
import { getProductTierPrice } from './getProductTierPrice';

type ProductPagePriceProps = ProductPagePriceFragment;

export function ProductPagePrice(props: ProductPagePriceProps) {
  const { price_tiers, price_range } = props;

  const index = 0;
  const { control } = useFormAddProductsToCart();
  const quantity = useWatch({ control, name: `cartItems.${index}.quantity` });
  const price = getProductTierPrice({ price_tiers, price_range }, quantity) ?? price_range.minimum_price.final_price;

  return (
    <Money { ...price } />
  )
}
