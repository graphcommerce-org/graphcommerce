import { useFormGqlMutationCart } from '@graphcommerce/magento-cart/hooks'
import type { UseFormGraphQlOptions } from '@graphcommerce/react-hook-form'
import type { DistributedOmit } from 'type-fest'
import type { CartItemFragment } from '../Api/CartItem.gql'
import type {
  RemoveItemFromCartMutation,
  RemoveItemFromCartMutationVariables,
} from '../components/RemoveItemFromCart/RemoveItemFromCart.gql'
import { RemoveItemFromCartDocument } from '../components/RemoveItemFromCart/RemoveItemFromCart.gql'

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
