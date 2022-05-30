import { InMemoryCache, onError } from '@graphcommerce/graphql'
import { CustomerTokenDocument } from '@graphcommerce/magento-customer'

function invalidateToken(cache: InMemoryCache) {
  const { customerToken } =
    cache.readQuery({
      query: CustomerTokenDocument,
    }) ?? {}

  if (customerToken) {
    // Write arbitrary old token to document
    cache.writeQuery({
      query: CustomerTokenDocument,
      data: {
        customerToken: {
          ...customerToken,
          createdAt: new Date('2000').toUTCString(),
          valid: false,
        },
      },
      broadcast: true,
    })
  }
}

export const onAuthError = onError(({ graphQLErrors, operation }) => {
  const { cache } = operation.getContext()
  if (graphQLErrors) {
    for (const err of graphQLErrors) {
      switch (err.extensions.category) {
        // Apollo Server sets code to UNAUTHENTICATED
        // when an AuthenticationError is thrown in a resolver
        case 'graphql-authorization':
          // Modify the operation context with a new token
          invalidateToken(cache as InMemoryCache)
      }
    }
  }
})
