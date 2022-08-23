import { ApolloLink, FetchResult } from '@graphcommerce/graphql'
import { CreateEmptyCartMutation } from '../hooks/CreateEmptyCart.gql'
import { onCartError } from './onCartError'

export const cartErrorLink = (operation: () => Promise<string | null | undefined>) =>
  ApolloLink.from([onCartError(operation)])

/** Not really required anymore, you can use customerTokenLink directly */
export const createCartLink = (operation: () => Promise<string | null | undefined>) =>
  cartErrorLink(operation)
