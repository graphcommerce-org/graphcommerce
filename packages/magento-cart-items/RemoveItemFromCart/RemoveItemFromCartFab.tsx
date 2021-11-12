import { useFormGqlMutationCart, ApolloCartErrorAlert } from '@graphcommerce/magento-cart'
import { iconClose, SvgImageSimple } from '@graphcommerce/next-ui'
import { t } from '@lingui/macro'
import { Fab } from '@material-ui/core'
import React from 'react'
import {
  RemoveItemFromCartDocument,
  RemoveItemFromCartMutationVariables,
} from './RemoveItemFromCart.gql'

export type RemoveItemFromCartProps = Omit<RemoveItemFromCartMutationVariables, 'cartId'> &
  Omit<JSX.IntrinsicElements['form'], 'onSubmit' | 'noValidate'>

export default function RemoveItemFromCartFab(props: RemoveItemFromCartProps) {
  const { uid, ...formProps } = props
  const form = useFormGqlMutationCart(RemoveItemFromCartDocument, { defaultValues: { uid } })
  const { handleSubmit, formState, error } = form
  const submitHandler = handleSubmit(() => {})

  return (
    <form noValidate onSubmit={submitHandler} {...formProps}>
      <Fab
        aria-label={t`Remove Product`}
        size='small'
        type='submit'
        disabled={formState.isSubmitting}
      >
        <SvgImageSimple src={iconClose} inverted />
      </Fab>
      <ApolloCartErrorAlert error={error} />
    </form>
  )
}
