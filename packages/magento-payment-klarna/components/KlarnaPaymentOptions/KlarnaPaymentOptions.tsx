import { useFormCompose, useFormAutoSubmit } from '@graphcommerce/ecommerce-ui'
import { useFormGqlMutationCart } from '@graphcommerce/magento-cart'
import { PaymentOptionsProps } from '@graphcommerce/magento-cart-payment-method'
import { KlarnaPaymentOptionsDocument } from './KlarnaPaymentOptions.gql'

declare var Klarna: any

export function KlarnaPaymentOptions(props: PaymentOptionsProps) {
  const { code, step } = props

  const form = useFormGqlMutationCart(KlarnaPaymentOptionsDocument, {
    onBeforeSubmit: (variables) => ({
      ...variables,
    }),
    onComplete: async (result) => {
      if (result.errors) return

      const clientToken = result.data?.createKlarnaPaymentsSession?.client_token

      try {
        Klarna.Payments.init({ client_token: clientToken })
        Klarna.Payments.load(
          {
            container: '#klarna-payments-container',
          },
          {},
          function (res) {
            console.debug(res)
          },
        )
      } catch (e) {
        console.error(e)
      }
    },
    mode: 'onChange',
  })

  const submit = form.handleSubmit(() => {})
  useFormAutoSubmit({ form, submit, forceInitialSubmit: true })

  const key = `PaymentMethodOptions_${code}`
  useFormCompose({ form, step, submit, key })

  return (
    <form onSubmit={submit} noValidate>
      <input type='hidden' value={code} />
      <div id='klarna-payments-container' />
    </form>
  )
}
