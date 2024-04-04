import { ApolloCartErrorSnackbar, useFormGqlMutationCart } from '@graphcommerce/magento-cart'
import { Button, ButtonProps } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react'
import { SxProps, Theme, styled } from '@mui/material'
import type { DistributedOmit } from 'type-fest'
import { CartItemFragment } from '../../Api/CartItem.gql'
import { RemoveItemFromCartDocument } from './RemoveItemFromCart.gql'

export type RemoveItemFromCartProps = DistributedOmit<CartItemFragment, '__typename'> & {
  sx?: SxProps<Theme>
  buttonProps?: Omit<ButtonProps, 'type' | 'loading'>
}

const Form = styled('form')({})

export function RemoveItemFromCart(props: RemoveItemFromCartProps) {
  const { uid, quantity, prices, buttonProps, ...formProps } = props
  const form = useFormGqlMutationCart(RemoveItemFromCartDocument, { defaultValues: { uid } })
  const { handleSubmit, formState, error } = form
  const submitHandler = handleSubmit(() => {})

  return (
    <Form noValidate onSubmit={submitHandler} {...formProps}>
      <Button
        variant='inline'
        color='secondary'
        {...buttonProps}
        size='medium'
        type='submit'
        loading={formState.isSubmitting}
      >
        <Trans id='Remove' />
      </Button>
      <ApolloCartErrorSnackbar error={error} />
    </Form>
  )
}
