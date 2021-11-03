import { ApolloCache, NormalizedCacheObject } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { CustomerTokenDocument } from '../hooks/CustomerToken.gql'

export const createAuthLink = (cache: ApolloCache<NormalizedCacheObject>) => {
  return setContext((_, context) => {
    if (!context.headers) context.headers = {}
    try {
      const query = cache.readQuery({ query: CustomerTokenDocument })
      if (query?.customerToken?.token) {
        context.headers.authorization = `Bearer ${query?.customerToken?.token}`
        return context
      } else {
        return context
      }
    } catch (error) {
      return context
    }
  })
}
