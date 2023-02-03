import { ClientContext, NormalizedCacheObject } from '@graphcommerce/graphql'
import { ApolloLink, ApolloCache, setContext } from '@graphcommerce/graphql/apollo'
import { CustomerTokenDocument } from '../hooks'
import { onAuthorizationError } from './onAuthenticationError'

export const addTokenHeader = setContext((_, context: ClientContext) => {
  if (!context.headers) context.headers = {}
  try {
    const query = context.cache.readQuery({ query: CustomerTokenDocument })
    if (query?.customerToken?.token) {
      context.headers.authorization = `Bearer ${query?.customerToken?.token}`
      return context
    }
    return context
  } catch (error) {
    return context
  }
})

export const customerTokenLink = ApolloLink.from([addTokenHeader, onAuthorizationError])

/** Not really required anymore, you can use customerTokenLink directly */
export const createCustomerTokenLink = (_: ApolloCache<NormalizedCacheObject>) => customerTokenLink
