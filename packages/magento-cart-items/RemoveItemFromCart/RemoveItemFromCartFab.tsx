import { ApolloCartErrorSnackbar, useFormGqlMutationCart } from '@graphcommerce/magento-cart'
import { iconClose, SvgIcon } from '@graphcommerce/next-ui'
import { t } from '@lingui/macro'
import { Box, Fab, SxProps, Theme } from '@mui/material'
import React from 'react'
import {
  RemoveItemFromCartDocument,
  RemoveItemFromCartMutationVariables,
} from './RemoveItemFromCart.gql'

export type RemoveItemFromCartProps = Omit<RemoveItemFromCartMutationVariables, 'cartId'> &
  Omit<JSX.IntrinsicElements['form'], 'onSubmit' | 'noValidate'> & { sx?: SxProps<Theme> }

export default function RemoveItemFromCartFab(props: RemoveItemFromCartProps) {
  const { uid, ...formProps } = props
  const form = useFormGqlMutationCart(RemoveItemFromCartDocument, { defaultValues: { uid } })
  const { handleSubmit, formState, error } = form
  const submitHandler = handleSubmit(() => {})

  return (
    <Box component='form' noValidate onSubmit={submitHandler} {...formProps}>
      <Fab
        aria-label={t`Remove Product`}
        size='small'
        type='submit'
        disabled={formState.isSubmitting}
      >
        <SvgIcon src={iconClose} />
      </Fab>
      <ApolloCartErrorSnackbar error={error} />
    </Box>
  )
}
