import { Fab } from '@material-ui/core'
import Icon from '@material-ui/icons/Close'
import { useFormGqlMutationCart } from '@reachdigital/magento-cart'
import ApolloErrorAlert from '@reachdigital/next-ui/Form/ApolloErrorAlert'
import React from 'react'
import {
  RemoveItemFromCartMutationVariables,
  RemoveItemFromCartDocument,
} from './RemoveItemFromCart.gql'

export type RemoveItemFromCartProps = Omit<RemoveItemFromCartMutationVariables, 'cartId'> &
  Omit<JSX.IntrinsicElements['form'], 'onSubmit' | 'noValidate'>

export default function RemoveItemFromCartFab(props: RemoveItemFromCartProps) {
  const { uid, ...formProps } = props
  const form = useFormGqlMutationCart(RemoveItemFromCartDocument)
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
