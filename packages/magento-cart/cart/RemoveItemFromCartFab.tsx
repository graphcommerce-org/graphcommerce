import { Fab } from '@material-ui/core'
import Icon from '@material-ui/icons/Close'
import { useMutationForm } from '@reachdigital/next-ui/useMutationForm'
import {
  RemoveItemFromCartMutationVariables,
  RemoveItemFromCartDocument,
} from './operation/RemoveItemFromCart.gql'

type RemoveItemFromCartProps = RemoveItemFromCartMutationVariables &
  Omit<React.HTMLAttributes<HTMLFormElement>, 'onSubmit'>

export default function RemoveItemFromCartFab(props: RemoveItemFromCartProps) {
  const { cartId, cartItemId, ...formProps } = props
  const mutationForm = useMutationForm(RemoveItemFromCartDocument, {
    defaultValues: { cartId, cartItemId },
  })
  const { handleSubmit, errors, formState } = mutationForm

  return (
    <form noValidate onSubmit={handleSubmit} {...formProps}>
      <Fab aria-label='Remove Product' size='small' type='submit' disabled={formState.isSubmitting}>
        <Icon fontSize='small' />
      </Fab>
      {errors.submission?.message}
    </form>
  )
}
