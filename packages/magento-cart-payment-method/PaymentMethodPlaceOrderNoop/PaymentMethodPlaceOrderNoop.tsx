import {
  useFormGqlMutationCart,
  useCurrentCartId,
  useClearCurrentCartId,
} from '@graphcommerce/magento-cart'
import { useFormCompose } from '@graphcommerce/react-hook-form'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { PaymentPlaceOrderProps } from '../Api/PaymentMethod'
import { PaymentMethodPlaceOrderNoopDocument } from './PaymentMethodPlaceOrderNoop.gql'

export default function PaymentMethodPlaceOrderNoop(props: PaymentPlaceOrderProps) {
  const { step, code } = props
  const clearCurrentCartId = useClearCurrentCartId()

  const cartId = useCurrentCartId()
  const form = useFormGqlMutationCart(PaymentMethodPlaceOrderNoopDocument, { mode: 'onChange' })

  const { handleSubmit, data, error } = form
  const router = useRouter()

  useEffect(() => {
    if (!data?.placeOrder?.order || error || !cartId) return
    clearCurrentCartId()
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    router.push({ pathname: '/checkout/success', query: { cartId } })
  }, [cartId, clearCurrentCartId, data?.placeOrder?.order, error, router])

  const submit = handleSubmit(() => {})

  useFormCompose({ form, step, submit, key: `PaymentMethodPlaceOrder_${code}` })

  return <form onSubmit={submit} />
}
