import { ApolloClient } from '@graphcommerce/graphql'

export function signOut(client: ApolloClient<object>) {
  client.cache.evict({ fieldName: 'currentCartId' })
  client.cache.evict({ fieldName: 'cart' })
  client.cache.evict({ fieldName: 'customerToken' })
  client.cache.evict({ fieldName: 'customer' })
  client.cache.evict({ fieldName: 'customerCart' })
  client.cache.gc()
}
