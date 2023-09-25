import { useMutation } from '@graphcommerce/graphql'
import { useCustomerQuery } from '@graphcommerce/magento-customer'
import { useEffect } from 'react'
import { CustomerCartDocument } from './CustomerCart.gql'
import { UseMergeCustomerCartDocument } from './UseMergeCustomerCart.gql'
import { useAssignCurrentCartId } from './useAssignCurrentCartId'
import { useCurrentCartId } from './useCurrentCartId'

/**
 * - Automatically assign the customer cart as the current cart
 * - Merge the guest cart into the customer cart
 */
export function useMergeCustomerCart() {
  const { currentCartId } = useCurrentCartId()
  const assignCurrentCartId = useAssignCurrentCartId()
  const [merge] = useMutation(UseMergeCustomerCartDocument, { errorPolicy: 'all' })

  const destinationCartId = useCustomerQuery(CustomerCartDocument)?.data?.customerCart.id

  useEffect(() => {
    // If we don't have a customer cart, we're done
    // If the vistor cart is the same as the customer cart, we're done
    if (!destinationCartId || currentCartId === destinationCartId) return

    // If the visitor has a guest cart, try merging it into the customer cart
    if (currentCartId) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      merge({ variables: { sourceCartId: currentCartId, destinationCartId } })
        // We're not handling exceptions here:
        // If the merge returns an error, we'll use the customer cart without merging the guest cart.
        .catch((e) => {
          console.error('Error merging carts', e)
        })
        .finally(() => {
          // Assign the customer cart as the new cart id
          assignCurrentCartId(destinationCartId)
        })
    } else {
      assignCurrentCartId(destinationCartId)
    }
  }, [assignCurrentCartId, destinationCartId, merge, currentCartId])
}
