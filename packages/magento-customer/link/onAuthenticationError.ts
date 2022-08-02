import { InMemoryCache, onError } from '@graphcommerce/graphql'
import { CustomerTokenDocument } from '../hooks/CustomerToken.gql'

function invalidateToken(cache: InMemoryCache) {
  const res = cache.readQuery({
    query: CustomerTokenDocument,
  })

  if (res?.customerToken?.valid) {
    // Write arbitrary old token to document
    cache.writeQuery({
      query: CustomerTokenDocument,
      data: {
        customerToken: {
          ...res.customerToken,
          token: null,
          createdAt: new Date('2000').toUTCString(),
          valid: false,
        },
      },
      broadcast: true,
    })
  }
}

export const onAuthorizationError = onError(({ graphQLErrors, operation }) => {
  const { cache } = operation.getContext()
  if (graphQLErrors) {
    for (const err of graphQLErrors) {
      if (err.extensions?.category === 'graphql-authorization') {
        // Modify the operation context with a new token
        invalidateToken(cache as InMemoryCache)
        break
      }
    }
  }
})
