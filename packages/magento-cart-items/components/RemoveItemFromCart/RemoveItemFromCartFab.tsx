import { ApolloCartErrorSnackbar, useFormGqlMutationCart } from '@graphcommerce/magento-cart'
import { iconClose, IconSvg } from '@graphcommerce/next-ui'
import { i18n } from '@lingui/core'
import { Fab, SxProps, Theme, styled } from '@mui/material'
import { CartItemFragment } from '../../Api/CartItem.gql'
import { RemoveItemFromCartDocument } from './RemoveItemFromCart.gql'

export type RemoveItemFromCartProps = Omit<CartItemFragment, '__typename' | 'product'> &
  Omit<JSX.IntrinsicElements['form'], 'onSubmit' | 'noValidate'> & { sx?: SxProps<Theme> }

const Form = styled('form')({})

export function RemoveItemFromCartFab(props: RemoveItemFromCartProps) {
  const { uid, quantity, prices, ...formProps } = props
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
      >
        <IconSvg src={iconClose} />
      </Fab>
      <ApolloCartErrorSnackbar error={error} />
    </Form>
  )
}
