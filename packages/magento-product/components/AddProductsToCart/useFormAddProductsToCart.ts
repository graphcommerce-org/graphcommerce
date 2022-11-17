import { UseFormGqlMutationReturn } from '@graphcommerce/ecommerce-ui'
import { createContext, useContext } from 'react'
import type { LiteralUnion } from 'type-fest'
import {
  AddProductsToCartMutation,
  AddProductsToCartMutationVariables,
} from './AddProductsToCart.gql'

export type RedirectType = LiteralUnion<'added' | undefined, `/${string}`>

export type AddProductsToCartContextType = { redirect: RedirectType } & UseFormGqlMutationReturn<
  AddProductsToCartMutation,
  AddProductsToCartMutationVariables
>

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
