import { CoreOptions } from '@adyen/adyen-web/dist/types/core/types'
import { ApolloError, QueryResult, useQuery } from '@graphcommerce/graphql'
import { useCartQuery } from '@graphcommerce/magento-cart'
import { StoreConfigDocument } from '@graphcommerce/magento-store'
import { filterNonNullableKeys, nonNullable, useMemoObject } from '@graphcommerce/next-ui'
import { useRouter } from 'next/router'
import {
  UseAdyenPaymentMethodsDocument,
  UseAdyenPaymentMethodsQuery,
  UseAdyenPaymentMethodsQueryVariables,
} from './UseAdyenPaymentMethods.gql'

export type CoreOptionsPartial = Pick<
  CoreOptions,
  'environment' | 'clientKey' | 'locale' | 'paymentMethodsResponse'
>

type UseAdyenCheckoutConfigResult = QueryResult<
  UseAdyenPaymentMethodsQuery,
  UseAdyenPaymentMethodsQueryVariables
> & {
  config?: CoreOptionsPartial
}

export function useAdyenCheckoutConfig(): UseAdyenCheckoutConfigResult {
  const storeConfig = useQuery(StoreConfigDocument).data?.storeConfig ?? {}
  const { locale } = useRouter()

  let { adyen_demo_mode, adyen_client_key_live, adyen_client_key_test } = storeConfig
  if (!adyen_demo_mode) adyen_demo_mode = true
  const clientKey = adyen_demo_mode ? adyen_client_key_test : adyen_client_key_live

  const paymentMethodsQuery = useCartQuery(UseAdyenPaymentMethodsDocument, {
    fetchPolicy: 'network-only',
  })

  const response = paymentMethodsQuery.data?.adyenPaymentMethods?.paymentMethodsResponse
  const paymentMethodsResponse = {
    ...response,
    paymentMethods: filterNonNullableKeys(
      response?.paymentMethods,
      // ['brand', 'brands', 'type', 'name', 'details', 'configuration', 'issuers'],
    ).map((pm) => ({ ...pm, brands: (pm?.brands ?? []).filter(nonNullable) })),
  } satisfies CoreOptions['paymentMethodsResponse']

  const config = useMemoObject({
    environment: adyen_demo_mode ? 'test' : 'prod',
    clientKey,
    locale: locale?.split('-', 2).join('-'),
    paymentMethodsResponse,
  })

  if (paymentMethodsQuery.loading || paymentMethodsQuery.error) {
    return paymentMethodsQuery
  }

  if (!config.paymentMethodsResponse) {
    return {
      ...paymentMethodsQuery,
      error: new ApolloError({ errorMessage: 'No Adyen payment methods response found' }),
    }
  }

  if (!config.clientKey) {
    return {
      ...paymentMethodsQuery,
      error: new ApolloError({ errorMessage: 'No Adyen client key found in store config' }),
    }
  }

  return { ...paymentMethodsQuery, config: { ...config, clientKey: config.clientKey } }
}
