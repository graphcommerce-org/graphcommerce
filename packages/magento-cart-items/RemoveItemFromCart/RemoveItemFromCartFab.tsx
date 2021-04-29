import { useQuery } from '@apollo/client'
import { Fab } from '@material-ui/core'
import Icon from '@material-ui/icons/Close'
import { CurrentCartIdDocument } from '@reachdigital/magento-cart/CurrentCartId/CurrentCartId.gql'
import ApolloErrorAlert from '@reachdigital/next-ui/Form/ApolloErrorAlert'
import { useFormGqlMutation } from '@reachdigital/react-hook-form'
import React from 'react'
import {
  RemoveItemFromCartMutationVariables,
  RemoveItemFromCartDocument,
} from './RemoveItemFromCart.gql'

type RemoveItemFromCartProps = Omit<RemoveItemFromCartMutationVariables, 'cartId'> &
  Omit<JSX.IntrinsicElements['form'], 'onSubmit' | 'noValidate'>

export default function RemoveItemFromCartFab(props: RemoveItemFromCartProps) {
  const { uid, ...formProps } = props
  const cartId = useQuery(CurrentCartIdDocument, { ssr: false }).data?.currentCartId?.id
  const form = useFormGqlMutation(RemoveItemFromCartDocument, { defaultValues: { cartId, uid } })
  const { handleSubmit, formState, error } = form
  const submitHandler = handleSubmit(() => {})

  return (
    <form noValidate onSubmit={submitHandler} {...formProps}>
      <Fab aria-label='Remove Product' size='small' type='submit' disabled={formState.isSubmitting}>
        <Icon fontSize='small' />
      </Fab>
      <ApolloErrorAlert error={error} />
    </form>
  )
}
