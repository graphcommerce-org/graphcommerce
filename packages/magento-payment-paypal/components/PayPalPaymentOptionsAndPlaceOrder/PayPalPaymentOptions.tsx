import {
  useFormCompose,
  useFormPersist,
  useFormValidFields,
  SelectElement,
} from '@graphcommerce/ecommerce-ui'
import { useCurrentCartId, useFormGqlMutationCart } from '@graphcommerce/magento-cart'
import {
  PaymentOptionsProps,
  usePaymentMethodContext,
} from '@graphcommerce/magento-cart-payment-method'
import { filterNonNullableKeys, FormRow } from '@graphcommerce/next-ui'
import { useRouter } from 'next/router'
import { usePayPalCartLock } from '../../hooks/usePayPalCartLock'
import { PayPalPaymentOptionsDocument } from './PayPalPaymentOptions.gql'

/** It sets the selected payment method on the cart. */
export function PayPalPaymentOptions(props: PaymentOptionsProps) {
  const { code, step } = props

  const [, lock, unlock] = usePayPalCartLock()
  const { selectedMethod } = usePaymentMethodContext()
  const { push } = useRouter()
  const cartId = useCurrentCartId()

  // nl/checkout/payment?token=EC-90660698S01734717&PayerID=FLQKQDYCXPQ2A
  /**
   * In the this folder you'll also find a PaymentMethodOptionsNoop.graphql document that is
   * imported here and used as the basis for the form below.
   */
  const form = useFormGqlMutationCart(PayPalPaymentOptionsDocument, {
    onBeforeSubmit: (variables) => ({
      ...variables,
      code,
      urls: { cancel_url: `checkout/payment`, return_url: `checkout/payment` },
    }),
    onComplete: async (result) => {
      if (result.errors) return

      const start = result.data?.createPaypalExpressToken?.paypal_urls?.start
      const edit = result.data?.createPaypalExpressToken?.paypal_urls?.edit
      const token = result.data?.createPaypalExpressToken?.token

      if (!start)
        throw Error(
          'Error while starting the PayPal payment, please try again with a different payment method',
        )

      await push(start)
    },
  })

  const { handleSubmit, register } = form

  const submit = handleSubmit(() => {})

  const key = `PaymentMethodOptions_${code}`

  /** To use an external Pay button we register the current form to be handled there as well. */
  useFormCompose({ form, step, submit, key })

  /** This is the form that the user can fill in. In this case we don't wat the user to fill in anything. */
  return (
    <form key={key} onSubmit={submit} noValidate>
      <input type='hidden' value={code} {...register('code')} />
    </form>
  )
}
