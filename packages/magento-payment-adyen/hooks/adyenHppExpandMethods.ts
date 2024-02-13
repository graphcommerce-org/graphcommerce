import { ExpandPaymentMethods } from '@graphcommerce/magento-cart-payment-method'
import { UseAdyenPaymentMethodsDocument } from './UseAdyenPaymentMethods.gql'
import { nonNullable } from '@graphcommerce/next-ui'

export const adyenHppExpandMethods: ExpandPaymentMethods = async (available, context) => {
  if (!context.id) return []

  const result = await context.client.query({
    query: UseAdyenPaymentMethodsDocument,
    variables: { cartId: context.id },
  })

  const methods = result.data.adyenPaymentMethods?.paymentMethodsResponse?.paymentMethods ?? []

  return methods
    .map((method) => {
      if (!method?.name || !method.type) return null

      return { title: method.name, code: available.code, child: method.type }
    })
    .filter(nonNullable)
}
