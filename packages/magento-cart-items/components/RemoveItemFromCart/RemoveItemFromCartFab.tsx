import { ApolloCartErrorSnackbar } from '@graphcommerce/magento-cart'
import { Fab, FabProps, iconClose } from '@graphcommerce/next-ui'
import { i18n } from '@lingui/core'
import { SxProps, Theme, styled } from '@mui/material'
import {
  UseRemoveItemFromCartProps,
  useRemoveItemFromCart,
} from '../../hooks/useRemoveItemFromCart'

export type RemoveItemFromCartFabProps = UseRemoveItemFromCartProps & {
  sx?: SxProps<Theme>
  fabProps?: Omit<FabProps, 'type' | 'icon' | 'loading'>
}

const Form = styled('form')({})

export function RemoveItemFromCartFab(props: RemoveItemFromCartFabProps) {
  const { uid, quantity, prices, product, ...formProps } = props

  const { submit, formState, error } = useRemoveItemFromCart(props)

  return (
    <Form noValidate onSubmit={submit} {...formProps}>
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
