import { useFormGqlMutationCart } from '@graphcommerce/magento-cart/hooks'
import { UseFormGraphQlOptions } from '@graphcommerce/react-hook-form'
import type { DistributedOmit } from 'type-fest'
import { CartItemFragment } from '../Api/CartItem.gql'
import {
  RemoveItemFromCartMutation,
  RemoveItemFromCartMutationVariables,
  RemoveItemFromCartDocument,
} from '../components/RemoveItemFromCart/RemoveItemFromCart.gql'

export type UseRemoveItemFromCartProps = DistributedOmit<CartItemFragment, '__typename'> &
  Omit<
    UseFormGraphQlOptions<RemoveItemFromCartMutation, RemoveItemFromCartMutationVariables>,
    'errors'
  >

export function useRemoveItemFromCart(props: UseRemoveItemFromCartProps) {
  const { uid, errors, ...options } = props

  const form = useFormGqlMutationCart(RemoveItemFromCartDocument, {
    defaultValues: { uid },
    ...options,
  })

  const { handleSubmit } = form
  const submit = handleSubmit(() => {})
  return { ...form, submit }
}
