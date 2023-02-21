import {
  useFormCompose,
  useFormPersist,
  SelectElement,
  ApolloErrorSnackbar,
} from '@graphcommerce/ecommerce-ui'
import { useMutation } from '@graphcommerce/graphql'
import { useCartQuery, useFormGqlMutationCart } from '@graphcommerce/magento-cart'
import {
  PaymentOptionsProps,
  usePaymentMethodContext,
} from '@graphcommerce/magento-cart-payment-method'
import { MSPPaymentHandlerDocument } from '@graphcommerce/magento-payment-multisafepay/components/MSPPaymentHandler/MSPPaymentHandler.gql'
import { ErrorSnackbar, filterNonNullableKeys, FormRow } from '@graphcommerce/next-ui'
import { i18n } from '@lingui/core'
import { useRouter } from 'next/router'
import { useMSPCartLock } from '../../hooks/useMSPCartLock'
import {
  MSPPaymentOptionsAndPlaceOrderMutation,
  MSPPaymentOptionsAndPlaceOrderMutationVariables,
  MSPPaymentOptionsAndPlaceOrderDocument,
} from './MSPPaymentOptionsAndPlaceOrder.gql'
import { BillingPageDocument } from '@graphcommerce/magento-cart-checkout'

/** It sets the selected payment method on the cart. */
export function MSPPaymentOptionsAndPlaceOrder(props: PaymentOptionsProps) {
  const { code, step, multisafepay_available_issuers } = props

  const [, lock] = useMSPCartLock()
  const { selectedMethod } = usePaymentMethodContext()
  const { push } = useRouter()

  const [restoreCart, restoreResult] = useMutation(MSPPaymentHandlerDocument)
  const billingPage = useCartQuery(BillingPageDocument)

  /**
   * In the this folder you'll also find a PaymentMethodOptionsNoop.graphql document that is
   * imported here and used as the basis for the form below.
   */
  const form = useFormGqlMutationCart<
    MSPPaymentOptionsAndPlaceOrderMutation,
    MSPPaymentOptionsAndPlaceOrderMutationVariables
  >(MSPPaymentOptionsAndPlaceOrderDocument, {
    onComplete: async (result, variables) => {
      const url = result.data?.placeOrder?.order.multisafepay_payment_url

      if (result.errors) {
        console.error('<MSPPaymentOptionsAndPlaceOrder/>', result.errors)
        return
      }

      if (!selectedMethod?.code) {
        console.error('<MSPPaymentOptionsAndPlaceOrder/> not selectedMethod.code')
        return
      }

      if (url?.error || !url?.payment_url) {
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

  const { handleSubmit, required, register, control } = form

  const submit = handleSubmit(() => {})

  const key = `PaymentMethodOptions_${code}`
  useFormPersist({
    form,
    name: key,
    persist: ['paymentMethod.multisafepay_ideal.issuer_id'],
    storage: 'localStorage',
  })

  /** To use an external Pay button we register the current form to be handled there as well. */
  useFormCompose({ form, step, submit, key })

  const issuers = filterNonNullableKeys(multisafepay_available_issuers, ['code', 'description'])

  /**
   * This is the form that the user can fill in. In this case we don't wat the user to fill in
   * anything.
   */
  return (
    <form key={key} onSubmit={submit} noValidate>
      <input type='hidden' value={code} {...register('paymentMethod.code')} />

      {code === 'multisafepay_ideal' && issuers.length && (
        <FormRow>
          <SelectElement
            control={control}
            name='paymentMethod.multisafepay_ideal.issuer_id'
            required
            validation={{ required: { message: 'Please provide an issuer', value: true } }}
            variant='outlined'
            color='secondary'
            select
            label={i18n._(/* i18n */ 'Select your bank')}
            options={issuers.map(({ code: id, description: label }) => ({ id, label }))}
          />
        </FormRow>
      )}

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
