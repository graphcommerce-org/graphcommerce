import { setContext } from '@graphcommerce/graphql/apollo'
import { CustomerTokenDocument } from '../hooks'

export const addTokenHeader = setContext((_, context) => {
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

export const customerTokenLink = addTokenHeader
