import type { FetchResult } from '@graphcommerce/graphql'
import {
  AddProductsToCartFields,
  AddProductsToCartMutation,
  findAddedItems,
  toUserErrors,
} from '@graphcommerce/magento-product'
import { nonNullable } from '@graphcommerce/next-ui'
import { event } from '../../lib/event'

export const addToCart = (
  result: FetchResult<AddProductsToCartMutation>,
  variables: AddProductsToCartFields,
) => {
  const { data, errors } = result
  const cart = data?.addProductsToCart?.cart

  const addedItems = findAddedItems(data, variables)

  const items = addedItems
    .map(({ itemVariable, itemInCart }) => {
      if (!itemInCart) return null
      const { product, prices } = itemInCart
      return {
        item_id: product.sku,
        item_name: product.name,
        currency: prices?.price.currency,
        price: (prices?.row_total_including_tax.value ?? 1) / itemInCart.quantity,
        quantity: itemVariable.quantity,
        discount: prices?.discounts?.reduce(
          (sum, discount) => sum + (discount?.amount?.value ?? 0) / itemVariable.quantity,
          0,
        ),
      }
    })
    .filter(nonNullable)

  const userErrors = toUserErrors(result.data)
  if ((errors && errors.length > 0) || userErrors.length > 0) {
    event('add_to_cart_error', {
      userErrors: userErrors?.map((e) => e.message),
      errors: errors?.map((e) => e.message),
      variables,
    })
  }

  if (!items.length) return

  event('add_to_cart', {
    currency: cart?.prices?.grand_total?.currency,
    value: addedItems.reduce(
      (sum, { itemVariable, itemInCart }) =>
        sum + (itemInCart?.prices?.row_total_including_tax.value ?? 1) / itemVariable.quantity,
      0,
    ),
    items,
  })
}
