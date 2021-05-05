import { useQuery } from '@apollo/client'
import { CurrentCartIdDocument } from './CurrentCartId.gql'

export function useCartId() {
  return useQuery(CurrentCartIdDocument, { ssr: false }).data?.currentCartId?.id
}
