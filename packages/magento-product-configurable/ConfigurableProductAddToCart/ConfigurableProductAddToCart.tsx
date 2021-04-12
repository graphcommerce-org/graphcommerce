import { useQuery } from '@apollo/client'
import useRequestCartId from '@reachdigital/magento-cart/useRequestCartId'
import { CustomerTokenDocument } from '@reachdigital/magento-customer/CustomerToken.gql'
import Button from '@reachdigital/next-ui/Button'
import ApolloErrorAlert from '@reachdigital/next-ui/Form/ApolloErrorAlert'
import useFormStyles from '@reachdigital/next-ui/Form/useFormStyles'
import PageLink from '@reachdigital/next-ui/PageTransition/PageLink'
import AddToCartSnackbar from '@reachdigital/next-ui/Snackbar/AddToCartSnackbar'
import MessageSnackbarLoader from '@reachdigital/next-ui/Snackbar/MessageSnackbarLoader'
import TextInputNumber from '@reachdigital/next-ui/TextInputNumber'
import { useFormGqlMutation } from '@reachdigital/react-hook-form'
import React from 'react'
import { Selected, useConfigurableContext } from '../ConfigurableContext'
import ConfigurableOptionsInput from '../ConfigurableOptions'

import {
  ConfigurableProductAddToCartDocument,
  ConfigurableProductAddToCartMutationVariables,
} from './ConfigurableProductAddToCart.gql'

type ConfigurableProductAddToCartProps = {
  variables: Omit<ConfigurableProductAddToCartMutationVariables, 'cartId' | 'selectedOptions'>
  product: string
}

export default function ConfigurableProductAddToCart(props: ConfigurableProductAddToCartProps) {
  const { product, variables, ...buttonProps } = props
  const { getUids } = useConfigurableContext(variables.sku)
  const classes = useFormStyles()

  const requestCartId = useRequestCartId()
  const form = useFormGqlMutation(ConfigurableProductAddToCartDocument, {
    defaultValues: variables,
    onBeforeSubmit: async ({ selectedOptions, ...vars }) => ({
      ...vars,
      cartId: await requestCartId(),
      // todo: selectedOptions should contain the correct values directly
      selectedOptions: getUids((selectedOptions?.[0] as unknown) as Selected),
    }),
  })
  const { handleSubmit, formState, muiRegister, required, control, error } = form
  const submitHandler = handleSubmit(() => {})

  const { data: tokenQuery } = useQuery(CustomerTokenDocument)
  const requireAuth = Boolean(tokenQuery?.customerToken && !tokenQuery?.customerToken.valid)

  return requireAuth ? (
    <PageLink href='/account/signin'>
      <Button color='primary' variant='contained' {...buttonProps}>
        Add to Cart
      </Button>
    </PageLink>
  ) : (
    <form onSubmit={submitHandler} noValidate className={classes.form}>
      <ConfigurableOptionsInput
        name='selectedOptions'
        sku={variables.sku}
        control={control}
        rules={{ required: required.selectedOptions }}
        errors={formState.errors.selectedOptions}
      />

      <ApolloErrorAlert error={error} />

      <div className={classes.actions}>
        <TextInputNumber
          variant='outlined'
          error={formState.isSubmitted && !!formState.errors.quantity}
          label='Quantity'
          required={required.quantity}
          inputProps={{ min: 1 }}
          {...muiRegister('quantity', { required: required.quantity })}
          helperText={formState.isSubmitted && formState.errors.quantity?.message}
          // disabled={loading}
          size='small'
        />

        <Button
          type='submit'
          loading={formState.isSubmitting}
          color='primary'
          variant='contained'
          {...buttonProps}
        >
          Add to Cart
        </Button>
      </div>

      <MessageSnackbarLoader
        open={formState.isSubmitSuccessful && !error?.message}
        color='primary'
        variant='rounded'
        size='large'
      >
        <AddToCartSnackbar message={product} />
      </MessageSnackbarLoader>
    </form>
  )
}
