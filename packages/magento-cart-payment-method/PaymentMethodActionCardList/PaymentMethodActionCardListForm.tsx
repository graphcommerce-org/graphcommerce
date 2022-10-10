import {
  ActionCard,
  Button,
  FormDiv,
  ActionCardItemBase,
  ActionCardItemRenderProps,
  ActionCardListForm,
} from '@graphcommerce/next-ui'
import {
  useForm,
  useFormCompose,
  UseFormComposeOptions,
  useFormPersist,
} from '@graphcommerce/react-hook-form'
import { i18n } from '@lingui/core'
import { Trans } from '@lingui/react'
import { SxProps, Theme } from '@mui/material'
import { useEffect } from 'react'
import { PaymentMethodActionCardProps, PaymentOptionsProps } from '../Api/PaymentMethod'
import { usePaymentMethodContext } from '../PaymentMethodContext/PaymentMethodContext'
import { useCartLock } from '../hooks'

function DefaultPaymentActionCard(props: PaymentMethodActionCardProps) {
  return <ActionCard {...props} />
}

function PaymentMethodActionCard(
  props: ActionCardItemRenderProps<PaymentOptionsProps> & {
    sx?: SxProps<Theme>
  },
) {
  const { onReset, code, step, child, Container, sx = [] } = props
  const { selectedMethod, selectedModule, modules } = usePaymentMethodContext()

  const selectedAndOptions =
    selectedMethod?.code === code &&
    selectedMethod.child === child &&
    selectedModule?.PaymentOptions

  const Card = modules[code]?.PaymentActionCard ?? DefaultPaymentActionCard

  return (
    <Card
      sx={[
        {
          '& .ActionCard-title': { typography: 'h6', lineHeight: 0 },
          '& .ActionCard-details': { lineHeight: 1.5 },
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      action={
        <Button disableTouchRipple variant='inline' color='secondary' tabIndex={-1}>
          <Trans id='Select' />
        </Button>
      }
      reset={
        <Button disableTouchRipple variant='inline' color='secondary' onClick={onReset}>
          <Trans id='Change' />
        </Button>
      }
      after={
        selectedAndOptions && (
          <selectedModule.PaymentOptions {...selectedMethod} step={step} Container={Container} />
        )
      }
      {...props}
    />
  )
}

export type PaymentMethodActionCardListFormProps = Pick<UseFormComposeOptions, 'step'>

export function PaymentMethodActionCardListForm(props: PaymentMethodActionCardListFormProps) {
  const { step } = props
  const { methods, selectedMethod, setSelectedMethod, setSelectedModule, modules } =
    usePaymentMethodContext()

  const [lockState] = useCartLock()
  const form = useForm<{ code: string | null; paymentMethod?: string }>({
    defaultValues: { code: lockState.method },
  })

  const { control, handleSubmit, watch, setValue } = form
  const submit = handleSubmit(() => {})

  const paymentMethod = watch('paymentMethod')

  useFormPersist({ form, name: 'PaymentMethodActionCardList' })
  useFormCompose({ form, step: 1, submit, key: 'PaymentMethodActionCardList' })

  // todo: Do not useEffect to set value, usePaymentMethodContext should calculate these values.
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

  useEffect(() => {
    if (selectedMethod?.code) setValue('code', selectedMethod.code)
  }, [selectedMethod?.code, setValue])

  if (!methods || methods.length < 1) return null

  return (
    <ActionCardListForm<PaymentOptionsProps & ActionCardItemBase>
      control={control}
      name='paymentMethod'
      errorMessage={i18n._(/* i18n */ 'Please select a payment method')}
      collapse
      size='large'
      color='secondary'
      items={methods.map((method) => ({
        ...method,
        value: `${method.code}___${method.child}`,
        step,
        Container: FormDiv,
      }))}
      render={PaymentMethodActionCard}
    />
  )
}
