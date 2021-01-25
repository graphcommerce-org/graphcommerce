import { useQuery } from '@apollo/client'
import { FormControl } from '@material-ui/core'
import AnimatedRow from '@reachdigital/next-ui/AnimatedForm/AnimatedRow'
import useFormStyles from '@reachdigital/next-ui/AnimatedForm/useFormStyles'
import ToggleButton from '@reachdigital/next-ui/ToggleButton'
import ToggleButtonGroup from '@reachdigital/next-ui/ToggleButtonGroup'
import { Controller, useForm } from '@reachdigital/next-ui/useMutationForm'
import { AnimatePresence } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import { ClientCartDocument, ClientCartQuery } from '../ClientCart.gql'
import { AvailablePaymentMethodFragment } from './AvailablePaymentMethod.gql'
import { CartPaymentMethodsFragment } from './CartPaymentMethods.gql'

export type PaymentMethodProps = AvailablePaymentMethodFragment & { child: string }
export type ExpandPaymentMethods = (
  method: AvailablePaymentMethodFragment,
  cart: ClientCartQuery['cart'],
) => Promise<PaymentMethodProps[]> | PaymentMethodProps[]

type TypeRenderer = {
  default: React.VFC<PaymentMethodProps>
  PayButton: React.VFC<PaymentMethodProps>
  expandMethods?: ExpandPaymentMethods
}

type TypeRenderers = { [code: string]: TypeRenderer }

type CartPaymentMethodsProps = CartPaymentMethodsFragment & { renderers: TypeRenderers }
export default function CartPaymentMethods(props: CartPaymentMethodsProps) {
  const classes = useFormStyles()
  const { available_payment_methods, renderers } = props
  const { data: cartData } = useQuery(ClientCartDocument)
  const [expandedMethods, setExpandedMethods] = useState<PaymentMethodProps[]>([])

  // Expand the payment methods
  useEffect(() => {
    if (!cartData) return // eslint-disable-next-line @typescript-eslint/no-floating-promises
    ;(async () => {
      const promises =
        available_payment_methods?.map(async (method) => {
          if (!method) return Promise.resolve([])

          return (
            renderers?.[method.code]?.expandMethods?.(method, cartData.cart) ?? [
              { ...method, child: '' },
            ]
          )
        }) ?? []

      setExpandedMethods((await Promise.all(promises)).flat(1))
    })()
  }, [available_payment_methods, cartData, renderers])

  const { control, handleSubmit, watch, trigger } = useForm<{ paymentMethod: string }>({
    mode: 'onChange',
  })
  const [code, child] = watch('paymentMethod')?.split('___') ?? ['']
  const PaymentForm = renderers?.[code]?.default

  const selectedMethod = expandedMethods.find(
    (method) => method.code === code && (!child || method.child === child),
  ) as PaymentMethodProps

  return (
    <AnimatePresence>
      {!expandedMethods.length && (
        <AnimatedRow key='loading'>
          <div>loadinggg</div>
        </AnimatedRow>
      )}
      {expandedMethods.length && (
        <AnimatedRow key='form'>
          <form onSubmit={handleSubmit(() => {})} noValidate className={classes.form}>
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
                        // eslint-disable-next-line @typescript-eslint/no-floating-promises
                        trigger('paymentMethod')
                        // eslint-disable-next-line @typescript-eslint/no-floating-promises
                        handleSubmit(() => {})
                      }}
                      defaultValue=''
                      aria-label='Payment Method'
                      onBlur={onBlur}
                      value={value}
                      required
                      exclusive
                    >
                      {expandedMethods?.map((pm) => (
                        <ToggleButton
                          key={`${pm.code}___${pm.child}`}
                          value={`${pm.code}___${pm.child}`}
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
        </AnimatedRow>
      )}
      {PaymentForm && (
        <AnimatedRow key={code}>
          <PaymentForm {...selectedMethod} />
        </AnimatedRow>
      )}
    </AnimatePresence>
  )
}
