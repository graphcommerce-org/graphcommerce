import { useQuery } from '@apollo/client'
import { CurrentCartIdDocument } from './CurrentCartId.graphql'

export function useCurrentCartId() {
  return useQuery(CurrentCartIdDocument, { ssr: false }).data?.currentCartId?.id ?? undefined
}
