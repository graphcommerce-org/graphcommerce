import type { ActionCardItemRenderProps } from '@graphcommerce/ecommerce-ui'
import { ActionCardListForm } from '@graphcommerce/ecommerce-ui'
import type { ActionCardProps } from '@graphcommerce/next-ui'
import { ActionCard, Button, FormDiv } from '@graphcommerce/next-ui'
import type { UseFormComposeOptions } from '@graphcommerce/react-hook-form'
import { FormPersist, useForm, useFormCompose } from '@graphcommerce/react-hook-form'
import { i18n } from '@lingui/core'
import { Trans } from '@lingui/react'
import type { SxProps, Theme } from '@mui/material'
import { useEffect } from 'react'
import type { PaymentOptionsProps } from '../Api/PaymentMethod'
import { usePaymentMethodContext } from '../PaymentMethodContext/paymentMethodContextType'
import { useCartLock } from '../hooks'

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

  const Card = modules[code]?.PaymentActionCard ?? ActionCard

  return (
    <Card
      sx={[
        {
          '& .ActionCard-title': { typography: 'h6' },
          '& .ActionCard-details': { lineHeight: 1.5 },
          '& .ActionCard-image svg, .ActionCard-image img': { width: '32px', height: '32px' },
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      action={
        <Button disableRipple variant='inline' color='secondary' tabIndex={-1}>
          <Trans id='Select' />
        </Button>
      }
      reset={
        <Button disableRipple variant='inline' color='secondary' onClick={onReset}>
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

  type FormFields = { code: string | null; paymentMethod?: string }
  const form = useForm<FormFields>({})

  const { control, handleSubmit, watch, setValue } = form
  const submit = handleSubmit(() => {})

  const paymentMethod = watch('paymentMethod')

  useEffect(() => {
    if (lockState.method) setValue('code', lockState.method)
  }, [lockState.method, setValue])

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
    <>
      <ActionCardListForm<PaymentOptionsProps & ActionCardProps, FormFields>
        control={control}
        name='paymentMethod'
        errorMessage={i18n._(/* i18n */ 'Please select a payment method')}
        collapse
        size='large'
        color='secondary'
        required
        items={methods.map((method) => ({
          ...method,
          value: `${method.code}___${method.child}`,
          step,
          Container: FormDiv,
          disabled: !modules?.[method.code ?? ''],
        }))}
        render={PaymentMethodActionCard}
      />
      <FormPersist form={form} name='PaymentMethodActionCardList' />
    </>
  )
}
