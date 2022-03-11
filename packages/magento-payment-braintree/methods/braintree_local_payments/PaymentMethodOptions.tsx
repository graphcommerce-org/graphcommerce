import { useCartQuery, useFormGqlMutationCart } from '@graphcommerce/magento-cart'
import { PaymentOptionsProps } from '@graphcommerce/magento-cart-payment-method'
import { useFormCompose } from '@graphcommerce/react-hook-form'
import { BraintreePaymentMethodOptionsDocument } from '../../BraintreePaymentMethodOptions.gql'
import { StartPaymentOptions } from '../../hooks/useBraintree'
import { useBraintreeLocalPayment } from '../../hooks/useBraintreeLocalPayment'
import { BraintreeLocalPaymentsCartDocument } from './BraintreeLocalPaymentsCart.gql'

/** It sets the selected payment method on the cart. */
export function PaymentMethodOptions(props: PaymentOptionsProps) {
  const localPaymentPromise = useBraintreeLocalPayment()

  const { code, step, child } = props
  const paymentType = child as StartPaymentOptions['paymentType']
  const { data: cartData } = useCartQuery(BraintreeLocalPaymentsCartDocument)

  /**
   * In the this folder you'll also find a PaymentMethodOptionsNoop.graphql document that is
   * imported here and used as the basis for the form below.
   */
  const form = useFormGqlMutationCart(BraintreePaymentMethodOptionsDocument, {
    defaultValues: { code },
    onBeforeSubmit: async () => {
      if (!cartData || !paymentType) throw Error('no ready')

      const address = cartData.cart?.shipping_addresses?.[0]

      const localPayment = await localPaymentPromise
      const paymentResult = await localPayment.startPayment({
        paymentType,
        amount: cartData.cart?.prices?.grand_total?.value?.toString() ?? '0.00',
        fallback: {
          buttonText: 'Return to website',
          url: window.location.href,
        },
        currencyCode: cartData.cart?.prices?.grand_total?.currency ?? 'EUR',
        shippingAddressRequired: false,
        email: cartData?.cart?.email ?? '',
        phone: address?.telephone ?? '',
        givenName: address?.firstname ?? '',
        surname: address?.lastname ?? '',
        address: {
          streetAddress: address?.street[0] ?? '',
          extendedAddress: address?.street.slice(1).join('\n') ?? '',
          locality: address?.city ?? '',
          postalCode: address?.postcode ?? '',
          region: address?.region?.code ?? '',
          countryCode: address?.country.code ?? '',
        },
        onPaymentStart: ({ paymentId }, next) => {
          // todo what should we do with the payment id?
          // eslint-disable-next-line no-console
          console.log(paymentId)
          next()
        },
      })

      return {
        cartId: cartData.cart?.id as string,
        deviceData: '',
        isTokenEnabler: false,
        nonce: paymentResult.nonce,
        code,
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
