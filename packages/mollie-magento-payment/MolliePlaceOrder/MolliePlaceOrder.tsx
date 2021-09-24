import {
  useClearCurrentCartId,
  useCurrentCartId,
  useFormGqlMutationCart,
} from '@graphcommerce/magento-cart'
import { PaymentPlaceOrderProps } from '@graphcommerce/magento-cart-payment-method'
import { useFormCompose } from '@graphcommerce/react-hook-form'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { MolliePlaceOrderDocument } from './MolliePlaceOrder.gql'

export default function MolliePlaceOrder(props: PaymentPlaceOrderProps) {
  const { step, code } = props
  const router = useRouter()
  const cartId = useCurrentCartId()
  const clearCurrentCartId = useClearCurrentCartId()

  const form = useFormGqlMutationCart(MolliePlaceOrderDocument, { mode: 'onChange' })

  const { handleSubmit, data, error } = form

  const submit = handleSubmit(() => {})

  useEffect(() => {
    if (!data?.placeOrder?.order || error || !cartId) return
    const redirectUrl = data?.placeOrder?.order.mollie_redirect_url
    const molliePaymentToken = data?.placeOrder?.order.mollie_payment_token

    if (redirectUrl) {
      clearCurrentCartId?.()
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      router.push(redirectUrl)
    }
    if (!redirectUrl && molliePaymentToken) {
      clearCurrentCartId?.()
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      router.push({ pathname: '/checkout/success', query: { cartId, molliePaymentToken } })
    }
  }, [cartId, clearCurrentCartId, data?.placeOrder?.order, error, router])

  useFormCompose({ form, step, submit, key: `PaymentMethodPlaceOrder_${code}` })

  return <form onSubmit={submit} />
}
