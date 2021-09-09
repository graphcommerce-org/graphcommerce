import { FormControl, FormHelperText } from '@material-ui/core'
import { Form, FormRow, ToggleButton, ToggleButtonGroup } from '@reachdigital/next-ui'
import { Controller, useForm, useFormPersist } from '@reachdigital/react-hook-form'
import React, { useEffect } from 'react'
import { PaymentMethod, PaymentToggleProps } from '../Api/PaymentMethod'
import { usePaymentMethodContext } from '../PaymentMethodContext/PaymentMethodContext'

export type PaymentMethodToggleProps = Record<string, unknown>

function Content(props: PaymentMethod) {
  const { code } = props
  const { modules } = usePaymentMethodContext()
  const Component = modules[code]?.PaymentToggle ?? ((p: PaymentToggleProps) => <>{p.title}</>)
  return <Component {...props} />
}

export default function PaymentMethodToggle(props: PaymentMethodToggleProps) {
  const { methods, selectedMethod, setSelectedMethod, setSelectedModule, modules } =
    usePaymentMethodContext()

  const form = useForm<{ code: string; paymentMethod?: string }>({
    mode: 'onChange',
    defaultValues: { code: selectedMethod?.code },
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
    if (foundMethod && !modules?.[foundMethod?.code ?? '']) {
      console.error(`No PaymentModule found for method ${foundMethod.code}`)
    }
    setSelectedMethod(foundMethod)
    setSelectedModule(modules?.[foundMethod?.code ?? ''])
  }, [methods, modules, paymentMethod, selectedMethod?.code, setSelectedMethod, setSelectedModule])

  return (
    <Form onSubmit={submitHandler} noValidate>
      <input type='hidden' {...register('code', { required: true })} required />
      <FormRow>
        <FormControl>
          <Controller
            defaultValue=''
            control={control}
            name='paymentMethod'
            rules={{ required: 'Please select a payment method' }}
            render={({ field: { onChange, value, name, ref, onBlur }, fieldState: { error } }) => (
              <>
                <ToggleButtonGroup
                  onChange={(_, val: string) => {
                    onChange(val)
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
                      color='secondary'
                      disabled={!modules?.[pm.code]}
                    >
                      {!modules?.[pm.code] ? <>{pm.code} not implemented</> : <Content {...pm} />}
                    </ToggleButton>
                  ))}
                </ToggleButtonGroup>
                {error && (
                  <>
                    {error.message ? (
                      <FormHelperText>{error.message}</FormHelperText>
                    ) : (
                      <FormHelperText>Required</FormHelperText>
                    )}
                  </>
                )}
              </>
            )}
          />
        </FormControl>
      </FormRow>
    </Form>
  )
}
