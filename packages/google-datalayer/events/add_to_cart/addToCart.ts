import { AddProductsToCartMutationVariables } from '@graphcommerce/magento-product'
import { nonNullable } from '@graphcommerce/next-ui'
import { event } from '../../lib/event'
import { AddToCartFragment } from './AddToCartFragment.gql'

export const addToCart = (
  cart: AddToCartFragment,
  variables: AddProductsToCartMutationVariables,
) => {
  const itemsInCart = variables.cartItems.map((request) => ({
    request,
    result: cart.items?.find((item) => item?.product.sku === request.sku),
  }))

  return event('add_to_cart', {
    currency: cart.prices?.grand_total?.currency,
    value: itemsInCart.reduce(
      (sum, { request, result }) =>
        sum + (result?.prices?.row_total_including_tax.value ?? 1) / request.quantity,
      0,
    ),
    items: itemsInCart
      .map(({ request, result }) => {
        if (!result) return null
        const { product, prices } = result
        return {
          item_id: product.sku,
          item_name: product.name,
          currency: prices?.price.currency,
          price: (prices?.row_total_including_tax.value ?? 1) / request.quantity,
          quantity: request.quantity,
          discount: prices?.discounts?.reduce(
            (sum, discount) => sum + (discount?.amount?.value ?? 0) / request.quantity,
            0,
          ),
        }
      })
      .filter(nonNullable),
  })
}
