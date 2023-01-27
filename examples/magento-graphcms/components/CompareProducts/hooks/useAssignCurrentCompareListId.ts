import { ApolloCache, useApolloClient } from '@graphcommerce/graphql'
import { cookie } from '@graphcommerce/next-ui'
import { useCallback } from 'react'
import { CurrentCompareUidDocument } from '../graphql/CurrentCompareUid.gql'

export const CART_ID_COMPARE_LIST = 'compare-list'

function writeCompareId(cache: ApolloCache<object>, id: string | null = null) {
  cache.writeQuery({
    query: CurrentCompareUidDocument,
    data: { currentCompareUid: { __typename: 'CurrentCompareUid', id } },
    broadcast: true,
  })
}

export function useAssignCurrentCompareListId() {
  const { cache } = useApolloClient()

  return useCallback(
    (id: string) => {
      writeCompareId(cache, id)
      cookie(CART_ID_COMPARE_LIST, id)
    },
    [cache],
  )
}
