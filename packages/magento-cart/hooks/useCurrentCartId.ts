import { useQuery } from '@graphcommerce/graphql'
import { CurrentCartIdDocument } from './CurrentCartId.gql'

export function useCurrentCartId() {
  return useQuery(CurrentCartIdDocument, { ssr: false }).data?.currentCartId?.id ?? undefined
}
