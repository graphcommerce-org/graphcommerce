import { useQuery } from '@apollo/client'
import { FormControl, FormHelperText } from '@material-ui/core'
import ApolloErrorAlert from '@reachdigital/next-ui/Form/ApolloErrorAlert'
import useFormStyles from '@reachdigital/next-ui/Form/useFormStyles'
import ToggleButtonGroup from '@reachdigital/next-ui/ToggleButtonGroup'
import { Controller, useFormCompose, useFormGqlMutation } from '@reachdigital/react-hook-form'
import React from 'react'
import { ClientCartDocument } from '../ClientCart.gql'
import AvailableShippingMethod from './AvailableShippingMethod'
import {
  ShippingMethodFormDocument,
  ShippingMethodFormMutation,
  ShippingMethodFormMutationVariables,
} from './ShippingMethodForm.gql'

type ShippingMethodFormProps = Record<string, never>

export default function ShippingMethodForm(props: ShippingMethodFormProps) {
  const classes = useFormStyles()
  const { data: cartQuery } = useQuery(ClientCartDocument)

  const currentAddress = cartQuery?.cart?.shipping_addresses?.[0]
  const available = currentAddress?.available_shipping_methods
  const selected = currentAddress?.selected_shipping_method
  const defaultCarrier = selected?.carrier_code ?? available?.[0]?.carrier_code
  const defaultMethod = selected?.method_code ?? available?.[0]?.method_code ?? undefined
  const carrierMethod =
    defaultCarrier && defaultMethod ? `${defaultCarrier}-${defaultMethod}` : undefined

  const form = useFormGqlMutation<
    ShippingMethodFormMutation,
    ShippingMethodFormMutationVariables & { carrierMethod?: string }
  >(ShippingMethodFormDocument, {
    defaultValues: { cartId: cartQuery?.cart?.id, carrierMethod },
    mode: 'onChange',
  })

  const { handleSubmit, control, setValue, register, formState, required, error } = form
  const submit = handleSubmit(() => {})
  useFormCompose({ form, name: 'ShippingMethodForm', submit })

  return (
    <form onSubmit={submit} noValidate className={classes.form}>
      <input
        type='hidden'
        {...register('carrier', { required: required.carrier })}
        value={defaultMethod}
      />
      <input
        type='hidden'
        {...register('method', { required: required.method })}
        value={defaultCarrier}
      />
      <div className={classes.formRow}>
        <FormControl>
          <Controller
            defaultValue={carrierMethod}
            control={control}
            name='carrierMethod'
            rules={{ required: 'Please select a shipping method' }}
            render={({ field: { onChange, value, name, ref, onBlur } }) => (
              <ToggleButtonGroup
                aria-label='Shipping Method'
                onChange={(_, val: string) => {
                  onChange(val)
                  setValue('carrier', val.split('-')?.[0])
                  setValue('method', val.split('-')?.[1])

                  // todo(paales): what if there are additional options to submit, shouldn't we wait for that or will those always come back from this mutation?
                  // eslint-disable-next-line @typescript-eslint/no-floating-promises
                  submit()
                }}
                onBlur={onBlur}
                value={value}
                required
                defaultValue={carrierMethod}
                exclusive
              >
                {currentAddress?.available_shipping_methods?.map((m) => {
                  if (!m) return null
                  const code = `${m?.carrier_code}-${m?.method_code}`
                  return (
                    <AvailableShippingMethod key={code} value={code} {...m}>
                      Delivery from: Mon - Sat
                    </AvailableShippingMethod>
                  )
                })}
                {!currentAddress?.available_shipping_methods && (
                  <AvailableShippingMethod
                    available={false}
                    carrier_code='none'
                    carrier_title='No Shipping methods available'
                    amount={{ value: 0, currency: 'EUR' }}
                  >
                    Please fill in your address to load shipping methods
                  </AvailableShippingMethod>
                )}
              </ToggleButtonGroup>
            )}
          />
          {formState.errors.carrier && (
            <FormHelperText error variant='outlined'>
              {formState.errors.carrier.message}
            </FormHelperText>
          )}
        </FormControl>
      </div>
      <ApolloErrorAlert error={error} />
    </form>
  )
}
