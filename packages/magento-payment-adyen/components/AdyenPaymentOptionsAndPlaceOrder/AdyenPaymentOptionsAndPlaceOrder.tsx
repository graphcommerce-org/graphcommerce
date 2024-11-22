import { FormPersist, TextFieldElement, useFormCompose } from '@graphcommerce/ecommerce-ui'
import { useFormGqlMutationCart } from '@graphcommerce/magento-cart'
import type { PaymentOptionsProps } from '@graphcommerce/magento-cart-payment-method'
import { usePaymentMethodContext } from '@graphcommerce/magento-cart-payment-method'
import { FormRow } from '@graphcommerce/next-ui'
import { t } from '@lingui/macro'
import { useRouter } from 'next/router'
import { useAdyenCartLock } from '../../hooks/useAdyenCartLock'
import { useAdyenPaymentMethod } from '../../hooks/useAdyenPaymentMethod'
import type {
  AdyenPaymentOptionsAndPlaceOrderMutation,
  AdyenPaymentOptionsAndPlaceOrderMutationVariables,
} from './AdyenPaymentOptionsAndPlaceOrder.gql'
import { AdyenPaymentOptionsAndPlaceOrderDocument } from './AdyenPaymentOptionsAndPlaceOrder.gql'

/** It sets the selected payment method on the cart. */
export function HppOptions(props: PaymentOptionsProps) {
  const { code, step, child: brandCode } = props

  const conf = useAdyenPaymentMethod(brandCode)

  const [, lock] = useAdyenCartLock()
  const { selectedMethod } = usePaymentMethodContext()
  const { push } = useRouter()

  /**
   * In the this folder you'll also find a PaymentMethodOptionsNoop.graphql document that is
   * imported here and used as the basis for the form below.
   */
  const form = useFormGqlMutationCart<
    AdyenPaymentOptionsAndPlaceOrderMutation,
    AdyenPaymentOptionsAndPlaceOrderMutationVariables & { issuer?: string }
  >(AdyenPaymentOptionsAndPlaceOrderDocument, {
    onBeforeSubmit: (vars) => ({
      ...vars,
      stateData: JSON.stringify({
        paymentMethod: { type: brandCode, issuer: vars.issuer },
        clientStateDataIndicator: true,
      }),
      brandCode,
    }),
    onComplete: async (result) => {
      const merchantReference = result.data?.placeOrder?.order.order_number
      const action = result?.data?.placeOrder?.order.adyen_payment_status?.action

      if (result.errors) return

      if (!merchantReference || !selectedMethod?.code || !action) {
        throw Error(
          t`An error occurred while processing your payment. Please contact the store owner`,
        )
      }

      const url = JSON.parse(action).url as string
      await lock({ method: selectedMethod.code, adyen: '1', merchantReference })
      await push(url)
    },
  })

  const { handleSubmit, control, formState, required } = form

  const submit = handleSubmit(() => {})

  const key = `PaymentMethodOptions_${code}${brandCode}`

  /** To use an external Pay button we register the current form to be handled there as well. */
  useFormCompose({ form, step, submit, key })

  if (!conf?.issuers?.length) return <form onSubmit={submit} noValidate />

  /**
   * This is the form that the user can fill in. In this case we don't wat the user to fill in
   * anything.
   */
  return (
    <form key={key} onSubmit={submit} noValidate>
      {conf?.issuers && (
        <FormRow>
          <TextFieldElement
            control={control}
            name='issuer'
            defaultValue=''
            rules={{
              required: { value: true, message: 'Please provide an issuer' },
            }}
            variant='outlined'
            color='secondary'
            select
            SelectProps={{ native: true, displayEmpty: true }}
            error={formState.isSubmitted && !!formState.errors.issuer}
            helperText={formState.isSubmitted && formState.errors.issuer?.message}
            label={brandCode === 'ideal' ? 'Select your bank' : conf?.name}
            required
          >
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <option value='' />
            {conf.issuers.map((issuer) => {
              if (!issuer?.id || !issuer.name) return null

              return (
                <option key={issuer.id} value={issuer.id}>
                  {issuer.name}
                </option>
              )
            })}
          </TextFieldElement>
        </FormRow>
      )}
      <FormPersist form={form} name={key} persist={['issuer']} storage='localStorage' />
    </form>
  )
}
