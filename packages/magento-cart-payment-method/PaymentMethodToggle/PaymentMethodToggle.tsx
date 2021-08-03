import { FormControl, makeStyles, Theme } from '@material-ui/core'
import {
  Form,
  FormRow,
  ToggleButton,
  ToggleButtonGroup,
  SliderContainer,
  SliderContext,
  SliderNext,
  SliderPrev,
  SliderScroller,
} from '@reachdigital/next-ui'
import { Controller, useForm, useFormPersist } from '@reachdigital/react-hook-form'
import React, { useEffect } from 'react'
import { PaymentMethod, PaymentToggleProps } from '../Api/PaymentMethod'
import { usePaymentMethodContext } from '../PaymentMethodContext/PaymentMethodContext'

const useStyles = makeStyles(
  (theme: Theme) => ({
    formRoot: {
      padding: '5px 0',
    },
    root: {
      padding: 0,
    },
    toggleGroup: {
      display: 'inline-flex',
      gap: 0,
    },
    toggleButton: {
      width: 200,
      margin: 5,
    },
  }),
  { name: 'PaymentMethodToggle' },
)

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
  const classes = useStyles()

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
    <Form onSubmit={submitHandler} noValidate classes={{ root: classes.formRoot }}>
      <input type='hidden' {...register('code', { required: true })} required />
      <FormRow className={classes.root}>
        <FormControl>
          <Controller
            defaultValue=''
            control={control}
            name='paymentMethod'
            rules={{ required: 'Please select a payment method' }}
            render={({ field: { onChange, value, name, ref, onBlur } }) => (
              <SliderContext scrollSnapAlign='start'>
                <SliderContainer>
                  <SliderScroller>
                    <ToggleButtonGroup
                      classes={{ root: classes.toggleGroup }}
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
                          size='large'
                          className={classes.toggleButton}
                        >
                          {!modules?.[pm.code] ? (
                            <>{pm.code} not implemented</>
                          ) : (
                            <Content {...pm} />
                          )}
                        </ToggleButton>
                      ))}
                    </ToggleButtonGroup>
                  </SliderScroller>
                  {/* <SliderPrev />
                  <SliderNext /> */}
                </SliderContainer>
              </SliderContext>
            )}
          />
        </FormControl>
      </FormRow>
    </Form>
  )
}
