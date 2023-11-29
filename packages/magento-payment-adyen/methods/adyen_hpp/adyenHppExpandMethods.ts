import { ExpandPaymentMethods } from '@graphcommerce/magento-cart-payment-method'
import { UseAdyenPaymentMethodsDocument } from '../../hooks/UseAdyenPaymentMethods.gql'
import { filterNonNullableKeys } from '@graphcommerce/next-ui'

export const nonNullable = <T>(value: T): value is NonNullable<T> =>
  value !== null && value !== undefined

export const adyenHppExpandMethods: ExpandPaymentMethods = async (available, context) => {
  if (!context.id) return []

  const methods = (
    await context.client.query({
      query: UseAdyenPaymentMethodsDocument,
      variables: { cartId: context.id },
    })
  ).data.adyenPaymentMethods?.paymentMethodsResponse?.paymentMethods

  return filterNonNullableKeys(methods, ['name', 'type'])
    .map((method) => ({ title: method.name, code: available.code, child: method.type }))
    .filter((method) => {
      if (method.child === 'applepay' && typeof window !== undefined && !window.ApplePaySession) {
        return false
      }
      return method.child !== 'scheme'
    })
}
