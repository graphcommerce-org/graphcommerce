import { useApolloClient } from '@graphcommerce/graphql'
import type { useSignInForm as useSignInFormType } from '@graphcommerce/magento-customer'
import type { FunctionPlugin, PluginConfig } from '@graphcommerce/next-config'
import { cartLock, readCartId, useAssignCurrentCartId } from '../hooks'
import { CustomerCartDocument } from '../hooks/CustomerCart.gql'
import { MergeCartsDocument } from '../hooks/MergeCarts.gql'

export const config: PluginConfig = {
  type: 'function',
  module: '@graphcommerce/magento-customer',
}

export const useSignInForm: FunctionPlugin<typeof useSignInFormType> = (useSignIn, options) => {
  const client = useApolloClient()
  const assignCurrentCartId = useAssignCurrentCartId()

  return useSignIn({
    ...options,
    onComplete: async (data, variables) => {
      await options.onComplete?.(data, variables)
      if (data.errors) return

      cartLock(client.cache, true)

      const destinationCartId = (
        await client.query({
          query: CustomerCartDocument,
          fetchPolicy: 'network-only',
        })
      ).data.customerCart.id

      try {
        const sourceCartId = readCartId(client.cache)?.id
        if (sourceCartId && sourceCartId !== destinationCartId) {
          await client.mutate({
            mutation: MergeCartsDocument,
            variables: { sourceCartId, destinationCartId },
          })
        }
      } catch (error) {
        console.error(
          'Error merging carts, continuing without merging, this might cause issues.',
          error,
        )
      } finally {
        // Assign the customer cart as the new cart id
        assignCurrentCartId(destinationCartId)
      }
    },
  })
}
