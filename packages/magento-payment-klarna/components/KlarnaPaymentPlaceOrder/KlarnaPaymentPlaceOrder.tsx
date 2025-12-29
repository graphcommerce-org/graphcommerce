import { useFormCompose } from '@graphcommerce/ecommerce-ui'
import { useCartQuery, useFormGqlMutationCart } from '@graphcommerce/magento-cart'
import { BillingPageDocument } from '@graphcommerce/magento-cart-checkout'
import type { PaymentPlaceOrderProps } from '@graphcommerce/magento-cart-payment-method'
import { usePaymentMethodContext } from '@graphcommerce/magento-cart-payment-method'
import { useRouter } from 'next/router'
import { useKlarnaCartLock } from '../../hooks/useKlarnaCartLock'
import type { KlarnaResponse } from '../../klarna.d'
import { KlarnaPaymentPlaceOrderDocument } from './KlarnaPaymentPlaceOrder.gql'

export function KlarnaPaymentPlaceOrder(props: PaymentPlaceOrderProps) {
  const { code, step } = props
  const [, lock, unlock] = useKlarnaCartLock()
  const { reload } = useRouter()
  const { onSuccess } = usePaymentMethodContext()
  const cart = useCartQuery(BillingPageDocument)

  const klarnaPaymentsAuthorize = () =>
    new Promise<KlarnaResponse>((resolve, reject) => {
      try {
        Klarna.Payments.authorize(
          {
            payment_method_category: 'pay_later',
          },
          {
            billing_address: {
              given_name: cart.data?.cart?.billing_address?.firstname.toUpperCase(),
              family_name: cart.data?.cart?.billing_address?.lastname.toUpperCase(),
              email: cart.data?.cart?.email ?? undefined,
              street_address: cart.data?.cart?.billing_address?.street.join(' ').toUpperCase(),
              postal_code: cart.data?.cart?.billing_address?.postcode ?? undefined,
              phone: cart.data?.cart?.billing_address?.telephone ?? undefined,
              region: cart.data?.cart?.billing_address?.region?.code,
              city: cart.data?.cart?.billing_address?.city.toUpperCase(),
              country: cart.data?.cart?.billing_address?.country.code,
            },
            shipping_address: {
              given_name: cart.data?.cart?.shipping_addresses[0]?.firstname.toUpperCase(),
              family_name: cart.data?.cart?.shipping_addresses[0]?.lastname.toUpperCase(),
              email: cart.data?.cart?.email ?? undefined,
              street_address: cart.data?.cart?.shipping_addresses[0]?.street
                .join(' ')
                .toUpperCase(),
              postal_code: cart.data?.cart?.shipping_addresses[0]?.postcode ?? undefined,
              phone: cart.data?.cart?.shipping_addresses[0]?.telephone ?? undefined,
              region: cart.data?.cart?.shipping_addresses[0]?.region?.code,
              city: cart.data?.cart?.shipping_addresses[0]?.city.toUpperCase(),
              country: cart.data?.cart?.shipping_addresses[0]?.country.code,
            },
            customer: { type: 'person' },
          },
          (response: KlarnaResponse) => {
            resolve(response)
          },
        )
      } catch (error) {
        reject(error)
      }
    })

  const form = useFormGqlMutationCart(KlarnaPaymentPlaceOrderDocument, {
    onBeforeSubmit: async (variabless) => {
      try {
        await lock({ method: code })
        const response = await klarnaPaymentsAuthorize()
        if (response.approved === false) {
          await unlock({})
          reload()
        }
        return {
          cartId: variabless.cartId,
          paymentMethod: {
            code,
            klarna: {
              authorization_token: response.authorization_token ?? '',
            },
          },
        }
      } catch (error) {
        await unlock({})
        throw error
      }
    },
    onComplete: async (result) => {
      if (result.errors || !result.data?.placeOrder?.order) {
        await unlock({})
        return
      }

      await onSuccess(result.data?.placeOrder?.order.order_number)
    },
  })

  const submit = form.handleSubmit(() => {})
  useFormCompose({ form, step, submit, key: `KlarnaPaymentPlaceOrder_${code}` })

  return (
    <form onSubmit={submit} noValidate>
      <input type='hidden' value={code} />
    </form>
  )
}
