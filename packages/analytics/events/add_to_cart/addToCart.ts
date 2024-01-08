import { AddProductsToCartMutationVariables } from '@graphcommerce/magento-product'
import { event } from '../../lib/event'
import { AddToCartFragment } from './AddToCartFragment.gql'

export const addToCart = (
  items: AddToCartFragment,
  variables: AddProductsToCartMutationVariables,
) => {
  const firstItem = items?.[0]
  if (!firstItem || !firstItem.prices || !firstItem.prices.row_total_including_tax.value)
    return undefined

  const pricePerItemInclTax = firstItem.prices.row_total_including_tax.value / firstItem.quantity
  const addToCartValue = pricePerItemInclTax * variables.cartItems[0].quantity

  return event('add_to_cart', {
    currency: items?.[0]?.prices?.price.currency,
    value: addToCartValue,
    items: [
      {
        item_id: firstItem.product.sku,
        item_name: firstItem.product.name,
        currency: firstItem.prices?.price.currency,
        price: pricePerItemInclTax,
        quantity: variables.cartItems[0].quantity,
        discount: firstItem.prices?.discounts?.reduce(
          (sum, discount) => sum + (discount?.amount?.value ?? 0),
          0,
        ),
      },
    ],
  })
}
