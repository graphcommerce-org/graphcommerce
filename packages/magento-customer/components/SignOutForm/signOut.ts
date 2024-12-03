import type { ApolloClient } from '@graphcommerce/graphql'
import { removeCssFlag } from '@graphcommerce/next-ui'

export function signOut(client: ApolloClient<object>) {
  removeCssFlag('in-context')
  globalThis?.sessionStorage?.clear()
  client.cache.evict({ fieldName: 'currentCartId' })
  client.cache.evict({ fieldName: 'cart' })
  client.cache.evict({ fieldName: 'customerToken' })
  client.cache.evict({ fieldName: 'customer' })
  client.cache.evict({ fieldName: 'customerCart' })
  client.cache.gc()
}
