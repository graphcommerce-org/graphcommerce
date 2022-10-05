import { FetchResult } from '@graphcommerce/graphql'
import {
  AddProductsToCartMutation,
  AddProductsToCartMutationVariables,
} from '@graphcommerce/magento-product'
import { GtagAddToCartFragment } from './GtagAddToCart.gql'

// @todo add types
// @todo some thing still needs to be done for configurables and bundles as you can have multiple items of the same SKU in your cart, but with different configurations/prices
// F.E. 'sock-red' has 2 variants, 'sock-red:small' (€ 5) and 'sock-red:large' (€ 7,50). At this time we dont know the value of the item added if multiple variants are added
export const gtagAddToCart = (
  result: FetchResult<AddProductsToCartMutation>,
  variables: AddProductsToCartMutationVariables,
) => {
  if (process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS) {
    const addedItem = result.data?.addProductsToCart?.cart.items?.slice(-1)[0]

    // console.log(result.data?.addProductsToCart, variables)
    // console.log({
    //   currency,
    //   value,
    //   items,
    // })
  }
}
