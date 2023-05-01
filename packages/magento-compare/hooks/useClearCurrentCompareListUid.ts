import { useApolloClient } from '@graphcommerce/graphql'
import { CurrentCompareUidDocument } from '../graphql'

export function useClearCurrentCompareListUid() {
  const { cache } = useApolloClient()

  return () => {
    const id = cache.readQuery({ query: CurrentCompareUidDocument })?.currentCompareUid?.uid
    if (!id) return

    cache.evict({ fieldName: 'currentCompareUid', broadcast: true })
    cache.evict({ fieldName: 'compareList', broadcast: true })
    cache.gc()
  }
}
