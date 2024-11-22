import type { ApolloCache } from '@graphcommerce/graphql'
import { useApolloClient } from '@graphcommerce/graphql'
import { cookie } from '@graphcommerce/next-ui'
import { useCallback } from 'react'
import { CurrentCartIdDocument } from './CurrentCartId.gql'

export const CART_ID_COOKIE = 'cart'

export function writeCartId(cache: ApolloCache<object>, id: string | null = null) {
  cache.writeQuery({
    query: CurrentCartIdDocument,
    data: { currentCartId: { __typename: 'CurrentCartId', locked: false, id } },
    broadcast: true,
  })
}

export function readCartId(cache: ApolloCache<object>) {
  return cache.readQuery({ query: CurrentCartIdDocument })?.currentCartId
}

export function cartLock(cache: ApolloCache<object>, locked: boolean) {
  const currentCartId = cache.readQuery({ query: CurrentCartIdDocument })?.currentCartId
  if (currentCartId?.id && currentCartId.locked !== locked) {
    cache.writeQuery({
      query: CurrentCartIdDocument,
      data: { currentCartId: { ...currentCartId, locked } },
      broadcast: true,
    })
  }
}

export function useAssignCurrentCartId() {
  const { cache } = useApolloClient()

  return useCallback(
    (id: string) => {
      writeCartId(cache, id)
      cookie(CART_ID_COOKIE, id)
    },
    [cache],
  )
}
