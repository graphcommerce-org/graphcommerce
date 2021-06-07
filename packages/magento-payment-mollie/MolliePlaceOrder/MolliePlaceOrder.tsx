import { useFormGqlMutationCart } from '@reachdigital/magento-cart'
import { PaymentPlaceOrderProps } from '@reachdigital/magento-cart-payment-method'
import { useFormCompose } from '@reachdigital/react-hook-form'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { MolliePlaceOrderDocument } from './MolliePlaceOrder.gql'

export default function MolliePlaceOrder(props: PaymentPlaceOrderProps) {
  const { step, paymentDone, code } = props
  const router = useRouter()

  const form = useFormGqlMutationCart(MolliePlaceOrderDocument, { mode: 'onChange' })

  const { handleSubmit, data, formState } = form

  const submit = handleSubmit(() => {
    paymentDone()
  })

  useEffect(() => {
    if (formState.isSubmitSuccessful && data?.placeOrder?.order.mollie_redirect_url) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      router.push(data?.placeOrder?.order.mollie_redirect_url)
    }
  }, [data?.placeOrder?.order.mollie_redirect_url, formState.isSubmitSuccessful, router])

  useFormCompose({ form, step, submit, key: `PaymentMethodPlaceOrder_${code}` })

  return <form onSubmit={submit} />
}
