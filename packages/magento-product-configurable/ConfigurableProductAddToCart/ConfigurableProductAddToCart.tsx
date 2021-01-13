import { TypedDocumentNode, useQuery } from '@apollo/client'
import { Button, ButtonProps, FormControl, FormHelperText } from '@material-ui/core'
import useRequestCartId from '@reachdigital/magento-cart/useRequestCartId'
import { CustomerTokenDocument } from '@reachdigital/magento-customer/CustomerToken.gql'
import { ProductInterface } from '@reachdigital/magento-graphql'
import PageLink from '@reachdigital/next-ui/PageTransition/PageLink'
import ErrorSnackbarLoader from '@reachdigital/next-ui/Snackbar/ErrorSnackbarLoader'
import MessageSnackbarLoader from '@reachdigital/next-ui/Snackbar/MessageSnackbarLoader'
import TextInputNumber from '@reachdigital/next-ui/TextInputNumber'
import {
  DeepPartial,
  FieldError,
  FieldErrors,
  UnpackNestedValue,
  useMutationForm,
} from '@reachdigital/next-ui/useMutationForm'
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
  const mutationForm = useMutationForm(ConfigurableProductAddToCartDocument, {
    defaultValues: variables,
    onBeforeSubmit: async ({ selectedOptions, ...vars }) => ({
      ...vars,
      cartId: await requestCartId(),
      // todo: selectedOptions should contain the correct values directly
      selectedOptions: getUids((selectedOptions?.[0] as unknown) as Selected),
    }),
  })

  const { handleSubmit, errors, formState, register, required, control } = mutationForm

  const { data: tokenQuery } = useQuery(CustomerTokenDocument)
  const requireAuth = Boolean(tokenQuery?.customerToken && !tokenQuery?.customerToken.valid)

  // @todo TextInputNumber can't handle a callback ref
  const ref = useRef<HTMLInputElement>(null)
  register(ref.current, { required: required.quantity })

  const submissionError = errors.submission

  return requireAuth ? (
    <PageLink href='/account/signin?back=1'>
      <Button color='primary' variant='contained' {...buttonProps}>
        Add to Cart
      </Button>
    </PageLink>
  ) : (
    <form onSubmit={handleSubmit} noValidate>
      <ConfigurableOptionsInput
        name='selectedOptions'
        sku={variables.sku}
        control={control}
        rules={{ required: required.selectedOptions }}
        errors={errors.selectedOptions as FieldErrors}
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
          disabled={formState.isSubmitting}
          color='primary'
          variant='contained'
          {...buttonProps}
        >
          Add to Cart
        </Button>
        <FormHelperText error={!!errors.submission}>{errors.submission?.message}</FormHelperText>
      </FormControl>

      <ErrorSnackbarLoader
        open={formState.isSubmitted && !!submissionError}
        message={<>{submissionError?.message}</>}
      />
      <MessageSnackbarLoader
        open={formState.isSubmitSuccessful && !submissionError?.message}
        message={
          <>
            Added <em>&lsquo;Product&rsquo;</em> to cart
          </>
        }
      />
    </form>
  )
}
