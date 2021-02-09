import { useQuery } from '@apollo/client'
import { FormControl } from '@material-ui/core'
import useRequestCartId from '@reachdigital/magento-cart/useRequestCartId'
import { CustomerTokenDocument } from '@reachdigital/magento-customer/CustomerToken.gql'
import Button from '@reachdigital/next-ui/Button'
import ApolloErrorAlert from '@reachdigital/next-ui/Form/ApolloErrorAlert'
import PageLink from '@reachdigital/next-ui/PageTransition/PageLink'
import MessageSnackbarLoader from '@reachdigital/next-ui/Snackbar/MessageSnackbarLoader'
import TextInputNumber from '@reachdigital/next-ui/TextInputNumber'
import useFormGqlMutation from '@reachdigital/react-hook-form/useFormGqlMutation'
import React, { useRef } from 'react'
import { Selected, useConfigurableContext } from '../ConfigurableContext'
import ConfigurableOptionsInput from '../ConfigurableOptions'
import {
  ConfigurableProductAddToCartDocument,
  ConfigurableProductAddToCartMutationVariables,
} from './ConfigurableProductAddToCart.gql'

type ConfigurableProductAddToCartProps = {
  variables: Omit<ConfigurableProductAddToCartMutationVariables, 'cartId' | 'selectedOptions'>
}

export default function ConfigurableProductAddToCart(props: ConfigurableProductAddToCartProps) {
  const { variables, ...buttonProps } = props
  const { getUids } = useConfigurableContext(variables.sku)

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
  const { handleSubmit, errors, formState, register, required, control, error } = form
  const submitHandler = handleSubmit(() => {})

  const { data: tokenQuery } = useQuery(CustomerTokenDocument)
  const requireAuth = Boolean(tokenQuery?.customerToken && !tokenQuery?.customerToken.valid)

  // @todo TextInputNumber can't handle a callback ref
  const ref = useRef<HTMLInputElement>(null)
  register(ref.current, { required: required.quantity })

  return requireAuth ? (
    <PageLink href='/account/signin'>
      <Button color='primary' variant='contained' {...buttonProps}>
        Add to Cart
      </Button>
    </PageLink>
  ) : (
    <form onSubmit={submitHandler} noValidate>
      <ConfigurableOptionsInput
        name='selectedOptions'
        sku={variables.sku}
        control={control}
        rules={{ required: required.selectedOptions }}
        errors={errors.selectedOptions}
      />

      <TextInputNumber
        variant='outlined'
        error={formState.isSubmitted && !!errors.quantity}
        id='quantity'
        name='quantity'
        label='Quantity'
        required={required.quantity}
        inputProps={{ min: 1 }}
        inputRef={ref}
        helperText={formState.isSubmitted && errors.quantity?.message}
        // disabled={loading}
        autoComplete='off'
        size='small'
      />

      <FormControl>
        <Button
          type='submit'
          loading={formState.isSubmitting}
          color='primary'
          variant='contained'
          {...buttonProps}
        >
          Add to Cart
        </Button>
      </FormControl>

      <ApolloErrorAlert error={error} />

      <MessageSnackbarLoader
        open={formState.isSubmitSuccessful && !error?.message}
        message={
          <>
            Added <em>&lsquo;Product&rsquo;</em> to cart
          </>
        }
      />
    </form>
  )
}
