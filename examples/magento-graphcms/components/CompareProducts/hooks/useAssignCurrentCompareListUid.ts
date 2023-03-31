import { ApolloCache, useApolloClient } from '@graphcommerce/graphql'
import { useCallback } from 'react'
import { CurrentCompareUidDocument } from '../graphql/CurrentCompareUid.gql'

function writeCompareUid(cache: ApolloCache<object>, uid: string | null = null) {
  cache.writeQuery({
    query: CurrentCompareUidDocument,
    data: { currentCompareUid: { __typename: 'CurrentCompareUid', uid } },
    broadcast: true,
  })
}

export function useAssignCurrentCompareListUid() {
  const { cache } = useApolloClient()
  return useCallback((uid: string) => writeCompareUid(cache, uid), [cache])
}
