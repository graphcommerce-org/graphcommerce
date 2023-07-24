import { ApolloCartErrorSnackbar, useFormGqlMutationCart } from '@graphcommerce/magento-cart'
import { Trans } from '@lingui/react'
import { Button, SxProps, Theme, styled } from '@mui/material'
import { CartItemFragment } from '../Api/CartItem.gql'
import { RemoveItemFromCartDocument } from './RemoveItemFromCart.gql'

export type RemoveItemFromCartProps = Omit<CartItemFragment, 'product' | '__typename'> &
  Omit<JSX.IntrinsicElements['form'], 'onSubmit' | 'noValidate'> & { sx?: SxProps<Theme> }

const Form = styled('form')({})

export function RemoveItemFromCart(props: RemoveItemFromCartProps) {
  const { uid, quantity, prices, ...formProps } = props
  const form = useFormGqlMutationCart(RemoveItemFromCartDocument, { defaultValues: { uid } })
  const { handleSubmit, formState, error } = form
  const submitHandler = handleSubmit(() => {})

  return (
    <Form noValidate onSubmit={submitHandler} {...formProps}>
      <Button
        type='submit'
        variant='inline'
        color='secondary'
        disabled={formState.isSubmitting}
        size='small'
      >
        <Trans id='Remove' />
      </Button>
      <ApolloCartErrorSnackbar error={error} />
    </Form>
  )
}
