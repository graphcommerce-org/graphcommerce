import { ExpandPaymentMethods } from '@graphcommerce/magento-cart-payment-method'
import { UseAdyenPaymentMethodsDocument } from './UseAdyenPaymentMethods.gql'

export const nonNullable = <T>(value: T): value is NonNullable<T> =>
  value !== null && value !== undefined

export const adyenRedirectExpandMethods: ExpandPaymentMethods = async (available, context) => {
  if (!context.id) return []

  const result = await context.client.query({
    query: UseAdyenPaymentMethodsDocument,
    variables: { cartId: { input: context.id, output: context.id } },
  })

  const methods = result.data.adyenPaymentMethods?.paymentMethodsResponse?.paymentMethods ?? []

  return methods
    .map((method) => {
      if (!method?.name || !method.type) return null

      return { title: method.name, code: available.code, child: method.type }
    })
    .filter(nonNullable)
    .filter((method) => !['applepay', 'googlepay', 'scheme'].includes(method.child))
}
