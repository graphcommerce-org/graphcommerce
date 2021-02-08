import { useQuery } from '@apollo/client'
import { FormControl, FormHelperText } from '@material-ui/core'
import useFormStyles from '@reachdigital/next-ui/AnimatedForm/useFormStyles'
import ToggleButtonGroup from '@reachdigital/next-ui/ToggleButtonGroup'
import { Controller } from '@reachdigital/react-hook-form/useForm'
import useFormGqlMutation from '@reachdigital/react-hook-form/useFormGqlMutation'
import React, { useEffect } from 'react'
import { ClientCartDocument } from '../ClientCart.gql'
import AvailableShippingMethod from './AvailableShippingMethod'
import {
  ShippingMethodFormDocument,
  ShippingMethodFormMutation,
  ShippingMethodFormMutationVariables,
} from './ShippingMethodForm.gql'

type ShippingMethodFormProps = {
  doSubmit: React.MutableRefObject<(() => Promise<boolean>) | undefined>
}

export default function ShippingMethodForm(props: ShippingMethodFormProps) {
  const classes = useFormStyles()
  const { doSubmit } = props
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

  const { errors, handleSubmit, control, setValue, register, formState, required } = form
  const submitHandler = handleSubmit(() => {})

  // todo: Move this to a validateAndSubmit method or something?
  useEffect(() => {
    doSubmit.current = async () => submitHandler().then(() => true)
  }, [doSubmit, formState.isValid, submitHandler])

  if (!currentAddress) return null

  return (
    <form onSubmit={submitHandler} noValidate className={classes.form}>
      <input
        type='hidden'
        name='carrier'
        ref={register({ required: required.carrier })}
        value={defaultMethod}
      />
      <input
        type='hidden'
        name='method'
        ref={register({ required: required.method })}
        value={defaultCarrier}
      />
      <div className={classes.formRow}>
        <FormControl>
          <Controller
            defaultValue={carrierMethod}
            control={control}
            name='carrierMethod'
            rules={{ required: 'Please select a shipping method' }}
            render={({ onChange, value, onBlur }) => (
              <ToggleButtonGroup
                aria-label='Shipping Method'
                onChange={(_, val: string) => {
                  onChange(val)
                  setValue('carrier', val.split('-')?.[0])
                  setValue('method', val.split('-')?.[1])

                  // todo(paales): what if there are additional options to submit, shouldn't we wait for that or will those always come back from this mutation?
                  // eslint-disable-next-line @typescript-eslint/no-floating-promises
                  submitHandler()
                }}
                onBlur={onBlur}
                value={value}
                required
                defaultValue={carrierMethod}
                exclusive
              >
                {currentAddress.available_shipping_methods?.map((m) => {
                  if (!m) return null
                  const code = `${m?.carrier_code}-${m?.method_code}`
                  return (
                    <AvailableShippingMethod key={code} value={code} {...m}>
                      Delivery from: Mon - Sat
                    </AvailableShippingMethod>
                  )
                })}
              </ToggleButtonGroup>
            )}
          />
          {errors.carrier && (
            <FormHelperText error variant='outlined'>
              {errors.carrier.message}
            </FormHelperText>
          )}
          {errors.submission && (
            <FormHelperText error variant='outlined'>
              {errors.submission?.message}
            </FormHelperText>
          )}
        </FormControl>
      </div>
    </form>
  )
}
