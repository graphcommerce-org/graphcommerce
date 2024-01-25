import { ApolloClient } from '@graphcommerce/graphql'

export function signOut(client: ApolloClient<object>) {
  client.cache.evict({ fieldName: 'currentCartId', broadcast: true })
  client.cache.evict({ fieldName: 'cart', broadcast: true })
  client.cache.evict({ fieldName: 'customerToken', broadcast: true })
  client.cache.evict({ fieldName: 'customer', broadcast: true })
  client.cache.evict({ fieldName: 'customerCart', broadcast: true })
}
