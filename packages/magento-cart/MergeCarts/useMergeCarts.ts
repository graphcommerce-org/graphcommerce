import { useMutation } from '@apollo/client'
import { useEffect } from 'react'
import { useAssignCurrentCartId } from '../hooks/useAssignCurrentCartId'
import { useCurrentCartId } from '../hooks/useCartId'
import { MergeCartsDocument } from './MergeCarts.gql'

/**
 * ```tsx
 * function MyComponent() {
 *     useMergeCart("1235")
 * }
 * ```
 */
export function useMergedCart(customerCartId?: string) {
  const sourceCartId = useCurrentCartId()
  const assignCurrentCartId = useAssignCurrentCartId()
  const [merge] = useMutation(MergeCartsDocument)

  useEffect(() => {
    if (!customerCartId) return
    if (sourceCartId === customerCartId) return
    if (!sourceCartId) {
      assignCurrentCartId(customerCartId)
      return
    }

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    ;(async () => {
      const result = await merge({ variables: { sourceCartId, destinationCartId: customerCartId } })
      if (!result.data?.mergeCarts.id) throw Error('Could not merge carts')

      assignCurrentCartId(result.data?.mergeCarts.id)
    })()
  }, [assignCurrentCartId, sourceCartId, customerCartId, merge])
}
