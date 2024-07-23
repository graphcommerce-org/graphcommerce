import { ApolloCache, setContext } from '@graphcommerce/graphql'
import { CustomerDocument } from '../hooks/Customer.gql'

declare module '@apollo/client' {
  interface DefaultContext {
    cache?: ApolloCache<unknown>
    headers?: Record<string, string>
  }
}

export const customerGroupIdLink = setContext((_, context) => {
  if (!context.headers) context.headers = {}
  try {
    const group_id = context.cache?.readQuery({ query: CustomerDocument })?.customer?.group_id
    if (group_id) context.headers['x-magento-group-id'] = `${group_id}`
    return context
  } catch (error) {
    return context
  }
})
