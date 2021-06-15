import { useCurrentCartId, useFormGqlMutationCart } from '@reachdigital/magento-cart'
import { PaymentPlaceOrderProps } from '@reachdigital/magento-cart-payment-method'
import { useFormCompose } from '@reachdigital/react-hook-form'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { MolliePlaceOrderDocument } from './MolliePlaceOrder.gql'

export default function MolliePlaceOrder(props: PaymentPlaceOrderProps) {
  const { step, paymentDone, code } = props
  const router = useRouter()
  const cartId = useCurrentCartId()

  const form = useFormGqlMutationCart(MolliePlaceOrderDocument, { mode: 'onChange' })

  const { handleSubmit, data, formState } = form

  const redirectUrl = data?.placeOrder?.order.mollie_redirect_url
  const molliePaymentToken = data?.placeOrder?.order.mollie_payment_token

  const submit = handleSubmit(() => {
    paymentDone()
  })

  useEffect(() => {
    if (!formState.isSubmitSuccessful || !cartId) return

    if (redirectUrl) {
      paymentDone()
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      router.push(redirectUrl)
    }
    if (!redirectUrl && molliePaymentToken) {
      paymentDone()
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      router.push({ pathname: '/checkout/success', query: { cartId, molliePaymentToken } })
    }
  }, [cartId, formState.isSubmitSuccessful, paymentDone, molliePaymentToken, redirectUrl, router])

  useFormCompose({ form, step, submit, key: `PaymentMethodPlaceOrder_${code}` })

  return <form onSubmit={submit} />
}
