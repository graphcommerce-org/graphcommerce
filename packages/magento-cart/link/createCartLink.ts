import { ApolloLink, FetchResult } from '@graphcommerce/graphql'
import { CreateEmptyCartMutation } from '../hooks/CreateEmptyCart.gql'
import { onCartError } from './onCartError'

export const cartErrorLink = (operation: () => Promise<string | null | undefined>) =>
  ApolloLink.from([onCartError(operation)])
