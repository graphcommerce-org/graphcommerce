import type { UseFormGqlMutationReturn } from '@graphcommerce/ecommerce-ui'
import type { CartItemInput } from '@graphcommerce/graphql-mesh'
import { createContext, useContext } from 'react'
import type { LiteralUnion } from 'type-fest'
import type { AddProductsToCartMutation } from './AddProductsToCart.gql'

export type RedirectType = LiteralUnion<'added' | undefined | false, `/${string}`>

type Item = CartItemInput & {
  /**
   * The value of the selected_options_record values will be added to the selected_options array.
   *
   * This format exists to prevent name collisions and without having to select by index in the
   * selected_options array.
   */
  selected_options_record?: Record<string, string | string[]>
  /**
   * The value of the entered_options_record entries will be coverted to entries for the
   * entered_options array.
   *
   * This format exists to prevent name collisions and without having to select by index in the
   * entered_options array.
   */
  entered_options_record?: Record<string, string | number | Date>

  /**
   * If the sku is present in a cartItem we consider the cartItem to be included in the submission.
   *
   * In `useAddProductsToCartAction` the sku of the product is set. This allows to determine which
   * product to add to the cart depending on which button is pressed. This usecase is relevant when
   * adding products from a list that are wrapped in a single form.
   *
   * In the usecase where the product is always known (like on the product page), we don't want to
   * reset the sku. For example for grouped products we always want to add variants of the product.
   */
  keep_sku?: boolean
}

export type AddProductsToCartFields = {
  cartId: string
  cartItems: Item[]
  redirect: RedirectType
}

/** https://react-hook-form.com/api/useform/watch/ */
export type AddProductsToCartContextType = Omit<
  UseFormGqlMutationReturn<AddProductsToCartMutation, AddProductsToCartFields>,
  'formState' | 'watch'
>

export type AddToCartItemSelector = { index?: number }

export const AddProductsToCartContext = createContext(
  undefined as AddProductsToCartContextType | undefined,
)

export function useFormAddProductsToCart(optional: true): AddProductsToCartContextType | undefined
export function useFormAddProductsToCart(optional?: false): AddProductsToCartContextType
export function useFormAddProductsToCart(optional = false) {
  const context = useContext(AddProductsToCartContext)

  if (!optional && typeof context === 'undefined') {
    throw Error(
      'useFormAddProductsToCart must be used within a AddProductsToCartForm or provide the optional=true argument',
    )
  }
  return context
}
