import { useApolloClient } from '@graphcommerce/graphql'
import { cookie } from '@graphcommerce/next-ui'
import { CART_ID_COOKIE } from './useAssignCurrentCartId'

export function useClearCurrentCartId() {
  const { cache } = useApolloClient()

  return () => {
    cache.evict({ fieldName: 'currentCartId' })
    cache.evict({ fieldName: 'customerCart' })
    cache.gc()
    cookie(CART_ID_COOKIE, null)
  }
}
