import { useApolloClient } from '@graphcommerce/graphql'
import { ErrorCategory } from '@graphcommerce/magento-graphql'
import { useRouter } from 'next/router'
import { UseCustomerValidateTokenDocument } from './UseCustomerValidateToken.gql'
import { useCustomerQuery } from './useCustomerQuery'

/** Validates the current customer token. This hook is supposed to be called only once. */
export function useCustomerValidateToken() {
  const client = useApolloClient()
  const router = useRouter()

  useCustomerQuery(UseCustomerValidateTokenDocument, {
    initialFetchPolicy: 'network-only',
    onError: async ({ graphQLErrors }) => {
      const category: ErrorCategory = 'graphql-authorization'
      // If there is no authorization error, do nothing.
      if (!graphQLErrors.some((e) => e.extensions?.category === category)) return

      await client.clearStore()
      router.reload()
    },
  })
}
