import { Fab } from '@material-ui/core'
import { useFormGqlMutationCart } from '@reachdigital/magento-cart'
import ApolloErrorAlert from '@reachdigital/next-ui/Form/ApolloErrorAlert'
import SvgImage from '@reachdigital/next-ui/SvgImage'
import { iconClose } from '@reachdigital/next-ui/icons'
import React from 'react'
import {
  RemoveItemFromCartDocument,
  RemoveItemFromCartMutationVariables,
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
        <SvgImage src={iconClose} size='small' shade='inverted' alt='close' loading='eager' />
      </Fab>
      <ApolloErrorAlert error={error} />
    </form>
  )
}
