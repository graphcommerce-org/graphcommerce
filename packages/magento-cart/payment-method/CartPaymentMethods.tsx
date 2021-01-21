import { FormControl } from '@material-ui/core'
import AnimatedRow from '@reachdigital/next-ui/AnimatedForm/AnimatedRow'
import useFormStyles from '@reachdigital/next-ui/AnimatedForm/useFormStyles'
import ToggleButton from '@reachdigital/next-ui/ToggleButton'
import ToggleButtonGroup from '@reachdigital/next-ui/ToggleButtonGroup'
import { Controller, useForm } from '@reachdigital/next-ui/useMutationForm'
import { AnimatePresence } from 'framer-motion'
import React from 'react'
import { AvailablePaymentMethodFragment } from './AvailablePaymentMethod.gql'
import { CartPaymentMethodsFragment } from './CartPaymentMethods.gql'

type TypeRenderer = React.VFC
type TypeRenderers = { [code: string]: TypeRenderer }

type CartPaymentMethodsProps = CartPaymentMethodsFragment & { renderers: TypeRenderers }
export default function CartPaymentMethods(props: CartPaymentMethodsProps) {
  const classes = useFormStyles()
  const { available_payment_methods, renderers } = props

  const { control, handleSubmit, watch, trigger } = useForm<{ paymentMethod: string }>({
    mode: 'onChange',
  })
  const code = watch('paymentMethod')
  const RenderMethod = renderers?.[code]

  return (
    <>
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
                  {available_payment_methods?.map((pm) => (
                    <ToggleButton key={pm?.code} value={pm?.code}>
                      {pm?.title}
                    </ToggleButton>
                  ))}
                </ToggleButtonGroup>
              )}
            />
          </FormControl>
        </div>
      </form>
      <AnimatePresence>
        {RenderMethod && (
          <AnimatedRow key={code}>
            <RenderMethod code={code} title='hoi' />
          </AnimatedRow>
        )}
      </AnimatePresence>
    </>
  )
}
