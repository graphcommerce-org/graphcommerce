import { FetchResult, fromPromise, InMemoryCache, onError } from '@graphcommerce/graphql'
import { CreateEmptyCartMutation } from '../hooks/CreateEmptyCart.gql'
import { CurrentCartIdDocument } from '../hooks/CurrentCartId.gql'

export const onCartError = (refreshCartIdFunction: () => Promise<string | null | undefined>) =>
  onError(({ graphQLErrors, operation, forward }) => {
    const cache = operation.getContext().cache as InMemoryCache
    if (graphQLErrors) {
      for (const err of graphQLErrors) {
        if (err.extensions?.category === 'graphql-no-such-entity' && err.path?.join() === 'cart') {
          return fromPromise(refreshCartIdFunction())
            .filter((value) => Boolean(value))
            .flatMap((cartData) => {
              cache.updateQuery(
                {
                  query: CurrentCartIdDocument,
                },
                (data) => ({
                  currentCartId: {
                    __typename: data?.currentCartId?.__typename ?? 'CurrentCartId',
                    id: cartData,
                  },
                }),
              )

              // retry the request, returning the new observable
              return forward(operation)
            })
        }
      }
    }
    return undefined
  })
