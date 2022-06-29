import { useMutation, useQuery } from '@graphcommerce/graphql'
import { useCustomerSession } from '@graphcommerce/magento-customer'
import { useEffect } from 'react'
import { CustomerCartDocument } from './CustomerCart.gql'
import { UseMergeCustomerCartDocument } from './UseMergeCustomerCart.gql'
import { useAssignCurrentCartId } from './useAssignCurrentCartId'
import { useCurrentCartId } from './useCurrentCartId'

/**
 * - Automatically assign the customer cart as the current cart
 * - Merge the guest cart into the customer cart
 *
 * @todo: Implement the assignCustomerToGuestCart when available: https://github.com/magento/magento2/pull/33106
 */
export function useMergeCustomerCart() {
  const { currentCartId } = useCurrentCartId()
  const assignCurrentCartId = useAssignCurrentCartId()
  const [merge] = useMutation(UseMergeCustomerCartDocument, { errorPolicy: 'all' })

  const { loggedIn } = useCustomerSession()
  const destinationCartId = useQuery(CustomerCartDocument, {
    skip: !loggedIn,
  })?.data?.customerCart.id

  useEffect(() => {
    // If we don't have a customer cart, we're done
    if (!destinationCartId) return

    // If the vistor cart is the same as the customer cart, we're done
    if (currentCartId === destinationCartId) return

    // If there is no visitor cart, assign the customer cart as the current cart
    if (!currentCartId) {
      assignCurrentCartId(destinationCartId)
      return
    }

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    ;(async () => {
      const result = await merge({ variables: { sourceCartId: currentCartId, destinationCartId } })

      if (!result.data?.mergeCarts.id) return

      assignCurrentCartId(result.data?.mergeCarts.id)
    })()
  }, [assignCurrentCartId, destinationCartId, merge, currentCartId])
}
