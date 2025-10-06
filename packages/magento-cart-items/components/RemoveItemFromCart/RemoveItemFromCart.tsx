import { ApolloCartErrorSnackbar } from '@graphcommerce/magento-cart'
import type { ButtonProps } from '@graphcommerce/next-ui'
import { Button } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react'
import type { SxProps, Theme } from '@mui/material'
import { styled } from '@mui/material'
import type { UseRemoveItemFromCartProps } from '../../hooks/useRemoveItemFromCart'
import { useRemoveItemFromCart } from '../../hooks/useRemoveItemFromCart'

export type RemoveItemFromCartProps = UseRemoveItemFromCartProps & {
  sx?: SxProps<Theme>
  buttonProps?: Omit<ButtonProps, 'type' | 'loading'>
}

const Form = styled('form')({})

export function RemoveItemFromCart(props: RemoveItemFromCartProps) {
  const { uid, quantity, prices, buttonProps, ...formProps } = props

  const { submit, formState, error } = useRemoveItemFromCart(props)
  return (
    <Form noValidate onSubmit={submit} {...formProps}>
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
