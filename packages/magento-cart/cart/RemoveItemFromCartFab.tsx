import { Fab } from '@material-ui/core'
import ApolloErrorAlert from '@reachdigital/next-ui/Form/ApolloErrorAlert'
import SvgImage from '@reachdigital/next-ui/SvgImage'
import { iconClose } from '@reachdigital/next-ui/icons'
import { useFormGqlMutation } from '@reachdigital/react-hook-form'
import React from 'react'
import {
  RemoveItemFromCartDocument,
  RemoveItemFromCartMutationVariables,
} from './RemoveItemFromCart.gql'

type RemoveItemFromCartProps = RemoveItemFromCartMutationVariables &
  Omit<JSX.IntrinsicElements['form'], 'onSubmit' | 'noValidate'>

export default function RemoveItemFromCartFab(props: RemoveItemFromCartProps) {
  const { cartId, cartItemId, ...formProps } = props
  const form = useFormGqlMutation(RemoveItemFromCartDocument, {
    defaultValues: { cartId, cartItemId },
  })
  const { handleSubmit, formState, error } = form
  const submitHandler = handleSubmit(() => {})

  return (
    <form noValidate onSubmit={submitHandler} {...formProps}>
      <Fab aria-label='Remove Product' size='small' type='submit' disabled={formState.isSubmitting}>
        <SvgImage src={iconClose} size='small' shade='invert' alt='close' loading='eager' />
      </Fab>
      <ApolloErrorAlert error={error} />
    </form>
  )
}
