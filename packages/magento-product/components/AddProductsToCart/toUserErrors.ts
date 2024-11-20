import type { CartUserInputError } from '@graphcommerce/graphql-mesh'
import { filterNonNullableKeys } from '@graphcommerce/next-ui'
import type { AddProductsToCartMutation } from './AddProductsToCart.gql'

export function toUserErrors(data?: AddProductsToCartMutation | null): CartUserInputError[] {
  const cartItemErrors = filterNonNullableKeys(data?.addProductsToCart?.cart.items)
    .map((i) => i.errors)
    .flat(1)
    .map((e) => e?.message)
  return filterNonNullableKeys(data?.addProductsToCart?.user_errors).filter(
    (ue) => !cartItemErrors.includes(ue.message),
  )
}
