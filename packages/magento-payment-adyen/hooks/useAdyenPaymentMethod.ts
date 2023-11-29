import { useCartQuery } from '@graphcommerce/magento-cart'
import { useMemo } from 'react'
import { UseAdyenPaymentMethodsDocument } from './UseAdyenPaymentMethods.gql'

export function useAdyenPaymentMethod(brandCode: string) {
  const methods = useCartQuery(UseAdyenPaymentMethodsDocument)

  const result = useMemo(() => {
    const config = methods.data?.adyenPaymentMethods?.paymentMethodsExtraDetails?.find(
      (extra) => extra?.type === brandCode,
    )

    const methodConf =
      methods.data?.adyenPaymentMethods?.paymentMethodsResponse?.paymentMethods?.find(
        (extra) => extra?.type === brandCode,
      )

    if (!methodConf || !config) return undefined

    return {
      ...methodConf,
      ...config,
      paymentMethodsResponse: methods.data?.adyenPaymentMethods?.paymentMethodsResponse,
    }
  }, [
    brandCode,
    methods.data?.adyenPaymentMethods?.paymentMethodsExtraDetails,
    methods.data?.adyenPaymentMethods?.paymentMethodsResponse,
  ])

  return result
}
