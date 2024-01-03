import type { FetchResult } from '@graphcommerce/graphql'
import {
  AddProductsToCartMutation,
  AddProductsToCartMutationVariables,
} from '@graphcommerce/magento-product'

export const dataLayerAddToCart = (
  result: FetchResult<AddProductsToCartMutation>,
  variables: AddProductsToCartMutationVariables,
) => {
  const addedItem = result.data?.addProductsToCart?.cart.items?.slice(-1)[0]

  if (addedItem && addedItem.prices && addedItem.prices.row_total_including_tax.value) {
    // we need to manually calculate pricePerItemInclTax (https://github.com/magento/magento2/issues/33848)
    const pricePerItemInclTax = addedItem.prices.row_total_including_tax.value / addedItem.quantity
    const addToCartValue = pricePerItemInclTax * variables.cartItems[0].quantity

    globalThis.dataLayer.push({
      event: 'add_to_cart',
      ecommerce: {
        currency: addedItem?.prices?.price.currency,
        value: addToCartValue,
        items: [
          {
            item_id: addedItem?.product.sku,
            item_name: addedItem?.product.name,
            currency: addedItem?.prices?.price.currency,
            price: pricePerItemInclTax,
            quantity: variables.cartItems[0].quantity,
            discount: addedItem?.prices?.discounts?.reduce(
              // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
              (sum, discount) => sum + (discount?.amount?.value ?? 0),
              0,
            ),
          },
        ],
      },
    })
  }
}
