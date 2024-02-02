/* eslint-disable jsx-a11y/label-has-associated-control */
import { useFormGqlMutationCart } from '@graphcommerce/magento-cart'
import { PaymentOptionsProps } from '@graphcommerce/magento-cart-payment-method'
import { FormRow, FullPageMessage } from '@graphcommerce/next-ui'
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
  const { hostedFields, id, label, name, control } = props
  const scopedName: HostedFieldsHostedFieldsFieldName = name

  const { field, fieldState, formState } = useController({
    name: name as Path<T>,
    control,
    disabled: !hostedFields,
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
      name={name}
      label={label}
      error={invalid}
      helperText={error?.message}
      focused={focused}
      InputProps={{ slots: { input: Field } }}
      InputLabelProps={{ shrink }}
    />
  )
}

/** It sets the selected payment method on the cart. */
export function PaymentMethodOptions(props: PaymentOptionsProps) {
  const { code, step, Container } = props
  const hostedFields = useBraintreeHostedFields()

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
    onBeforeSubmit: async (variables) => {
      if (!hostedFields) throw new Error('Hosted fields not available')

      const { nonce } = await hostedFields.tokenize()
      return { ...variables, deviceData: '', nonce, isTokenEnabler: false }
    },
  })

  const { handleSubmit, register } = form
  const submit = handleSubmit(() => {})

  /** To use an external Pay button we register the current form to be handled there as well. */
  useFormCompose({ form, step, submit, key: `PaymentMethodOptions_${code}` })

  /** This is the form that the user can fill in. In this case we don't wat the user to fill in anything. */
  return (
    <FormProvider {...form}>
      <form onSubmit={submit}>
        <input type='hidden' {...register('code')} />

        {!hostedFields && (
          <FullPageMessage
            icon={<CircularProgress />}
            title={<Trans id='Loading' />}
            disableMargin
            sx={{ mb: 0 }}
          />
        )}

        <Box sx={[!hostedFields && { display: 'none' }]}>
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
