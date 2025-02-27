import type { UseFormGqlMutationReturn } from '@graphcommerce/ecommerce-ui'
import type { EnteredOptionInput } from '@graphcommerce/graphql-mesh'
import { createContext, useContext } from 'react'
import type { LiteralUnion, Simplify } from 'type-fest'
import type {
  AddProductsToCartMutation,
  AddProductsToCartMutationVariables,
} from './AddProductsToCart.gql'

export type RedirectType = LiteralUnion<'added' | undefined | false, `/${string}`>

type Item = Simplify<
  AddProductsToCartMutationVariables['cartItems'][number] & {
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
  }
>

export type AddProductsToCartFields = Omit<AddProductsToCartMutationVariables, 'cartItems'> & {
  cartItems: Item[]
}

/** https://react-hook-form.com/api/useform/watch/ */
export type AddProductsToCartContextType = { redirect: RedirectType } & Omit<
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
