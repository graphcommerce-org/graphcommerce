import { Fab } from '@material-ui/core'
import DeleteOutlineOutlined from '@material-ui/icons/DeleteOutlineOutlined'
import { useMutationForm } from 'components/useMutationForm'
import { RemoveItemFromCartDocument } from 'generated/apollo'

type RemoveItemFromCartProps = GQLRemoveItemFromCartMutationVariables &
  React.HTMLAttributes<HTMLDivElement>

export default function RemoveItemFromCart(values: RemoveItemFromCartProps) {
  const { onSubmit, error, loading } = useMutationForm<
    GQLRemoveItemFromCartMutation,
    GQLRemoveItemFromCartMutationVariables
  >({ mutation: RemoveItemFromCartDocument, values })

  return (
    <form noValidate onSubmit={onSubmit} className={values.className}>
      <Fab aria-label='Remove Product' size='small' type='submit' disabled={loading}>
        <DeleteOutlineOutlined fontSize='small' />
      </Fab>
      {error?.message}
    </form>
  )
}
