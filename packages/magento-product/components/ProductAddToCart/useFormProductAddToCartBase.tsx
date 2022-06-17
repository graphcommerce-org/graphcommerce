import { UseFormGqlMutationReturn, UseFormGraphQlOptions } from '@graphcommerce/ecommerce-ui'
import { useFormGqlMutationCart } from '@graphcommerce/magento-cart'
import {
  ProductAddToCartDocument,
  ProductAddToCartMutation,
  ProductAddToCartMutationVariables,
} from './ProductAddToCart.gql'

export type UseFormProductAddToCartProps = Omit<
  UseFormGraphQlOptions<ProductAddToCartMutation, ProductAddToCartMutationVariables>,
  'onBeforeSubmit'
>

export type UseFormProductAddToCartReturn = UseFormGqlMutationReturn<
  ProductAddToCartMutation,
  ProductAddToCartMutationVariables
>

export function useFormProductAddToCartBase(
  props?: UseFormProductAddToCartProps,
): UseFormProductAddToCartReturn {
  const form = useFormGqlMutationCart(ProductAddToCartDocument, {
    ...props,
    onBeforeSubmit: ({ selectedOptions, ...vars }) => ({
      ...vars,
      selectedOptions: Object.values(selectedOptions?.[0] ?? {}),
    }),
  })

  return form
}
