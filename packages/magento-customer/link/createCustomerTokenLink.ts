import { ApolloCache, NormalizedCacheObject, setContext } from '@graphcommerce/graphql'
import { CustomerTokenDocument } from '../hooks/CustomerToken.gql'

export const createCustomerTokenLink = (cache: ApolloCache<NormalizedCacheObject>) =>
  setContext((_, context) => {
    if (!context.headers) context.headers = {}
    try {
      const query = cache.readQuery({ query: CustomerTokenDocument })
      if (query?.customerToken?.token) {
        context.headers.authorization = `Bearer ${query?.customerToken?.token}`
        return context
      }
      return context
    } catch (error) {
      return context
    }
  })
