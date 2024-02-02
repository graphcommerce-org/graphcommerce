/* eslint-disable jsx-a11y/label-has-associated-control */
import { useCartQuery, useFormGqlMutationCart } from '@graphcommerce/magento-cart'
import { PaymentOptionsProps, useCartLock } from '@graphcommerce/magento-cart-payment-method'
import { BillingPageDocument } from '@graphcommerce/magento-cart-checkout'
import { ErrorSnackbar, FormRow, FullPageMessage } from '@graphcommerce/next-ui'
import {
  FieldValues,
  FormProvider,
  Path,
  UseControllerProps,
  useController,
  useFormCompose,
} from '@graphcommerce/react-hook-form'
import { i18n } from '@lingui/core'
import { Trans } from '@lingui/react'
import { Box, CircularProgress, TextField } from '@mui/material'
import { HostedFields } from 'braintree-web'
import { HostedFieldsEvent, HostedFieldsHostedFieldsFieldName } from 'braintree-web/hosted-fields'
import React, { useEffect, useState } from 'react'
import {
  BraintreePaymentMethodOptionsDocument,
  BraintreePaymentMethodOptionsMutation,
  BraintreePaymentMethodOptionsMutationVariables,
} from '../../BraintreePaymentMethodOptions.gql'
import { useBraintreeHostedFields } from '../../hooks/useBraintreeHostedFields'

const Field = React.forwardRef<any, { ownerState: unknown; as: string }>((props, ref) => {
  const { ownerState, as, ...rest } = props
  return <Box {...rest} ref={ref} sx={{ height: 54, width: '100%' }} />
})

export function BraintreeField<T extends FieldValues = FieldValues>(
  props: {
    hostedFields: HostedFields | undefined
    id: string
    label: string
    name: HostedFieldsHostedFieldsFieldName
  } & Omit<UseControllerProps<T>, 'name' | 'defaultValue'>,
) {
  const { hostedFields, id, label, name, control, disabled } = props
  const scopedName: HostedFieldsHostedFieldsFieldName = name

  const { field, fieldState, formState } = useController({
    name: name as Path<T>,
    control,
    disabled: !hostedFields || disabled,
    shouldUnregister: true,
    rules: {
      validate: () => {
        if (!hostedFields) return false
        const hostedField = hostedFields.getState().fields[name]

        if (hostedField.isEmpty) return i18n._(/* i18n */ 'This field is required')
        if (!hostedField.isPotentiallyValid) return i18n._(/* i18n */ 'This field is invalid')
        if (!hostedField.isValid) return i18n._(/* i18n */ 'This field is invalid')

        return true
      },
    },
  })

  const { invalid, error } = fieldState

  const [focused, setFocused] = useState(false)
  const [shrink, setShrink] = useState(false)

  // Manual ref handling
  field.ref({
    focus: () => {
      hostedFields?.focus(scopedName)
      setFocused(true)
    },
  })

  useEffect(() => {
    const onBlur = (event: HostedFieldsEvent) => {
      if (event.emittedBy !== name) return
      setShrink(!event.fields[name].isEmpty)
      setFocused(false)
    }
    const onFocus = (event: HostedFieldsEvent) => {
      if (event.emittedBy !== name) return
      setShrink(true)
      setFocused(true)
    }
    const onNotEmpty = (event: HostedFieldsEvent) => {
      if (event.emittedBy !== name) return
      setShrink(true)
    }

    try {
      hostedFields?.on('focus', onFocus)
      hostedFields?.on('blur', onBlur)
      hostedFields?.on('notEmpty', onNotEmpty)
    } catch {
      // swallow error, sometimes due to timing issue this gets called after the hostedFields.teardown() is called.
    }

    return () => {
      hostedFields?.off('focus', onFocus)
      hostedFields?.off('blur', onBlur)
      hostedFields?.off('blur', onNotEmpty)
    }
  }, [hostedFields, name])

  return (
    <TextField
      id={id}
      label={label}
      error={invalid}
      helperText={error?.message}
      focused={focused}
      InputProps={{ slots: { input: Field } }}
      InputLabelProps={{ shrink }}
      {...field}
    />
  )
}

/** It sets the selected payment method on the cart. */
export function PaymentMethodOptions(props: PaymentOptionsProps) {
  const { code, step, Container } = props
  const [hostedFields, threeDSecure] = useBraintreeHostedFields()
  const cart = useCartQuery(BillingPageDocument)
  const [lockstate, lock, unlock] = useCartLock()

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    if (!lockstate.justLocked && lockstate.locked) unlock({})
  }, [lockstate.justLocked, lockstate.locked, unlock])

  useEffect(() => {
    if (!threeDSecure) return

    threeDSecure.on('lookup-complete', (data, next) => {
      console.log('lookup-complete', data)
      next?.()
    })
    threeDSecure.on('customer-canceled', (data, next) => {
      console.log('customer-canceled', data)
      next?.()
    })
  }, [threeDSecure])

  /**
   * In the this folder you'll also find a PaymentMethodOptionsNoop.graphql document that is
   * imported here and used as the basis for the form below.
   */
  const form = useFormGqlMutationCart<
    BraintreePaymentMethodOptionsMutation,
    BraintreePaymentMethodOptionsMutationVariables & {
      [K in HostedFieldsHostedFieldsFieldName]?: string
    }
  >(BraintreePaymentMethodOptionsDocument, {
    defaultValues: { code },
    experimental_useV2: true,
    onBeforeSubmit: async (variables) => {
      if (!hostedFields) throw new Error('Hosted fields not available')
      if (!threeDSecure) throw new Error('3D Secure not available')
      if (!cart.data?.cart?.prices?.grand_total?.value) throw Error('Cart total not found')

      try {
        const tokenResult = await hostedFields.tokenize()

        const verifyResult = await threeDSecure.verifyCard({
          nonce: tokenResult.nonce,
          amount: String(cart.data.cart.prices.grand_total.value),
          bin: tokenResult.details.bin,
          collectDeviceData: true,
          billingAddress: {
            givenName: cart.data.cart.billing_address?.firstname,
            surname: cart.data.cart.billing_address?.lastname,
            countryCodeAlpha2: cart.data.cart.billing_address?.country?.code,
            streetAddress: cart.data.cart.billing_address?.street?.join(' '),
            postalCode: cart.data.cart.billing_address?.postcode ?? undefined,
            phoneNumber: cart.data.cart.billing_address?.telephone ?? undefined,
            region: cart.data.cart.billing_address?.region?.code ?? undefined,
            locality: cart.data.cart.billing_address?.city,
          },
          email: cart.data.cart.email ?? undefined,
          mobilePhoneNumber: cart.data.cart.billing_address?.telephone ?? undefined,
        })

        if (!verifyResult.threeDSecureInfo.liabilityShifted) {
          throw Error('Liability not shifted')
        }

        await lock({ method: code })
        return { ...variables, deviceData: '', nonce: verifyResult.nonce, isTokenEnabler: false }
      } catch (e) {
        if (e instanceof Error) {
          form.setError('nonce', {
            message:
              'Could not verify your Credit Card, please check your information and try again.',
          })
          await unlock({})
        }
        throw e
      }
    },
  })

  const { handleSubmit, register } = form
  const submit = handleSubmit(() => {})

  /** To use an external Pay button we register the current form to be handled there as well. */
  useFormCompose({ form, step, submit, key: `PaymentMethodOptions_${code}` })

  const nonce = form.getFieldState('nonce')

  const loading = !hostedFields

  /** This is the form that the user can fill in. In this case we don't wat the user to fill in anything. */
  return (
    <FormProvider {...form}>
      <form onSubmit={submit}>
        <ErrorSnackbar open={nonce.invalid} onClose={() => form.clearErrors('nonce')}>
          <>{nonce.error?.message}</>
        </ErrorSnackbar>

        <input type='hidden' {...register('code')} />

        {loading && (
          <FullPageMessage
            icon={<CircularProgress />}
            title={<Trans id='Loading' />}
            disableMargin
            sx={{ mb: 0 }}
          />
        )}

        <Box sx={[loading && { display: 'none' }]}>
          <Container>
            <FormRow sx={[]}>
              <BraintreeField
                control={form.control}
                name='number'
                hostedFields={hostedFields}
                id='card-number'
                label='Card Number'
              />
            </FormRow>

            <FormRow>
              <BraintreeField
                control={form.control}
                name='expirationDate'
                hostedFields={hostedFields}
                id='expiration-date'
                label='Expiration Date (MM/YYYY)'
              />
              <BraintreeField
                hostedFields={hostedFields}
                id='cvv'
                control={form.control}
                name='cvv'
                label='CVV'
              />
            </FormRow>
          </Container>
        </Box>
      </form>
    </FormProvider>
  )
}
