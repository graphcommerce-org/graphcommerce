import { ApolloCartErrorSnackbar } from '@graphcommerce/magento-cart'
import type { FabProps } from '@graphcommerce/next-ui'
import { Fab, iconClose } from '@graphcommerce/next-ui'
import { i18n } from '@lingui/core'
import type { SxProps, Theme } from '@mui/material'
import { styled } from '@mui/material'
import type { UseRemoveItemFromCartProps } from '../../hooks/useRemoveItemFromCart'
import { useRemoveItemFromCart } from '../../hooks/useRemoveItemFromCart'

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
