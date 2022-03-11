import {
  useClearCurrentCartId,
  useCurrentCartId,
  useFormGqlMutationCart,
} from '@graphcommerce/magento-cart'
import { PaymentPlaceOrderProps, useCartLock } from '@graphcommerce/magento-cart-payment-method'
import { useFormCompose } from '@graphcommerce/react-hook-form'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { MolliePlaceOrderDocument } from './MolliePlaceOrder.gql'

export function MolliePlaceOrder(props: PaymentPlaceOrderProps) {
  const { step, code } = props
  const router = useRouter()
  const cartId = useCurrentCartId()
  const clear = useClearCurrentCartId()
  const { lock } = useCartLock()

  const form = useFormGqlMutationCart(MolliePlaceOrderDocument, { mode: 'onChange' })

  const { handleSubmit, data, error, register, setValue } = form

  useEffect(() => {
    const current = new URL(window.location.href.replace(window.location.hash, ''))
    current.searchParams.append('payment_token', 'PAYMENT_TOKEN')
    const replaced = current.toString().replace('PAYMENT_TOKEN', '{{payment_token}}')
    setValue('returnUrl', replaced)
  }, [setValue])

  const submit = handleSubmit(() => {})

  useEffect(() => {
    if (!data?.placeOrder?.order || error || !cartId) return
    const redirectUrl = data?.placeOrder?.order.mollie_redirect_url
    const molliePaymentToken = data?.placeOrder?.order.mollie_payment_token

    if (redirectUrl) {
      lock(true)

      setTimeout(() => {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        router.push(redirectUrl)
      }, 500)
    }
    if (!redirectUrl && molliePaymentToken) {
      clear()
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      router.push({ pathname: '/checkout/success', query: { cartId, molliePaymentToken } })
    }
  }, [cartId, clear, data?.placeOrder?.order, error, lock, router])

  useFormCompose({ form, step, submit, key: `PaymentMethodPlaceOrder_${code}` })

  return (
    <form onSubmit={submit}>
      <input type='hidden' {...register('returnUrl')} />
    </form>
  )
}
