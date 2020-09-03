import { IconButton } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import { useMutationForm } from 'components/useMutationForm'
import { RemoveItemFromCartDocument, useCartQuery } from 'generated/apollo'

export default function RemoveItemFromCart(
  props: Omit<GQLRemoveItemFromCartMutationVariables, 'cartId'>,
) {
  const { data: cartData } = useCartQuery()
  const { onSubmit, result } = useMutationForm<
    GQLRemoveItemFromCartMutation,
    GQLRemoveItemFromCartMutationVariables
  >({
    mutation: RemoveItemFromCartDocument,
    values: { ...props, cartId: cartData?.cart?.id },
  })

  return (
    <form noValidate onSubmit={onSubmit}>
      <IconButton edge='end' aria-label='delete' type='submit' disabled={result.loading}>
        <DeleteIcon fontSize='small' />
      </IconButton>
      {result.error?.message}
    </form>
  )
}
