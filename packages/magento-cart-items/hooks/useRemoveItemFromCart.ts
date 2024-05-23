import { useFormGqlMutationCart } from '@graphcommerce/magento-cart/hooks'
import { UseFormGraphQlOptions } from '@graphcommerce/react-hook-form'
import type { DistributedOmit } from 'type-fest'
import { CartItemFragment } from '../Api/CartItem.gql'
import {
  RemoveItemFromCartMutation,
  RemoveItemFromCartMutationVariables,
  RemoveItemFromCartDocument,
} from '../components/RemoveItemFromCart/RemoveItemFromCart.gql'

export type UseRemoveItemFromCartProps = CartItemFragment &
  UseFormGraphQlOptions<RemoveItemFromCartMutation, RemoveItemFromCartMutationVariables>

export function useRemoveItemFromCart(props: UseRemoveItemFromCartProps) {
  const { uid, ...options } = props

  const form = useFormGqlMutationCart(RemoveItemFromCartDocument, {
    defaultValues: { uid },
    ...options,
  })

  const { handleSubmit } = form
  const submit = handleSubmit(() => {})
  return { ...form, submit }
}
