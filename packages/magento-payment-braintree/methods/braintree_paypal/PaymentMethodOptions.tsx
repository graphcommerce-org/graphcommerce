import { useCartQuery, useFormGqlMutationCart } from '@graphcommerce/magento-cart'
import {
  PaymentOptionsProps,
  usePaymentMethodContext,
} from '@graphcommerce/magento-cart-payment-method'
import { useFormCompose } from '@graphcommerce/react-hook-form'
// import { PayPalCheckoutCreatePaymentOptions } from 'braintree-web/paypal-checkout'
import type { FlowType, Intent } from 'paypal-checkout-components'
import { useEffect } from 'react'
import { BraintreePaymentMethodOptionsDocument } from '../../BraintreePaymentMethodOptions.gql'
import { useBraintreeCartLock } from '../../hooks/useBraintreeCartLock'
import { useBraintreePaypal } from '../../hooks/useBraintreePaypal'
import { isBraintreeError } from '../../utils/isBraintreeError'
import { BraintreeLocalPaymentsCartDocument } from '../braintree_local_payments/BraintreeLocalPaymentsCart.gql'

export function PaymentMethodOptions(props: PaymentOptionsProps) {
  const paypal = useBraintreePaypal()

  useEffect(() => {})

  const { code, step, child } = props
  const { data: cartData } = useCartQuery(BraintreeLocalPaymentsCartDocument)
  const [lockState, lock, unlock] = useBraintreeCartLock()
  const { selectedMethod } = usePaymentMethodContext()

  useEffect(() => {
    if (lockState.locked && !lockState.justLocked) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      unlock({ payment_id: null })
    }
  }, [lockState.justLocked, lockState.locked, unlock])

  const form = useFormGqlMutationCart(BraintreePaymentMethodOptionsDocument, {
    defaultValues: { code },
    onBeforeSubmit: async () => {
      if (!cartData?.cart?.id) throw Error('Cart id is missing')
      if (!cartData.cart.prices?.grand_total?.value) throw Error("Cart doesn't have a total")
      if (!cartData.cart.prices.grand_total.currency) throw Error("Cart doesn't have a total")
      if (!selectedMethod?.code) throw Error('Selected method not found')
      if (!paypal) throw Error('Paypal not loaded')

      await lock({ payment_id: null, method: selectedMethod?.code })

      const address = cartData.cart.shipping_addresses?.[0]

      const nonce = await paypal.createPayment({
        flow: 'checkout' as FlowType, // Required
        amount: cartData.cart.prices.grand_total.value,
        currency: cartData.cart.prices.grand_total.currency,
        intent: 'authorize' as Intent,

        enableShippingAddress: true,
        shippingAddressEditable: false,
        shippingAddressOverride: {
          recipientName: `${address?.firstname} ${address?.lastname}`,
          line1: address?.street.join(' ') ?? '',
          // line2: 'Unit 1',
          city: address?.city ?? '',
          countryCode: address?.country.code ?? '',
          postalCode: address?.postcode ?? '',
          state: address?.region?.code ?? '',
          phone: address?.telephone ?? '',
        },
      })

      try {
        return { cartId: cartData?.cart?.id, deviceData: '', isTokenEnabler: false, nonce, code }
      } catch (e) {
        if (isBraintreeError(e)) await unlock({ payment_id: null })
        throw e
      }
    },
  })

  const { handleSubmit, register } = form
  const submit = handleSubmit(() => {})

  /** To use an external Pay button we register the current form to be handled there as well. */
  useFormCompose({ form, step, submit, key: `PaymentMethodOptions_${code}` })

  /** This is the form that the user can fill in. In this case we don't wat the user to fill in anything. */
  return (
    <form onSubmit={submit}>
      <input type='hidden' {...register('code')} />
    </form>
  )
}
