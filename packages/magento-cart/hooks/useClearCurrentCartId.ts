import { useApolloClient } from '@graphcommerce/graphql'
import { cookie } from '@graphcommerce/next-ui'
import { useCallback } from 'react'
import { CART_ID_COOKIE } from './useAssignCurrentCartId'

export function useClearCurrentCartId() {
  const { cache } = useApolloClient()

  return useCallback(() => {
    cache.evict({ fieldName: 'currentCartId' })
    cache.evict({ fieldName: 'customerCart' })
    cache.gc()
    cookie(CART_ID_COOKIE, null)
  }, [cache])
}
