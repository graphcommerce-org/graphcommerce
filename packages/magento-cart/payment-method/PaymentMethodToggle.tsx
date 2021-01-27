import { useQuery } from '@apollo/client'
import { FormControl } from '@material-ui/core'
import useFormStyles from '@reachdigital/next-ui/AnimatedForm/useFormStyles'
import ToggleButton from '@reachdigital/next-ui/ToggleButton'
import ToggleButtonGroup from '@reachdigital/next-ui/ToggleButtonGroup'
import { Controller, useForm, useMutationForm } from '@reachdigital/next-ui/useMutationForm'
import useMutationFormPersist, {
  useFormPersist,
} from '@reachdigital/next-ui/useMutationForm/useMutationFormPersist'
import React, { useEffect } from 'react'
import { ClientCartDocument } from '../ClientCart.gql'
import { usePaymentMethodContext } from './PaymentMethodContext'
import {
  PaymentMethodToggleDocument,
  PaymentMethodToggleMutation,
  PaymentMethodToggleMutationVariables,
} from './PaymentMethodToggle.gql'

export default function PaymentMethodContext() {
  const {
    methods,
    loading,
    selectedMethod,
    setSelectedMethod,
    setSelectedModule,
    setError,
    modules,
  } = usePaymentMethodContext()

  const classes = useFormStyles()
  const { data: cartData } = useQuery(ClientCartDocument)

  const mutationForm = useFormPersist<{ code: string; paymentMethod?: string }>(
    'PaymentMethodToggle',
    { mode: 'onChange', defaultValues: { code: cartData?.cart?.selected_payment_method?.code } },
  )

  const { control, handleSubmit, watch, register, setValue } = mutationForm

  const paymentMethod = watch('paymentMethod')
  useEffect(() => {
    const [code, child] = paymentMethod?.split('___') ?? ['']
    if (code === selectedMethod?.code) return

    const foundMethod = methods.find(
      (method) => method.code === code && (!child || method.child === child),
    )
    setSelectedMethod(foundMethod)
    setSelectedModule(modules?.[foundMethod?.code ?? ''])
  })

  return (
    <form onSubmit={handleSubmit(() => {})} noValidate className={classes.form}>
      <input type='hidden' name='code' ref={register({ required: true })} required />
      <div className={classes.formRow}>
        <FormControl>
          <Controller
            defaultValue=''
            control={control}
            name='paymentMethod'
            rules={{ required: 'Please select a payment method' }}
            render={({ onChange, value, onBlur }) => (
              <ToggleButtonGroup
                onChange={(_, val: string) => {
                  onChange(val)
                  setError(undefined)
                  setValue('code', val?.split('___')[0])
                }}
                defaultValue=''
                aria-label='Payment Method'
                onBlur={onBlur}
                value={value}
                required
                exclusive
              >
                {methods?.map((pm) => (
                  <ToggleButton
                    key={`${pm.code}___${pm.child}`}
                    value={`${pm.code}___${pm.child}`}
                    disabled={loading}
                  >
                    {pm?.title}
                  </ToggleButton>
                ))}
              </ToggleButtonGroup>
            )}
          />
        </FormControl>
      </div>
    </form>
  )
}
