import { useApolloClient } from '@graphcommerce/graphql'
import type { useSignInForm } from '@graphcommerce/magento-customer/hooks/useSignInForm'
import type { MethodPlugin } from '@graphcommerce/next-config'
import { cartLock, readCartId, useAssignCurrentCartId } from '../hooks'
import { CustomerCartDocument } from '../hooks/CustomerCart.gql'
import { MergeCartsDocument } from '../hooks/MergeCarts.gql'

export const func = 'useSignInForm'
export const exported = '@graphcommerce/magento-customer/hooks/useSignInForm'

const useSignInFormMergeCart: MethodPlugin<typeof useSignInForm> = (useSignInForm, options) => {
  const client = useApolloClient()
  const assignCurrentCartId = useAssignCurrentCartId()

  return useSignInForm({
    ...options,
    onComplete: async (data, variables) => {
      await options.onComplete?.(data, variables)

      cartLock(client.cache, true)

      const customerCart = await client.query({
        query: CustomerCartDocument,
        fetchPolicy: 'network-only',
      })
      const destinationCartId = customerCart.data.customerCart.id

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

export const plugin = useSignInFormMergeCart
