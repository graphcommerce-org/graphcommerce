import { ApolloClient } from '@apollo/client'
import type { InContextInput } from '@graphcommerce/graphql-mesh'

export function getInContextInput(client: ApolloClient<any>): InContextInput | undefined {
  return {}
}

/**
 * Defines a method to handle the current scope for the query.
 *
 * Other plugins should be able to define their own scopes and create a plugin on this method to augment the specific scope.
 *
 * - User configured currency
 * - Adobe Commerce preview functionality
 * - Hygraph preview functionality
 */
export const useInContextInput = (): InContextInput | undefined => undefined
