import { ApolloCartErrorSnackbar, useFormGqlMutationCart } from '@graphcommerce/magento-cart'
import { Fab, FabProps, iconClose } from '@graphcommerce/next-ui'
import { i18n } from '@lingui/core'
import { SxProps, Theme, styled } from '@mui/material'
import { CartItemFragment } from '../../Api/CartItem.gql'
import { RemoveItemFromCartDocument } from './RemoveItemFromCart.gql'

export type RemoveItemFromCartFabProps = Omit<CartItemFragment, '__typename'> & {
  sx?: SxProps<Theme>
  fabProps?: Omit<FabProps, 'type' | 'icon' | 'loading'>
}

const Form = styled('form')({})

export function RemoveItemFromCartFab(props: RemoveItemFromCartFabProps) {
  const { uid, quantity, prices, product, ...formProps } = props
  const form = useFormGqlMutationCart(RemoveItemFromCartDocument, { defaultValues: { uid } })
  const { handleSubmit, formState, error } = form
  const submitHandler = handleSubmit(() => {})

  return (
    <Form noValidate onSubmit={submitHandler} {...formProps}>
      <Fab
        aria-label={i18n._(/* i18n */ 'Remove Product')}
        size='small'
        type='submit'
        disabled={formState.isSubmitting}
        icon={iconClose}
      />
      <ApolloCartErrorSnackbar error={error} />
    </Form>
  )
}
