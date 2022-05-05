import { t } from '@graphcommerce/lingui-next'
import { ApolloCartErrorSnackbar, useFormGqlMutationCart } from '@graphcommerce/magento-cart'
import { iconClose, IconSvg } from '@graphcommerce/next-ui'
import { Fab, SxProps, Theme, styled } from '@mui/material'
import {
  RemoveItemFromCartDocument,
  RemoveItemFromCartMutationVariables,
} from './RemoveItemFromCart.gql'

export type RemoveItemFromCartProps = Omit<RemoveItemFromCartMutationVariables, 'cartId'> &
  Omit<JSX.IntrinsicElements['form'], 'onSubmit' | 'noValidate'> & { sx?: SxProps<Theme> }

const Form = styled('form')({})

export function RemoveItemFromCartFab(props: RemoveItemFromCartProps) {
  const { uid, ...formProps } = props
  const form = useFormGqlMutationCart(RemoveItemFromCartDocument, { defaultValues: { uid } })
  const { handleSubmit, formState, error } = form
  const submitHandler = handleSubmit(() => {})

  return (
    <Form noValidate onSubmit={submitHandler} {...formProps}>
      <Fab
        aria-label={t`Remove Product`}
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
