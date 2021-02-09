import { useQuery } from '@apollo/client'
import { FormControl } from '@material-ui/core'
import useFormStyles from '@reachdigital/next-ui/AnimatedForm/useFormStyles'
import ToggleButton from '@reachdigital/next-ui/ToggleButton'
import ToggleButtonGroup from '@reachdigital/next-ui/ToggleButtonGroup'
import { useForm, Controller } from '@reachdigital/react-hook-form/useForm'
import useFormPersist from '@reachdigital/react-hook-form/useFormPersist'
import React, { useEffect } from 'react'
import { ClientCartDocument } from '../ClientCart.gql'
import { usePaymentMethodContext } from './PaymentMethodContext'

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

  const form = useForm<{ code: string; paymentMethod?: string }>({
    mode: 'onChange',
    defaultValues: { code: cartData?.cart?.selected_payment_method?.code },
  })
  useFormPersist({ form, name: 'PaymentMethodToggle' })

  const { control, handleSubmit, watch, register, setValue } = form
  const submitHandler = handleSubmit(() => {})

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
    <form onSubmit={submitHandler} noValidate className={classes.form}>
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
