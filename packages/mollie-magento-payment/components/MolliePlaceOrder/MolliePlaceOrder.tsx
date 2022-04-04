import { useCurrentCartId, useFormGqlMutationCart } from '@graphcommerce/magento-cart'
import { PaymentPlaceOrderProps } from '@graphcommerce/magento-cart-payment-method'
import { useFormCompose } from '@graphcommerce/react-hook-form'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useCartLockWithToken } from '../../hooks/useCartLockWithToken'
import { MolliePlaceOrderDocument } from './MolliePlaceOrder.gql'

export function MolliePlaceOrder(props: PaymentPlaceOrderProps) {
  const { step, code } = props
  const { push } = useRouter()
  const cartId = useCurrentCartId()
  const [, lock] = useCartLockWithToken()

  const form = useFormGqlMutationCart(MolliePlaceOrderDocument)

  const { handleSubmit, data, error, register, setValue } = form

  useEffect(() => {
    const current = new URL(window.location.href.replace(window.location.hash, ''))
    // current.searchParams.append('locked', '1')
    current.searchParams.set('cart_id', cartId ?? '')
    current.searchParams.set('mollie_payment_token', 'PAYMENT_TOKEN')
    const replaced = current.toString().replace('PAYMENT_TOKEN', '{{payment_token}}')
    setValue('returnUrl', replaced)
  }, [cartId, setValue])

  const submit = handleSubmit(() => {})

  useEffect(() => {
    if (!data?.placeOrder?.order || error || !cartId) return
    const redirectUrl = data?.placeOrder?.order.mollie_redirect_url
    const mollie_payment_token = data?.placeOrder?.order.mollie_payment_token

    // When redirecting to the payment gateway
    if (redirectUrl && mollie_payment_token) {
      lock({ mollie_payment_token })
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      push(redirectUrl)
    }
  }, [cartId, data?.placeOrder?.order, error, lock, push])

  useFormCompose({ form, step, submit, key: `PaymentMethodPlaceOrder_${code}` })

  return (
    <form onSubmit={submit}>
      <input type='hidden' {...register('returnUrl')} />
    </form>
  )
}
