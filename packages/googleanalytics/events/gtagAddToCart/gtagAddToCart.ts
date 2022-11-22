import { FetchResult } from '@graphcommerce/graphql'
import {
  AddProductsToCartMutation,
  AddProductsToCartMutationVariables,
} from '@graphcommerce/magento-product'

export const gtagAddToCart = (
  result: FetchResult<AddProductsToCartMutation>,
  variables: AddProductsToCartMutationVariables,
) => {
  if (process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS) {
    const addedItem = result.data?.addProductsToCart?.cart.items?.slice(-1)[0]
    // @todo, currently only has support for adding one item at a time
    // @paul: price is price excl btw

    globalThis.gtag?.('event', 'add_to_cart', {
      currency: addedItem?.prices?.price.currency,
      value: addedItem?.prices?.price.value,
      items: [
        {
          item_id: addedItem?.product.sku,
          item_name: addedItem?.product.name,
          currency: addedItem?.prices?.price.currency,
          price: addedItem?.prices?.price.value,
          quantity: variables.cartItems[0].quantity,
        },
      ],
    })

    console.clear()
    console.log(addedItem?.prices?.price.value)
    console.log({ addedItem })

    // console.log('added', {
    //   currency: addedItem?.prices?.price.currency,
    //   value: addedItem?.prices?.price.value,
    //   items: [
    //     {
    //       item_id: addedItem?.product.sku,
    //       item_name: addedItem?.product.name,
    //       currency: addedItem?.prices?.price.currency,
    //       price: addedItem?.prices?.price.value,
    //       quantity: addedItem?.quantity,
    //     },
    //   ],
    // })
  }
}
