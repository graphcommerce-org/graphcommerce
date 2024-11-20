import { ApolloErrorSnackbar, useFormCompose } from '@graphcommerce/ecommerce-ui'
import { useMutation } from '@graphcommerce/graphql'
import { useCartQuery, useFormGqlMutationCart } from '@graphcommerce/magento-cart'
import { BillingPageDocument } from '@graphcommerce/magento-cart-checkout'
import type { PaymentPlaceOrderProps } from '@graphcommerce/magento-cart-payment-method'
import { usePaymentMethodContext } from '@graphcommerce/magento-cart-payment-method'
import { ErrorSnackbar } from '@graphcommerce/next-ui'
import { t } from '@lingui/macro'
import { useRouter } from 'next/router'
import { useMSPCartLock } from '../../hooks/useMSPCartLock'
import { MSPPaymentHandlerDocument } from '../MSPPaymentHandler/MSPPaymentHandler.gql'
import { MSPPaymentPlaceOrderDocument } from './MSPPaymentPlaceOrder.gql'

export function MSPPaymentPlaceOrder(props: PaymentPlaceOrderProps) {
  const { code, step } = props

  const [, lock] = useMSPCartLock()
  const { selectedMethod } = usePaymentMethodContext()
  const { push } = useRouter()

  const [restoreCart, restoreResult] = useMutation(MSPPaymentHandlerDocument)
  const billingPage = useCartQuery(BillingPageDocument)

  /**
   * In the this folder you'll also find a PaymentMethodOptionsNoop.graphql document that is
   * imported here and used as the basis for the form below.
   */
  const form = useFormGqlMutationCart(MSPPaymentPlaceOrderDocument, {
    onComplete: async (result, variables) => {
      const url = result.data?.placeOrder?.order.multisafepay_payment_url

      if (result.errors) return

      if (!selectedMethod?.code) {
        throw Error(
          t`An error occurred while processing your payment. Please contact the store owner`,
        )
      }

      if (url?.error || !url?.payment_url) {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        restoreCart({ variables: { cartId: variables.cartId } }).then(({ data }) => {
          data?.getPaymentMeta && billingPage.refetch({ cartId: data.getPaymentMeta })
        })
        return
      }

      await lock({
        method: selectedMethod.code,
        order_number: result.data?.placeOrder?.order.order_number,
      })

      await new Promise((resolve) => setTimeout(resolve, 1000))

      await push(url.payment_url)
    },
  })

  const { handleSubmit } = form

  const submit = handleSubmit(() => {})

  useFormCompose({ form, step, submit, key: `PaymentMethodPlaceOrder_${code}` })

  return (
    <form onSubmit={submit}>
      {form.data?.placeOrder?.order.multisafepay_payment_url.error && (
        <ErrorSnackbar open>
          <>{form.data?.placeOrder?.order.multisafepay_payment_url.error}</>
        </ErrorSnackbar>
      )}
      <ApolloErrorSnackbar error={restoreResult.error} />
      <ApolloErrorSnackbar error={billingPage.error} />
    </form>
  )
}
